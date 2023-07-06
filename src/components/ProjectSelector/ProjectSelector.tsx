import { useQuery } from '@apollo/client';
import {
  ProjectConnectionFragmentDoc,
  ProjectFragmentDoc,
  ProjectsDocument,
  ProjectsQuery,
  ProjectsQueryVariables,
} from '../../graphql/gitlab/graphql';
import Pager from '../common/Pager';
import { getFragmentData } from '../../graphql/gitlab';
import Project from './Project';
import { useState } from 'react';

import './styles.css';

interface ProjectSelectorProps {
  onSelectionChanged(checked: string[]): void;
}
const ProjectSelector = ({ onSelectionChanged }: ProjectSelectorProps) => {
  const { loading, error, data, refetch } = useQuery<
    ProjectsQuery,
    ProjectsQueryVariables
  >(ProjectsDocument, {
    variables: {
      first: 10,
      before: null,
      after: null,
    },
  });

  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  if (loading) return <>Loading...</>;
  if (error) return <>${error.message}</>;
  if (!data) return <>No Data</>;

  const projectConnection = getFragmentData(
    ProjectConnectionFragmentDoc,
    data.projects
  );

  return (
    projectConnection && (
      <div className="project-selector">
        {projectConnection.nodes?.map((projectFragment) => {
          const project = getFragmentData(ProjectFragmentDoc, projectFragment);

          return (
            project &&
            projectFragment && (
              <Project
                selectedProjects={selectedProjects}
                onChecked={(value) => {
                  const newChecked = [...selectedProjects];
                  if (newChecked.includes(value))
                    newChecked.splice(newChecked.indexOf(value), 1);
                  else {
                    newChecked.push(value);
                  }
                  setSelectedProjects(newChecked);
                  onSelectionChanged(newChecked);
                }}
                key={`project-${project.id}`}
                projectFragment={projectFragment}
              />
            )
          );
        })}
        <Pager
          pageInfoFragment={projectConnection?.pageInfo}
          onPageClick={(cursor, direction) => {
            if (direction === 'after') {
              refetch({
                first: 10,
                last: null,
                after: cursor,
                before: null,
              });
            } else {
              refetch({
                first: null,
                last: 10,
                after: null,
                before: cursor,
              });
            }
          }}
        />
      </div>
    )
  );
};

export default ProjectSelector;
