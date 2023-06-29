import { MergeMetricsMergeRequestConnectionFragment } from '../../graphql/gitlab/graphql';
import { mapAuthorMetricsFromMergeRequestConnection, mapReviewersFromMergeRequestConnection } from './helpers';
import { Author, Reviewer } from './types';


// TODO: This is bad convention. Refactor into individual components
const BASE_URL = import.meta.env.VITE_GITLAB_HOST;

export function renderContributorsList(
  nodes: MergeMetricsMergeRequestConnectionFragment
) {
  if (!nodes) return;

  const authors: Author[] = mapAuthorMetricsFromMergeRequestConnection(nodes);

  return (
    <div className='contributors'>
      {authors
        .sort((a, b) => (a.mergeRequests > b.mergeRequests ? -1 : 1))
        .map((n) => (
          <div className='contributor'>
            <div className='name'>
              <img
                src={
                  n.avatarUrl.startsWith('https')
                    ? n.avatarUrl
                    : BASE_URL + n.avatarUrl
                }
              />
            </div>
            <div>
              <span>
                {n.name} ({n.mergeRequests})
              </span>
              <div className='global-stats'>
                <div>
                  <span>additions: {n.additions}</span>
                  <span>deletions: {n.deletions}</span>
                </div>
                <div>
                  <span>commits: {n.commits}</span>
                  <span>file count: {n.fileCount}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export function renderReviewersList(
  nodes: MergeMetricsMergeRequestConnectionFragment
) {
  if (!nodes) return;
  const reviewers: Reviewer[] = mapReviewersFromMergeRequestConnection(nodes);

  return (
    <div className='reviewers'>
      {reviewers
        .sort((a, b) => (a.timesReviewed > b.timesReviewed ? -1 : 1))
        .map((n) => (
          <div className='reviewer'>
            <div className='name'>
              <img
                src={
                  n.avatarUrl?.startsWith('https')
                    ? n.avatarUrl
                    : BASE_URL + n.avatarUrl
                }
              />
              <span>
                {n.name} ({n.timesReviewed})
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}