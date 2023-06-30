import { useLazyQuery } from '@apollo/client';
import { useRef } from 'react';
import {
  MergeMetricsDocument,
  MergeMetricsProjectFragmentDoc,
  MergeMetricsMergeRequestConnectionFragmentDoc,
} from '../../graphql/gitlab/graphql';
import { getTopContributors } from './helpers';

import pacMan from '../../assets/bean-eater.gif';
import ContributorsList from './ContributorList';
import ReviewersList from './ReviewersList';
import { BASE_URL } from './constants';
import { getFragmentData } from '../../graphql/gitlab';

export default function Stats() {
  const mergeAfterDateInput = useRef<HTMLInputElement>(null);

  const [loadMergeMetrics, { loading, error, data }] =
    useLazyQuery(MergeMetricsDocument);

  if (error) return <div>Error! ${error.message}</div>;

  const { topAuthors, topReviewers } = getTopContributors(data);

  return (
    <div>
      <div className='header'>
        <h1>GitLab UI Development Stats</h1>
        <div className='merged-after-group'>
          <span>Merged After</span>
          <input ref={mergeAfterDateInput} type='date' />
          <input
            type='button'
            value='Go'
            onClick={() => {
              loadMergeMetrics({
                variables: {
                  projectIds: import.meta.env.VITE_PROJECT_IDS.split(',').map(
                    (id: string) => `gid://gitlab/Project/${id}`
                  ),
                  mergedAfter: mergeAfterDateInput.current?.value || '',
                },
              });
            }}
          />
        </div>
      </div>
      {loading && (
        <div className='loader'>
          <img src={pacMan} />
        </div>
      )}
      {data?.projects?.nodes && (
        <>
          <h2>Global Stats</h2>
          <div className='project-item'>
            <h3>Most Active Contributors</h3>
            <div className='top-developers'>
              <div className='top-list'>
                {topAuthors &&
                  topAuthors.map((author, i) => (
                    <div key={`top-author-${i}`} className='top-list-item'>
                      <img
                        src={
                          author.avatarUrl?.startsWith('https')
                            ? author.avatarUrl
                            : BASE_URL + author.avatarUrl
                        }
                      />
                      <div>
                        <div>
                          {author.name} ({author.mergeRequests})
                        </div>
                        <div className='global-stats'>
                          <div>
                            <span>additions: {author.additions}</span>
                            <span>deletions: {author.deletions}</span>
                          </div>
                          <div>
                            <span>commits: {author.commits}</span>
                            <span>file count: {author.fileCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className='project-item'>
            <h3>Most Active Reviewers</h3>
            <div className='top-reviewers'>
              <div className='top-list'>
                {topReviewers &&
                  topReviewers.map((reviewer, i) => (
                    <div key={`top-reviewer-${i}`} className='top-list-item'>
                      <img
                        src={
                          reviewer.avatarUrl?.startsWith('https')
                            ? reviewer.avatarUrl
                            : BASE_URL + reviewer.avatarUrl
                        }
                      />
                      <span>
                        {reviewer.name} ({reviewer.timesReviewed})
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}

      {data && <h2>Projects</h2>}
      {data?.projects?.nodes?.map((projectFragment, i) => {
        const project = getFragmentData(
          MergeMetricsProjectFragmentDoc,
          projectFragment
        );
        const mergeRequestsConnection = getFragmentData(
          MergeMetricsMergeRequestConnectionFragmentDoc,
          project?.mergeRequests
        );
        if (!project) return;

        return (
          <div key={`project-${i}`} className='project-item'>
            <h3>
              <a target='_blank' href={BASE_URL + project.fullPath}>
                {project.fullPath}
              </a>
            </h3>
            {(mergeRequestsConnection && mergeRequestsConnection.count > 0 && (
              <div className='project'>
                <h3>{mergeRequestsConnection.count} Total Merge Requests</h3>
                <h3>Contributors</h3>
                <div>
                  {project.mergeRequests && (
                    <ContributorsList
                      connectionFragment={project.mergeRequests}
                    />
                  )}
                </div>
                <h3>Reviewers</h3>
                <div>
                  {project.mergeRequests && (
                    <ReviewersList connectionFragment={project.mergeRequests} />
                  )}
                </div>
              </div>
            )) || <p>No Activity</p>}
          </div>
        );
      })}
    </div>
  );
}
