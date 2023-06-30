import { BASE_URL } from './constants';
import { Author } from './types';

interface TopContributorsProps {
  topAuthors: Author[];
}

const TopContributors = ({ topAuthors }: TopContributorsProps) => {
  return (
    <div className='project-item'>
      <h3>Most Active Contributors</h3>
      <div className='top-developers'>
        <div className='top-list'>
          {topAuthors &&
            topAuthors.map((author, i) => (
              <div key={`top-author-${i}`} className='top-list-item'>
                <img
                  src={
                    author.avatarUrl?.startsWith('https')
                      ? author.avatarUrl
                      : BASE_URL + author.avatarUrl
                  }
                />
                <div>
                  <div>
                    {author.name} ({author.mergeRequests})
                  </div>
                  <div className='global-stats'>
                    <div>
                      <span>additions: {author.additions}</span>
                      <span>deletions: {author.deletions}</span>
                    </div>
                    <div>
                      <span>commits: {author.commits}</span>
                      <span>file count: {author.fileCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopContributors;
