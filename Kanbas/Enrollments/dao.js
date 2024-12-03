import model from "./model.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
export async function findCoursesForUser(userId) {
  console.log("Input userId:", userId);
  const userObjectId = new ObjectId(userId);
  console.log("Converted ObjectId:", userObjectId);
  const enrollments = await model
    .find({ user: userObjectId })
    .populate("course");
  console.log("Found enrollments:", enrollments);
  const populatedEnrollments = await model
    .find({ user: userObjectId })
    .populate("course");
  console.log("Populated enrollments:", populatedEnrollments);

  const courses = populatedEnrollments.map((enrollment) => enrollment.course);
  console.log("Returning courses:", courses);

  return courses;
}
export async function findUsersForCourse(courseId) {
  const courseObjectId = new ObjectId(courseId);
  const enrollments = await model
    .find({ course: courseObjectId })
    .populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}
