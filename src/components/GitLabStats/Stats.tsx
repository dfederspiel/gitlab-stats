import { useLazyQuery } from '@apollo/client';
import { useRef } from 'react';
import {
  MergeMetricsDocument,
  MergeMetricsMergeRequestFragment,
  MergeMetricsProjectFragment,
  MergeMetricsMergeRequestConnectionFragment,
} from '../../graphql/gitlab/graphql';
import {
  mapAuthorMetricsFromMergeRequests,
  mapReviewersFromMergeRequests,
} from './helpers';
import { renderContributorsList, renderReviewersList } from './render';
import { Author, Reviewer } from './types';
import pacMan from '../../assets/bean-eater.gif';
import GlobalStats from '../GlobalStats';

const BASE_URL = import.meta.env.VITE_GITLAB_HOST;

export default function Stats() {
  const mergeAfterDateInput = useRef<HTMLInputElement>(null);

  const [loadMergeMetrics, { loading, error, data }] =
    useLazyQuery(MergeMetricsDocument);

  if (error) return <div>Error! ${error.message}</div>;

  let topAuthors: Author[] = [];
  let topReviewers: Reviewer[] = [];
  if (data?.projects) {
    const mergeRequests: MergeMetricsMergeRequestFragment[] = [];
    data.projects.nodes?.forEach((project) => {
      const x = (
        (project as MergeMetricsProjectFragment)
          .mergeRequests as MergeMetricsMergeRequestConnectionFragment
      ).nodes as MergeMetricsMergeRequestFragment[];
      mergeRequests.push(...x);
    });
    const projectAuthors = mapAuthorMetricsFromMergeRequests(mergeRequests);
    const projectReviewers = mapReviewersFromMergeRequests(mergeRequests);

    projectAuthors.sort((a, b) => (a.mergeRequests > b.mergeRequests ? -1 : 1));
    projectReviewers.sort((a, b) =>
      a.timesReviewed > b.timesReviewed ? -1 : 1
    );

    topAuthors = projectAuthors;
    topReviewers = projectReviewers;
  }

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
                  topAuthors.map((author) => (
                    <div className='top-list-item'>
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
                  topReviewers.map((reviewer) => (
                    <div className='top-list-item'>
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
      {data?.projects?.nodes?.map((project) => {
        const p = project as MergeMetricsProjectFragment;
        return (
          <div className='project-item'>
            <h3>
              <a target='_blank' href={BASE_URL + p.fullPath}>
                {p.fullPath}
              </a>
            </h3>
            <GlobalStats project={project!} />
            {(project &&
              (p.mergeRequests as MergeMetricsMergeRequestConnectionFragment)
                .count > 0 && (
                <div className='project' key={p.id}>
                  <h3>
                    {
                      (
                        p.mergeRequests as MergeMetricsMergeRequestConnectionFragment
                      ).count
                    }{' '}
                    Total Merge Requests
                  </h3>
                  <h3>Contributors</h3>
                  <div>
                    {(p.mergeRequests &&
                      renderContributorsList(
                        p.mergeRequests as MergeMetricsMergeRequestConnectionFragment
                      )) ||
                      ''}
                  </div>
                  <h3>Reviewers</h3>
                  <div>
                    {renderReviewersList(
                      p.mergeRequests as MergeMetricsMergeRequestConnectionFragment
                    ) || ''}
                  </div>
                </div>
              )) || <p>No Activity</p>}
          </div>
        );
      })}
    </div>
  );
}
