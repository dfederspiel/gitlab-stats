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

  const [checked, setChecked] = useState<string[]>([]);

  if (loading) return <>Loading...</>;
  if (error) return <>${error.message}</>;
  if (!data) return <>No Data</>;

  const projectConnection = getFragmentData(
    ProjectConnectionFragmentDoc,
    data.projects
  );

  return (
    projectConnection && (
      <div>
        {projectConnection.nodes?.map((projectFragment) => {
          const project = getFragmentData(ProjectFragmentDoc, projectFragment);

          return (
            project &&
            projectFragment && (
              <Project
                selectedProjects={checked}
                onChecked={(value) => {
                  const newChecked = [...checked];
                  if (newChecked.includes(value))
                    newChecked.splice(newChecked.indexOf(value), 1);
                  else {
                    newChecked.push(value);
                  }
                  setChecked(newChecked);
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
