import Action from "../action/knowledge";

let initData = {
  data: [],
  name: "",
  editName: ""
};

const knowledge = (data = initData, action) => {
  switch (action.type) {
    case Action.ADD_KNOW:
    case Action.DELETE_KNOW:
    case Action.UPDATE_KNOW:
    case Action.GET_KNOW_LIST:
    case Action.HANDLE_KNOW_EDIT:
      return { ...data, ...action.payload };
    case Action.CHANGE_KNOW_VALUE:
      let param = {
        [action.payload.key]: action.payload.value
      };
      return { ...data, ...param };
    default:
      return { ...data };
  }
};

export default knowledge;
