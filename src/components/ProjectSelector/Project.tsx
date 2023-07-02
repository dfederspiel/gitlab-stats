import { FragmentType, getFragmentData } from '../../graphql/gitlab';
import { ProjectFragmentDoc } from '../../graphql/gitlab/graphql';

interface ProjectProps {
  projectFragment: FragmentType<typeof ProjectFragmentDoc>;
  selectedProjects: string[];
  onChecked(id: string): void;
}

const Project = ({
  projectFragment,
  selectedProjects,
  onChecked,
}: ProjectProps) => {
  const project = getFragmentData(ProjectFragmentDoc, projectFragment);
  return (
    <div>
      <input
        checked={selectedProjects.includes(project.id)}
        onClick={() => onChecked(project.id)}
        type="checkbox"
      />
      <label>{project.name}</label>
    </div>
  );
};

export default Project;
