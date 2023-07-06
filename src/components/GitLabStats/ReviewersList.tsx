import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { MergeMetricsMergeRequestConnectionFragmentDoc } from '../../graphql/gitlab/graphql';
import { BASE_URL } from './constants';
import { getReviewersFromMergeRequestConnection } from './helpers';
import { Reviewer } from './types';

import './reviewers-list.css';

interface ReviewersListProps {
  connectionFragment: FragmentType<
    typeof MergeMetricsMergeRequestConnectionFragmentDoc
  >;
}
const ReviewersList = ({ connectionFragment }: ReviewersListProps) => {
  if (!connectionFragment) return;

  const connection = getFragmentData(
    MergeMetricsMergeRequestConnectionFragmentDoc,
    connectionFragment
  );

  const reviewers: Reviewer[] =
    getReviewersFromMergeRequestConnection(connection);

  return (
    <div className="reviewers-list">
      {reviewers
        .sort((a, b) => (a.timesReviewed > b.timesReviewed ? -1 : 1))
        .map((n, i) => (
          <div key={`reviewer-${i}`} className="reviewer">
            <div className="name">
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
};

export default ReviewersList;
