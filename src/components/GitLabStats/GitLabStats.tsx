import { useLazyQuery } from '@apollo/client';
import { MergeMetricsDocument } from '../../graphql/gitlab/graphql';
import { getTopContributors } from './helpers';

import pacMan from '../../assets/bean-eater.gif';
import Selector from './Selector';
import TopContributors from './TopContributors';
import TopReviewers from './TopReviewers';
import ProjectDetails from './ProjectDetails';

import './gitlab-stats.css';
import ProjectSelector from '../ProjectSelector/ProjectSelector';
import { useEffect, useState } from 'react';

export default function GitLabStats() {
  const [loadMergeMetrics, { loading, error, data }] =
    useLazyQuery(MergeMetricsDocument);
  const [selectedProjects, setSelectedProjects] = useState<string[]>();

  if (error) return <div>Error! ${error.message}</div>;

  const { topAuthors, topReviewers } = getTopContributors(data);

  return (
    <div>
      <div className="header">
        <h1>GitLab UI Development Stats</h1>
        <ProjectSelector
          onSelectionChanged={(checked) => {
            setSelectedProjects(checked);
          }}
        />
        <Selector
          dateChanged={(newDate) => {
            loadMergeMetrics({
              variables: {
                projectIds: selectedProjects || [],
                mergedAfter: newDate,
              },
            });
          }}
        />
      </div>
      {loading && (
        <div className="loader">
          <img src={pacMan} />
        </div>
      )}
      {data?.projects?.nodes && (
        <>
          <h2>Global Stats</h2>
          <TopContributors topAuthors={topAuthors} />
          <TopReviewers topReviewers={topReviewers} />
        </>
      )}

      {data && <h2>Projects</h2>}
      {data?.projects?.nodes?.map(
        (projectFragment, i) =>
          projectFragment && (
            <ProjectDetails
              key={`project-${i}`}
              projectFragment={projectFragment}
            />
          )
      )}
    </div>
  );
}
