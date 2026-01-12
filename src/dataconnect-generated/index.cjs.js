const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'hip-hop-foundation',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createNewModuleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNewModule', inputVars);
}
createNewModuleRef.operationName = 'CreateNewModule';
exports.createNewModuleRef = createNewModuleRef;

exports.createNewModule = function createNewModule(dcOrVars, vars) {
  return executeMutation(createNewModuleRef(dcOrVars, vars));
};

const listModulesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListModules');
}
listModulesRef.operationName = 'ListModules';
exports.listModulesRef = listModulesRef;

exports.listModules = function listModules(dc) {
  return executeQuery(listModulesRef(dc));
};

const enrollUserInModuleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'EnrollUserInModule', inputVars);
}
enrollUserInModuleRef.operationName = 'EnrollUserInModule';
exports.enrollUserInModuleRef = enrollUserInModuleRef;

exports.enrollUserInModule = function enrollUserInModule(dcOrVars, vars) {
  return executeMutation(enrollUserInModuleRef(dcOrVars, vars));
};

const getUserEnrollmentsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserEnrollments', inputVars);
}
getUserEnrollmentsRef.operationName = 'GetUserEnrollments';
exports.getUserEnrollmentsRef = getUserEnrollmentsRef;

exports.getUserEnrollments = function getUserEnrollments(dcOrVars, vars) {
  return executeQuery(getUserEnrollmentsRef(dcOrVars, vars));
};
