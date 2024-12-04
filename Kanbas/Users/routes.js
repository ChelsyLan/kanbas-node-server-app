import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
export default function UserRoutes(app) {
  const createUser = async(req, res) => {
    const newUser = await dao.createUser(req.body);
    res.json(newUser);
  };
  const deleteUser = async(req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };
  const findAllUsers = async(req, res) => {
    const {role} = req.query;
    if (role) {
      const allUsers = await dao.findUserByRole(role);
      res.json(allUsers);
      return;
    }
    const {name} = req.query;
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const allUsers = await dao.findAllUsers();
    res.json(allUsers);
  };
  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async(req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    console.log("currentUser",currentUser);
    if (currentUser._id === userId){
      req.session["currentUser"] = {...currentUser,...userUpdates};
    }
    console.log("updated successfully");
    res.json(currentUser);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already in use" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };
  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session.currentUser = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  const findCoursesForEnrolledUser = async(req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      console.log("Please sign in first to find course");
      console.log("session when finding course",req.session);
      return;
    }
    if (currentUser.role === "ADMIN") {
      const courses = await courseDao.findAllCourses();
      res.json(courses);
      return;
    }
    let { uid } = req.params;
    console.log("Received uid:", uid);  // Debug log
    console.log("Current user:", currentUser);  // Debug log
    if (uid === "current" || !uid) {
      uid = currentUser._id;
    }
    
    const courses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(courses);
  };

  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    console.log("currentUser", req.session, req.body);

    if (!currentUser) {
      res.json({
        code: 1,
        msg: 'fail to create course,Please signin first'
      })
    }

    if (currentUser.role === 'STUDENT') {
      return res.status(403).json({ message: "Students are not authorized to perform this operation" });
    }
    const newCourse = courseDao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  app.get("/api/users/:uid/courses", findCoursesForEnrolledUser);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users/current/courses", createCourse);
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
 app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

}
