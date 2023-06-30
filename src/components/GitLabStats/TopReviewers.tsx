import { BASE_URL } from './constants';
import { Reviewer } from './types';

interface TopReviewersProps {
  topReviewers: Reviewer[];
}

const TopReviewers = ({ topReviewers }: TopReviewersProps) => {
  return (
    <div className='project-item'>
      <h3>Most Active Reviewers</h3>
      <div className='top-reviewers'>
        <div className='top-list'>
          {topReviewers &&
            topReviewers.map((reviewer, i) => (
              <div key={`top-reviewer-${i}`} className='top-list-item'>
                <img
                  src={
                    reviewer.avatarUrl?.startsWith('https')
                      ? reviewer.avatarUrl
                      : BASE_URL + reviewer.avatarUrl
                  }
                />
                <span>
                  {reviewer.name} ({reviewer.timesReviewed})
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TopReviewers;
