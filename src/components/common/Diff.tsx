import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { MergeMetricsDiffStatsFragmentDoc } from '../../graphql/gitlab/graphql';

interface DiffProps {
  diffFragment: FragmentType<typeof MergeMetricsDiffStatsFragmentDoc>;
}

const Diff = ({ diffFragment }: DiffProps) => {
  const diff = getFragmentData(MergeMetricsDiffStatsFragmentDoc, diffFragment);
  return (
    <ul>
      <li>Additions: {diff.additions}</li>
      <li>Changes: {diff.changes}</li>
      <li>Deletions: {diff.deletions}</li>
      <li>File Count: {diff.fileCount}</li>
    </ul>
  );
};

export default Diff;
