
import courseModel from "./model.js";
import enrollmentModel from "../Enrollments/model.js";
import { ObjectId } from "mongodb";
export function findAllCourses() {
  return courseModel.find();
}

export async function findCoursesForEnrolledUser(userId) {
  const userObjectId = new ObjectId(String(userId));
  const enrollments = await enrollmentModel.find({ user: userObjectId, status: "ENROLLED" });
  const courseIds = enrollments.map(enrollment => enrollment.course);
  const courses = await courseModel.find({ _id: { $in: courseIds } });
  return courses;
}

export function createCourse(course) {
  delete course._id;
  return courseModel.create(course);
}

export function findCourseById(courseId) {
  try {
    if (!ObjectId.isValid(courseId)) {
      throw new Error('Invalid course ID format');
    }
    const courseObjectId = new ObjectId(courseId);
    return courseModel.findById(courseObjectId);
  } catch (error) {
    throw new Error(`Error finding course: ${error.message}`);
  }
}

export function deleteCourse(courseId) {
  const courseObjectId = new ObjectId(String(courseId));
  return courseModel.deleteOne({_id:courseObjectId});
}

export function updateCourse(courseId, courseUpdates) {
  const courseObjectId = new ObjectId(String(courseId));
  return courseModel.updateOne({_id:courseObjectId},{$set:courseUpdates});
}

