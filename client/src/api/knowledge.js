import axios from "axios";

const addData = param => axios.post("/api/user/knowledge/add", param);
const deleteData = ({ id }) => axios.get("/api/user/knowledge/delete?id=" + id);
const updateData = param => axios.post("/api/user/knowledge/update", param);
const getData = () => axios.get("/api/user/knowledge/list");

export default {
  addData,
  getData,
  updateData,
  deleteData
};
