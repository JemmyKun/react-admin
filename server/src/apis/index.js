const KnowledgeCtrol = require("../controller/knowledgeCtrol");

const Apis = router => {
  router.prefix("/api/user");
  router.get("/knowledge/list", KnowledgeCtrol.getData);
  router.post("/knowledge/add", KnowledgeCtrol.addData);
  router.get("/knowledge/delete", KnowledgeCtrol.deleteData);
  router.post("/knowledge/update", KnowledgeCtrol.updateData);
};

module.exports = Apis;
