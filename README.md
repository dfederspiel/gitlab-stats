# GitLab Stats
A Vite based React app that integrates with GitLab's built in GraphQL explorer, showing contribution metrics for individual contributors.

Uses GraphQL codegen to generate static types for the GitLab schema and queries. Also uses the new Fragment convention to reduce the need for data mapping.

## Setup
Before this will work, you'll need to add a `.env` file to the root of the project. See the `.env.example` for guidance.

## Install and Go
```
npm i
npm run dev
```

## GraphQL CodeGen
Look at `codegen.ts` for config settings.
```
npm run graphql-codegen
```

Optionally use the `--watch` flag to rerun the generator on `.graphql` file changes

## More Reading
[GraphQL CodeGen](https://the-guild.dev/graphql/codegen)  
[Vite](https://vitejs.dev/)