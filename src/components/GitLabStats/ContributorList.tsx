import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { MergeMetricsMergeRequestConnectionFragmentDoc } from '../../graphql/gitlab/graphql';
import { BASE_URL } from './constants';
import { getAuthorMetricsFromMergeRequestConnection } from './helpers';
import { Author } from './types';

interface ContributorsListProps {
  connectionFragment?: FragmentType<
    typeof MergeMetricsMergeRequestConnectionFragmentDoc
  >;
}

const ContributorsList = ({ connectionFragment }: ContributorsListProps) => {
  if (!connectionFragment) return;

  const requests = getFragmentData(
    MergeMetricsMergeRequestConnectionFragmentDoc,
    connectionFragment
  );

  const authors: Author[] =
    getAuthorMetricsFromMergeRequestConnection(requests);

  return (
    <div className="contributors">
      {authors
        .sort((a, b) => (a.mergeRequests > b.mergeRequests ? -1 : 1))
        .map((n, i) => (
          <div key={`contributor-${i}`} className="contributor">
            <div className="name">
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
              <div className="global-stats">
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
};

export default ContributorsList;
