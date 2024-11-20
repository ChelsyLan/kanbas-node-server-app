import * as enrollmentsDao from "./dao.js"

function EnrollmentRoutes(app) {
  // enroll user in course
  app.post("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.sendStatus(204);
  });

  // unenroll user from course 
  app.delete("/api/users/:userId/courses/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(204);
  });
}

export default EnrollmentRoutes;