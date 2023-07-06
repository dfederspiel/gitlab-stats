import { useLazyQuery } from '@apollo/client';
import {
  CurrentUserDocument,
  MergeMetricsMergeRequestConnectionFragmentDoc,
  MergeMetricsMergeRequestFragmentDoc,
} from '../../graphql/gitlab/graphql';
import Selector from '../common/DateSelector/DateSelector';
import pacMan from '../../assets/bean-eater.gif';
import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import User from '../common/UserList';
import Diff from '../common/Diff';

import './user-stats.css';

interface ContributionsProps {
  mergeRequestConnectionFragment: FragmentType<
    typeof MergeMetricsMergeRequestConnectionFragmentDoc
  >;
}
const Contributions = ({
  mergeRequestConnectionFragment,
}: ContributionsProps) => {
  const mergeRequestConnection = getFragmentData(
    MergeMetricsMergeRequestConnectionFragmentDoc,
    mergeRequestConnectionFragment
  );

  return (
    <>
      <h1>Total Merge Requests: {mergeRequestConnection.count}</h1>
      <div className="individual-details">
        {mergeRequestConnection?.nodes?.map((mr) => {
          const mergeRequest = getFragmentData(
            MergeMetricsMergeRequestFragmentDoc,
            mr
          );
          return (
            <div className="merge-details">
              {mergeRequest?.commits?.nodes?.map((n) => (
                <div>
                  <p>
                    <a target="_blank" href={n?.webUrl} rel="noreferrer">
                      {n?.title}
                    </a>
                  </p>
                  <p>{n?.description}</p>
                </div>
              ))}
              {mergeRequest?.diffStatsSummary && (
                <Diff diffFragment={mergeRequest?.diffStatsSummary} />
              )}
              {mergeRequest?.approvedBy?.nodes?.map(
                (n) => n && <User userFragment={n} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

const UserStats = () => {
  const [getUserStats, { loading, error, data }] =
    useLazyQuery(CurrentUserDocument);

  return (
    <>
      <Selector
        dateChanged={(newDate) => {
          getUserStats({
            variables: {
              mergedAfter: newDate || '',
            },
          });
        }}
      />
      {loading && (
        <div className="loader">
          <img src={pacMan} />
        </div>
      )}
      {data?.currentUser?.authoredMergeRequests && (
        <Contributions
          mergeRequestConnectionFragment={
            data.currentUser?.authoredMergeRequests
          }
        />
      )}
    </>
  );
};

export default UserStats;
