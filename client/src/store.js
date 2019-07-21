import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import reducer from "./reducer";
import rootSaga from "./saga/index";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

const store = createStore(reducer, applyMiddleware(...middlewares));
const sagaInstance = sagaMiddleware.run(rootSaga);
let initData = store.getState();

const dispatch = store.dispatch;
console.log("initData:", initData);

export { store, sagaInstance, dispatch };
