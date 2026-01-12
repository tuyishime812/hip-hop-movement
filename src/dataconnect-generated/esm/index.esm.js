import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'hip-hop-foundation',
  location: 'us-east4'
};

export const createNewModuleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewModule', inputVars);
}
createNewModuleRef.operationName = 'CreateNewModule';

export function createNewModule(dcOrVars, vars) {
  return executeMutation(createNewModuleRef(dcOrVars, vars));
}

export const listModulesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListModules');
}
listModulesRef.operationName = 'ListModules';

export function listModules(dc) {
  return executeQuery(listModulesRef(dc));
}

export const enrollUserInModuleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollUserInModule', inputVars);
}
enrollUserInModuleRef.operationName = 'EnrollUserInModule';

export function enrollUserInModule(dcOrVars, vars) {
  return executeMutation(enrollUserInModuleRef(dcOrVars, vars));
}

export const getUserEnrollmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserEnrollments', inputVars);
}
getUserEnrollmentsRef.operationName = 'GetUserEnrollments';

export function getUserEnrollments(dcOrVars, vars) {
  return executeQuery(getUserEnrollmentsRef(dcOrVars, vars));
}

