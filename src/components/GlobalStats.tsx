import { FragmentType, useFragment } from '../graphql/gitlab';
import {
  MergeMetricsProjectFragmentDoc,
  MergeMetricsMergeRequestConnectionFragmentDoc,
} from '../graphql/gitlab/graphql';

// This is the beginning of the much cleaner Fragment approach, 
// using generated types and the included fragment hooks to resolve unique query types
const GlobalStats = ({
  project,
}: {
  project: FragmentType<typeof MergeMetricsProjectFragmentDoc>;
}) => {
  const projectFragment = useFragment(MergeMetricsProjectFragmentDoc, project);
  const mergeRequestConnectionFragment = useFragment(
    MergeMetricsMergeRequestConnectionFragmentDoc,
    projectFragment.mergeRequests
  );
  return (
    <p>
      {projectFragment.name} {mergeRequestConnectionFragment?.count}
    </p>
  );
};

export default GlobalStats;
