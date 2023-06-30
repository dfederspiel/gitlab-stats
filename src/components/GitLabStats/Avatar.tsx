import { FragmentType, graphql, getFragmentData } from '../../graphql/gitlab';
import { BASE_URL } from './constants';

const Avatar_User_Fragment = graphql(`
  fragment AvatarUserFragment on UserCore {
    avatarUrl
  }
`);

interface AvatarProps {
  user: FragmentType<typeof Avatar_User_Fragment>;
}

const Avatar = (props: AvatarProps) => {
  const user = getFragmentData(Avatar_User_Fragment, props.user);
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
