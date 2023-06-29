# Setup
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