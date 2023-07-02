import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import {
  MergeMetricsProjectFragmentDoc,
  MergeMetricsMergeRequestConnectionFragmentDoc,
} from '../../graphql/gitlab/graphql';
import { BASE_URL } from './constants';
import ContributorsList from './ContributorList';
import ReviewersList from './ReviewersList';

interface ProjectDetailsProps {
  projectFragment: FragmentType<typeof MergeMetricsProjectFragmentDoc>;
}

const ProjectDetails = ({ projectFragment }: ProjectDetailsProps) => {
  const project = getFragmentData(
    MergeMetricsProjectFragmentDoc,
    projectFragment
  );
  const mergeRequestsConnection = getFragmentData(
    MergeMetricsMergeRequestConnectionFragmentDoc,
    project?.mergeRequests
  );
  if (!project) return;

  return (
    <div className="project-item">
      <h3>
        <a target="_blank" href={BASE_URL + project.fullPath}>
          {project.fullPath}
        </a>
      </h3>
      {(mergeRequestsConnection && mergeRequestsConnection.count > 0 && (
        <div className="project">
          <h3>{mergeRequestsConnection.count} Total Merge Requests</h3>
          <h3>Contributors</h3>
          <div>
            {project.mergeRequests && (
              <ContributorsList connectionFragment={project.mergeRequests} />
            )}
          </div>
          <h3>Reviewers</h3>
          <div>
            {project.mergeRequests && (
              <ReviewersList connectionFragment={project.mergeRequests} />
            )}
          </div>
        </div>
      )) || <p>No Activity</p>}
    </div>
  );
};

export default ProjectDetails;
