const prefix = "WATCH_SAGA_";
const getSagaType = type => `${prefix}${type}`;
const getReducerType = sagaType => sagaType.replace(prefix, "");

export { prefix, getSagaType, getReducerType };
