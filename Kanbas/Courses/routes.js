import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    dao.deleteCourse(courseId);
    res.sendStatus(204);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    try {
      const { courseId } = req.params;
      const courseUpdates = req.body;
      const updatedCourse = dao.updateCourse(courseId, courseUpdates);
      if (!updatedCourse) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(updatedCourse);  // Send back the updated course instead of 204
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const courseId = req.params;
    const module = { ...req.body, course: courseId };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  // create assignment
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const courseId = req.params;
    const assignment = { ...req.body, course: courseId };
    const newAssginment = assignmentsDao.createAssignment(assignment);
    res.send(newAssginment);
  });

  // retrieve assignment
  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });
}
