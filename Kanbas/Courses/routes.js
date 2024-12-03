import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import { ObjectId } from "mongodb";

export default function CourseRoutes(app) {
  app.get("/api/courses", async(req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
 
  app.put("/api/courses/:courseId", async(req, res) => {
    const {courseId} = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
   res.send(status);
  });

  // create module
  app.post("/api/courses/:courseId/modules", async(req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Please login first" });
    }
    if (req.session.currentUser.role === "STUDENT") {
      return res.status(403).json({ message: "Students are not authorized to perform this operation" });
    }
    const {courseId} = req.params;
    const course = await dao.findCourseById(courseId);
    const module = { ...req.body, course: course._id };
    const newModule = await modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/modules", async(req, res) => {
    const { courseId } = req.params;
    const modules = await modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  // create assignment
  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    if (!req.session.currentUser) {
      return res.status(401).json({ message: "Please login first" });
    }
    if (req.session.currentUser.role === "STUDENT") {
      return res.status(403).json({ message: "Students are not authorized to perform this operation" });
    }
    const {courseId} = req.params;
    const courseObjectId = new ObjectId(String(courseId));
    const assignment = { ...req.body, course: courseObjectId };
    const newAssginment = await assignmentsDao.createAssignment(assignment);
    console.warn('new data: ', newAssginment);
    res.send(newAssginment);
  });

  // retrieve assignment
  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  // create course and enroll author 
  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      await enrollmentsDao.enrollUserInCourse(currentUser._id, course._id);
    }
    res.json(course);
  });

  app.get("/api/courses/:courseId/users",async (req,res)=>{
    const {courseId} = req.params;
    const users = await enrollmentsDao.findUsersForCourse(courseId);
    res.json(users);
  })
}
