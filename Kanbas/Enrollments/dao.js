import model from "./model.js";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
export async function findCoursesForUser(userId) {
  const userObjectId = new ObjectId(userId);
  const enrollments = await model
    .find({ user: userObjectId })
    .populate("course");
  const populatedEnrollments = await model
    .find({ user: userObjectId })
    .populate("course");
  const courses = populatedEnrollments.map((enrollment) => enrollment.course);
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
