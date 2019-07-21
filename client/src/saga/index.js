import { all } from "redux-saga/effects";
import knowledge from "./knowledge";

export default function* rootSaga() {
  yield all([knowledge()]);
}
