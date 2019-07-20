const knowledge = require("../data/knowledge");

class KnowledgeCtrol {
  async getData(ctx) {
    try {
      let data = await knowledge.getData();
      let res = {
        status: "200",
        content: data,
        message: "查询成功"
      };
      ctx.ok(res);
    } catch (err) {
      let res = {
        status: "500",
        content: [],
        message: "服务器内部错误"
      };
      ctx.ok(res);
      throw err;
    }
  }
  async deleteData(ctx) {
    try {
      let { id } = ctx.query;
      let result = await knowledge.deleteData({ id });

      if (result.affectedRows > 0) {
        let res = {
          status: "200",
          content: null,
          message: "删除成功"
        };
        ctx.ok(res);
      } else {
        let res = {
          status: "400",
          content: null,
          message: "删除失败"
        };
        ctx.ok(res);
      }
    } catch (err) {
      let res = {
        status: "500",
        content: null,
        message: "服务器内部错误"
      };
      ctx.ok(res);
      throw err;
    }
  }
  async addData(ctx) {
    try {
      let { name } = ctx.request.body;
      let result = await knowledge.addData({ name });
      console.log("result---->", result);
      if (result.affectedRows > 0) {
        let res = {
          status: "200",
          content: null,
          message: "添加成功"
        };
        ctx.ok(res);
      } else {
        let res = {
          status: "400",
          content: null,
          message: "添加失败"
        };
        ctx.ok(res);
      }
    } catch (err) {
      let res = {
        status: "500",
        content: [],
        message: "服务器内部错误"
      };
      ctx.ok(res);
      throw err;
    }
  }
  async updateData(ctx) {
    try {
      let { name, id } = ctx.request.body;
      let result = await knowledge.updateData({ name, id });
      if (result.affectedRows > 0) {
        let res = {
          status: "200",
          content: null,
          message: "更新成功"
        };
        ctx.ok(res);
      } else {
        let res = {
          status: "400",
          content: null,
          message: "更新失败"
        };
        ctx.ok(res);
      }
    } catch (err) {
      let res = {
        status: "500",
        content: [],
        message: "服务器内部错误"
      };
      ctx.ok(res);
      throw err;
    }
  }
}

module.exports = new KnowledgeCtrol();
