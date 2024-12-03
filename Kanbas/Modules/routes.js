import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId",async (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Please login first" });
    }
    if (req.session.currentUser.role === "STUDENT") {
      return res.status(403).json({ message: "Students are not authorized to perform this operation" });
    }
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    const status = await modulesDao.updateModule(moduleId, moduleUpdates);
    res.send(status)
  });

  app.delete("/api/modules/:moduleId",async (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Please login first" });
    }
    if (req.session.currentUser.role === "STUDENT") {
      return res.status(403).json({ message: "Students are not authorized to perform this operation" });
    }
    const { moduleId } = req.params;
    const status = await modulesDao.deleteModule(moduleId);
    res.send(status)
  });
}
