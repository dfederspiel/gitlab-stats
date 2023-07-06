import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { PageInfoFragmentDoc } from '../../graphql/gitlab/graphql';

type DIRECTION = 'before' | 'after';

interface PagerProps {
  pageInfoFragment: FragmentType<typeof PageInfoFragmentDoc>;
  onPageClick(cursor: string, direction: DIRECTION): void;
}

const Pager = ({ onPageClick, pageInfoFragment }: PagerProps) => {
  const pageInfo = getFragmentData(PageInfoFragmentDoc, pageInfoFragment);

  return (
    <div>
      <button
        disabled={!pageInfo.hasPreviousPage}
        onClick={() => {
          if (!pageInfo.startCursor)
            throw Error('unexpected state in start cursor');
          onPageClick(pageInfo.startCursor, 'before');
        }}
      >
        Previous
      </button>
      <button
        disabled={!pageInfo.hasNextPage}
        onClick={() => {
          if (!pageInfo.endCursor)
            throw Error('unexpected state in end cursor');
          onPageClick(pageInfo.endCursor, 'after');
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pager;
