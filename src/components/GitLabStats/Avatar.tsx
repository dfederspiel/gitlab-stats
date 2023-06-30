import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { MergeMetricsUserCoreFragmentDoc } from '../../graphql/gitlab/graphql';
import { BASE_URL } from './constants';


interface AvatarProps {
  user: FragmentType<typeof MergeMetricsUserCoreFragmentDoc>;
}

const Avatar = (props: AvatarProps) => {
  const user = getFragmentData(MergeMetricsUserCoreFragmentDoc, props.user);
  return (
    <div className=''>
      <img
        src={
          user.avatarUrl?.startsWith('https')
            ? user.avatarUrl
            : BASE_URL + user.avatarUrl
        }
      />
    </div>
  );
};

export default Avatar;
