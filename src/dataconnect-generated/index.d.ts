import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Achievement_Key {
  id: UUIDString;
  __typename?: 'Achievement_Key';
}

export interface CreateNewModuleData {
  module_insert: Module_Key;
}

export interface CreateNewModuleVariables {
  title: string;
  description: string;
  difficultyLevel: string;
  estimatedCompletionTime?: number | null;
  imageUrl?: string | null;
}

export interface EnrollUserInModuleData {
  enrollment_insert: Enrollment_Key;
}

export interface EnrollUserInModuleVariables {
  userId: UUIDString;
  moduleId: UUIDString;
}

export interface Enrollment_Key {
  userId: UUIDString;
  moduleId: UUIDString;
  __typename?: 'Enrollment_Key';
}

export interface Exercise_Key {
  id: UUIDString;
  __typename?: 'Exercise_Key';
}

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

export interface GetUserEnrollmentsVariables {
  userId: UUIDString;
}

export interface Lesson_Key {
  id: UUIDString;
  __typename?: 'Lesson_Key';
}

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

export interface Module_Key {
  id: UUIDString;
  __typename?: 'Module_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateNewModuleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNewModuleVariables): MutationRef<CreateNewModuleData, CreateNewModuleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNewModuleVariables): MutationRef<CreateNewModuleData, CreateNewModuleVariables>;
  operationName: string;
}
export const createNewModuleRef: CreateNewModuleRef;

export function createNewModule(vars: CreateNewModuleVariables): MutationPromise<CreateNewModuleData, CreateNewModuleVariables>;
export function createNewModule(dc: DataConnect, vars: CreateNewModuleVariables): MutationPromise<CreateNewModuleData, CreateNewModuleVariables>;

interface ListModulesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListModulesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListModulesData, undefined>;
  operationName: string;
}
export const listModulesRef: ListModulesRef;

export function listModules(): QueryPromise<ListModulesData, undefined>;
export function listModules(dc: DataConnect): QueryPromise<ListModulesData, undefined>;

interface EnrollUserInModuleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: EnrollUserInModuleVariables): MutationRef<EnrollUserInModuleData, EnrollUserInModuleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: EnrollUserInModuleVariables): MutationRef<EnrollUserInModuleData, EnrollUserInModuleVariables>;
  operationName: string;
}
export const enrollUserInModuleRef: EnrollUserInModuleRef;

export function enrollUserInModule(vars: EnrollUserInModuleVariables): MutationPromise<EnrollUserInModuleData, EnrollUserInModuleVariables>;
export function enrollUserInModule(dc: DataConnect, vars: EnrollUserInModuleVariables): MutationPromise<EnrollUserInModuleData, EnrollUserInModuleVariables>;

interface GetUserEnrollmentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserEnrollmentsVariables): QueryRef<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserEnrollmentsVariables): QueryRef<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;
  operationName: string;
}
export const getUserEnrollmentsRef: GetUserEnrollmentsRef;

export function getUserEnrollments(vars: GetUserEnrollmentsVariables): QueryPromise<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;
export function getUserEnrollments(dc: DataConnect, vars: GetUserEnrollmentsVariables): QueryPromise<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;

