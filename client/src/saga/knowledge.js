import { call, put, takeEvery, select } from "redux-saga/effects";
import Apis from "../api/knowledge";
import Action from "../action/knowledge";
import { getSagaType, getReducerType } from "../utils/sagaType";
import { message } from "antd";

function* getData(action) {
  try {
    let type = getReducerType(action.type);
    let res = yield call(Apis.getData);
    if (res.data.status === "200") {
      let action = {
        type,
        payload: {
          data: res.data.content,
          name: "",
          editName: ""
        }
      };
      yield put(action);
    } else {
      message.warning("服务异常");
    }
  } catch (err) {
    console.log(err);
  }
}

function* deleteData(action) {
  try {
    let type = getReducerType(action.type);
    let { id } = action.param;
    let res = yield call(Apis.deleteData.bind(this, { id }));
    if (res.data.status === "200") {
      message.success("删除成功");
      let knowledge = yield select(state => state.knowledge);
      console.log("knowledge:", knowledge);
      let data = knowledge.data.filter(item => item.id !== id);
      let action = {
        type,
        payload: {
          data: data,
          name: "",
          editName: ""
        }
      };
      yield put(action);
    } else {
      message.warning("服务异常");
    }
  } catch (err) {
    console.log(err);
  }
}

function* addData(action) {
  try {
    let res = yield call(Apis.addData.bind(this, action.param));
    if (res.data.status === "200") {
      message.success("添加成功");
      yield put({
        type: getSagaType(Action.GET_KNOW_LIST)
      });
    } else {
      message.warning("服务异常");
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateData(action) {
  try {
    let res = yield call(Apis.updateData.bind(this, action.param));
    if (res.data.status === "200") {
      message.success("修改成功");
      let type = getSagaType(Action.GET_KNOW_LIST);
      let action = {
        type
      };
      yield put(action);
    } else {
      message.warning("服务异常");
    }
  } catch (err) {
    console.log(err);
  }
}

export default function* knowledge() {
  yield takeEvery(getSagaType(Action.GET_KNOW_LIST), getData);
  yield takeEvery(getSagaType(Action.DELETE_KNOW), deleteData);
  yield takeEvery(getSagaType(Action.ADD_KNOW), addData);
  yield takeEvery(getSagaType(Action.UPDATE_KNOW), updateData);
}
