# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListModules*](#listmodules)
  - [*GetUserEnrollments*](#getuserenrollments)
- [**Mutations**](#mutations)
  - [*CreateNewModule*](#createnewmodule)
  - [*EnrollUserInModule*](#enrolluserinmodule)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListModules
You can execute the `ListModules` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listModules(): QueryPromise<ListModulesData, undefined>;

interface ListModulesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListModulesData, undefined>;
}
export const listModulesRef: ListModulesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listModules(dc: DataConnect): QueryPromise<ListModulesData, undefined>;

interface ListModulesRef {
  ...
  (dc: DataConnect): QueryRef<ListModulesData, undefined>;
}
export const listModulesRef: ListModulesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listModulesRef:
```typescript
const name = listModulesRef.operationName;
console.log(name);
```

### Variables
The `ListModules` query has no variables.
### Return Type
Recall that executing the `ListModules` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListModulesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListModulesData {
  modules: ({
    id: UUIDString;
    title: string;
    description: string;
    difficultyLevel: string;
    estimatedCompletionTime?: number | null;
    imageUrl?: string | null;
  } & Module_Key)[];
}
```
### Using `ListModules`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listModules } from '@dataconnect/generated';


// Call the `listModules()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listModules();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listModules(dataConnect);

console.log(data.modules);

// Or, you can use the `Promise` API.
listModules().then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

### Using `ListModules`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listModulesRef } from '@dataconnect/generated';


// Call the `listModulesRef()` function to get a reference to the query.
const ref = listModulesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listModulesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.modules);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.modules);
});
```

## GetUserEnrollments
You can execute the `GetUserEnrollments` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserEnrollments(vars: GetUserEnrollmentsVariables): QueryPromise<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;

interface GetUserEnrollmentsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentsVariables): QueryRef<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;
}
export const getUserEnrollmentsRef: GetUserEnrollmentsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserEnrollments(dc: DataConnect, vars: GetUserEnrollmentsVariables): QueryPromise<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;

interface GetUserEnrollmentsRef {
  ...
  (dc: DataConnect, vars: GetUserEnrollmentsVariables): QueryRef<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;
}
export const getUserEnrollmentsRef: GetUserEnrollmentsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserEnrollmentsRef:
```typescript
const name = getUserEnrollmentsRef.operationName;
console.log(name);
```

### Variables
The `GetUserEnrollments` query requires an argument of type `GetUserEnrollmentsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserEnrollmentsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserEnrollments` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserEnrollmentsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserEnrollmentsData {
  enrollments: ({
    moduleId: UUIDString;
    completedAt?: TimestampString | null;
    enrolledAt: TimestampString;
    lastAccessedAt?: TimestampString | null;
    progress: number;
    status: string;
    module: {
      title: string;
      description: string;
      difficultyLevel: string;
    };
  })[];
}
```
### Using `GetUserEnrollments`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollments, GetUserEnrollmentsVariables } from '@dataconnect/generated';

// The `GetUserEnrollments` query requires an argument of type `GetUserEnrollmentsVariables`:
const getUserEnrollmentsVars: GetUserEnrollmentsVariables = {
  userId: ..., 
};

// Call the `getUserEnrollments()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserEnrollments(getUserEnrollmentsVars);
// Variables can be defined inline as well.
const { data } = await getUserEnrollments({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserEnrollments(dataConnect, getUserEnrollmentsVars);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
getUserEnrollments(getUserEnrollmentsVars).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

### Using `GetUserEnrollments`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserEnrollmentsRef, GetUserEnrollmentsVariables } from '@dataconnect/generated';

// The `GetUserEnrollments` query requires an argument of type `GetUserEnrollmentsVariables`:
const getUserEnrollmentsVars: GetUserEnrollmentsVariables = {
  userId: ..., 
};

// Call the `getUserEnrollmentsRef()` function to get a reference to the query.
const ref = getUserEnrollmentsRef(getUserEnrollmentsVars);
// Variables can be defined inline as well.
const ref = getUserEnrollmentsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserEnrollmentsRef(dataConnect, getUserEnrollmentsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.enrollments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollments);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateNewModule
You can execute the `CreateNewModule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createNewModule(vars: CreateNewModuleVariables): MutationPromise<CreateNewModuleData, CreateNewModuleVariables>;

interface CreateNewModuleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewModuleVariables): MutationRef<CreateNewModuleData, CreateNewModuleVariables>;
}
export const createNewModuleRef: CreateNewModuleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNewModule(dc: DataConnect, vars: CreateNewModuleVariables): MutationPromise<CreateNewModuleData, CreateNewModuleVariables>;

interface CreateNewModuleRef {
  ...
  (dc: DataConnect, vars: CreateNewModuleVariables): MutationRef<CreateNewModuleData, CreateNewModuleVariables>;
}
export const createNewModuleRef: CreateNewModuleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNewModuleRef:
```typescript
const name = createNewModuleRef.operationName;
console.log(name);
```

### Variables
The `CreateNewModule` mutation requires an argument of type `CreateNewModuleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateNewModuleVariables {
  title: string;
  description: string;
  difficultyLevel: string;
  estimatedCompletionTime?: number | null;
  imageUrl?: string | null;
}
```
### Return Type
Recall that executing the `CreateNewModule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNewModuleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNewModuleData {
  module_insert: Module_Key;
}
```
### Using `CreateNewModule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNewModule, CreateNewModuleVariables } from '@dataconnect/generated';

// The `CreateNewModule` mutation requires an argument of type `CreateNewModuleVariables`:
const createNewModuleVars: CreateNewModuleVariables = {
  title: ..., 
  description: ..., 
  difficultyLevel: ..., 
  estimatedCompletionTime: ..., // optional
  imageUrl: ..., // optional
};

// Call the `createNewModule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNewModule(createNewModuleVars);
// Variables can be defined inline as well.
const { data } = await createNewModule({ title: ..., description: ..., difficultyLevel: ..., estimatedCompletionTime: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNewModule(dataConnect, createNewModuleVars);

console.log(data.module_insert);

// Or, you can use the `Promise` API.
createNewModule(createNewModuleVars).then((response) => {
  const data = response.data;
  console.log(data.module_insert);
});
```

### Using `CreateNewModule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNewModuleRef, CreateNewModuleVariables } from '@dataconnect/generated';

// The `CreateNewModule` mutation requires an argument of type `CreateNewModuleVariables`:
const createNewModuleVars: CreateNewModuleVariables = {
  title: ..., 
  description: ..., 
  difficultyLevel: ..., 
  estimatedCompletionTime: ..., // optional
  imageUrl: ..., // optional
};

// Call the `createNewModuleRef()` function to get a reference to the mutation.
const ref = createNewModuleRef(createNewModuleVars);
// Variables can be defined inline as well.
const ref = createNewModuleRef({ title: ..., description: ..., difficultyLevel: ..., estimatedCompletionTime: ..., imageUrl: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNewModuleRef(dataConnect, createNewModuleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.module_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.module_insert);
});
```

## EnrollUserInModule
You can execute the `EnrollUserInModule` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
enrollUserInModule(vars: EnrollUserInModuleVariables): MutationPromise<EnrollUserInModuleData, EnrollUserInModuleVariables>;

interface EnrollUserInModuleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollUserInModuleVariables): MutationRef<EnrollUserInModuleData, EnrollUserInModuleVariables>;
}
export const enrollUserInModuleRef: EnrollUserInModuleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
enrollUserInModule(dc: DataConnect, vars: EnrollUserInModuleVariables): MutationPromise<EnrollUserInModuleData, EnrollUserInModuleVariables>;

interface EnrollUserInModuleRef {
  ...
  (dc: DataConnect, vars: EnrollUserInModuleVariables): MutationRef<EnrollUserInModuleData, EnrollUserInModuleVariables>;
}
export const enrollUserInModuleRef: EnrollUserInModuleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the enrollUserInModuleRef:
```typescript
const name = enrollUserInModuleRef.operationName;
console.log(name);
```

### Variables
The `EnrollUserInModule` mutation requires an argument of type `EnrollUserInModuleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface EnrollUserInModuleVariables {
  userId: UUIDString;
  moduleId: UUIDString;
}
```
### Return Type
Recall that executing the `EnrollUserInModule` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `EnrollUserInModuleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface EnrollUserInModuleData {
  enrollment_insert: Enrollment_Key;
}
```
### Using `EnrollUserInModule`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, enrollUserInModule, EnrollUserInModuleVariables } from '@dataconnect/generated';

// The `EnrollUserInModule` mutation requires an argument of type `EnrollUserInModuleVariables`:
const enrollUserInModuleVars: EnrollUserInModuleVariables = {
  userId: ..., 
  moduleId: ..., 
};

// Call the `enrollUserInModule()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await enrollUserInModule(enrollUserInModuleVars);
// Variables can be defined inline as well.
const { data } = await enrollUserInModule({ userId: ..., moduleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await enrollUserInModule(dataConnect, enrollUserInModuleVars);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
enrollUserInModule(enrollUserInModuleVars).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

### Using `EnrollUserInModule`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, enrollUserInModuleRef, EnrollUserInModuleVariables } from '@dataconnect/generated';

// The `EnrollUserInModule` mutation requires an argument of type `EnrollUserInModuleVariables`:
const enrollUserInModuleVars: EnrollUserInModuleVariables = {
  userId: ..., 
  moduleId: ..., 
};

// Call the `enrollUserInModuleRef()` function to get a reference to the mutation.
const ref = enrollUserInModuleRef(enrollUserInModuleVars);
// Variables can be defined inline as well.
const ref = enrollUserInModuleRef({ userId: ..., moduleId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = enrollUserInModuleRef(dataConnect, enrollUserInModuleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.enrollment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.enrollment_insert);
});
```

