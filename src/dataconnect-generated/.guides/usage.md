# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateNewModule, useListModules, useEnrollUserInModule, useGetUserEnrollments } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateNewModule(createNewModuleVars);

const { data, isPending, isSuccess, isError, error } = useListModules();

const { data, isPending, isSuccess, isError, error } = useEnrollUserInModule(enrollUserInModuleVars);

const { data, isPending, isSuccess, isError, error } = useGetUserEnrollments(getUserEnrollmentsVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createNewModule, listModules, enrollUserInModule, getUserEnrollments } from '@dataconnect/generated';


// Operation CreateNewModule:  For variables, look at type CreateNewModuleVars in ../index.d.ts
const { data } = await CreateNewModule(dataConnect, createNewModuleVars);

// Operation ListModules: 
const { data } = await ListModules(dataConnect);

// Operation EnrollUserInModule:  For variables, look at type EnrollUserInModuleVars in ../index.d.ts
const { data } = await EnrollUserInModule(dataConnect, enrollUserInModuleVars);

// Operation GetUserEnrollments:  For variables, look at type GetUserEnrollmentsVars in ../index.d.ts
const { data } = await GetUserEnrollments(dataConnect, getUserEnrollmentsVars);


```