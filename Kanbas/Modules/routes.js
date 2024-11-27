import * as modulesDao from "./dao.js";
export default function ModuleRoutes(app) {
  app.put("/api/modules/:moduleId", (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Please login first" });
    }
    if (req.session.currentUser.role === "STUDENT") {
      return res.status(403).json({ message: "Students are not authorized to perform this operation" });
    }
    const { moduleId } = req.params;
    const moduleUpdates = req.body;
    modulesDao.updateModule(moduleId, moduleUpdates);
    res.sendStatus(204);
  });

  app.delete("/api/modules/:moduleId", (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Please login first" });
    }
    if (req.session.currentUser.role === "STUDENT") {
      return res.status(403).json({ message: "Students are not authorized to perform this operation" });
    }
    const { moduleId } = req.params;
    modulesDao.deleteModule(moduleId);
    res.sendStatus(204);
  });
}
