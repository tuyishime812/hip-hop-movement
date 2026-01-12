import { CreateNewModuleData, CreateNewModuleVariables, ListModulesData, EnrollUserInModuleData, EnrollUserInModuleVariables, GetUserEnrollmentsData, GetUserEnrollmentsVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateNewModule(options?: useDataConnectMutationOptions<CreateNewModuleData, FirebaseError, CreateNewModuleVariables>): UseDataConnectMutationResult<CreateNewModuleData, CreateNewModuleVariables>;
export function useCreateNewModule(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNewModuleData, FirebaseError, CreateNewModuleVariables>): UseDataConnectMutationResult<CreateNewModuleData, CreateNewModuleVariables>;

export function useListModules(options?: useDataConnectQueryOptions<ListModulesData>): UseDataConnectQueryResult<ListModulesData, undefined>;
export function useListModules(dc: DataConnect, options?: useDataConnectQueryOptions<ListModulesData>): UseDataConnectQueryResult<ListModulesData, undefined>;

export function useEnrollUserInModule(options?: useDataConnectMutationOptions<EnrollUserInModuleData, FirebaseError, EnrollUserInModuleVariables>): UseDataConnectMutationResult<EnrollUserInModuleData, EnrollUserInModuleVariables>;
export function useEnrollUserInModule(dc: DataConnect, options?: useDataConnectMutationOptions<EnrollUserInModuleData, FirebaseError, EnrollUserInModuleVariables>): UseDataConnectMutationResult<EnrollUserInModuleData, EnrollUserInModuleVariables>;

export function useGetUserEnrollments(vars: GetUserEnrollmentsVariables, options?: useDataConnectQueryOptions<GetUserEnrollmentsData>): UseDataConnectQueryResult<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;
export function useGetUserEnrollments(dc: DataConnect, vars: GetUserEnrollmentsVariables, options?: useDataConnectQueryOptions<GetUserEnrollmentsData>): UseDataConnectQueryResult<GetUserEnrollmentsData, GetUserEnrollmentsVariables>;
