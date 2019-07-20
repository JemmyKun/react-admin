const { query } = require("../mysql/config");

class Knowledge {
  getData() {
    let sql = "SELECT * FROM knowledge ORDER BY updateTime DESC";
    return query(sql, []);
  }
  addData(param) {
    let { name } = param;
    let sql =
      "INSERT INTO knowledge (name,createTime,updateTime) VALUES(?,?,?)";
    let createTime = new Date().getTime();
    let updateTime = createTime;
    return query(sql, [name, createTime, updateTime]);
  }
  deleteData(param) {
    let { id } = param;
    let sql = "DELETE FROM knowledge WHERE id=?";
    return query(sql, [id]);
  }
  updateData(param) {
    let { name, id } = param;
    console.log("param---->>", param.name);
    let updateTime = new Date().getTime();
    let sql = "UPDATE knowledge SET name=?,updateTime=? WHERE id=?";
    return query(sql, [name, updateTime, id]);
  }
}

module.exports = new Knowledge();
