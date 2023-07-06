import { useLazyQuery } from '@apollo/client';
import { MergeMetricsDocument } from '../../graphql/gitlab/graphql';
import { getTopContributors } from './helpers';

import pacMan from '../../assets/bean-eater.gif';
import DateSelector from '../common/DateSelector/DateSelector';
import TopContributors from './TopContributors';
import TopReviewers from './TopReviewers';
import ProjectDetails from './ProjectDetails';
import ProjectSelector from '../ProjectSelector/ProjectSelector';
import { useState } from 'react';
import Panel from '../common/Panel/Panel';

import './gitlab-stats.css';

export default function GitLabStats() {
  const [loadMergeMetrics, { loading, error, data }] =
    useLazyQuery(MergeMetricsDocument);

  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [date, setDate] = useState<string>();
  const [configOpen, setConfigOpen] = useState(false);

  if (error) return <div>Error! ${error.message}</div>;

  const { topAuthors, topReviewers } = getTopContributors(data);

  return (
    <div>
      <div className="header">
        <h1>GitLab UI Development Stats</h1>
        <a onClick={() => setConfigOpen(!configOpen)}>Select Projects</a>
        <Panel
          title="Global Stats For:"
          open={configOpen}
          onClose={() => {
            setConfigOpen(false);
            if (date && selectedProjects.length > 0)
              loadMergeMetrics({
                variables: {
                  projectIds: selectedProjects,
                  mergedAfter: date,
                },
              });
          }}
        >
          <>
            <ProjectSelector
              onSelectionChanged={(checked) => {
                setSelectedProjects(checked);
              }}
            />
            <DateSelector
              dateChanged={(newDate) => {
                setDate(newDate);
              }}
            />
          </>
        </Panel>
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
