import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { MergeMetricsUserCoreFragmentDoc } from '../../graphql/gitlab/graphql';

interface UserProps {
  userFragment: FragmentType<typeof MergeMetricsUserCoreFragmentDoc>;
}

const User = ({ userFragment }: UserProps) => {
  const user = getFragmentData(MergeMetricsUserCoreFragmentDoc, userFragment);
  return <p>{user.name}</p>;
};

export default User;
