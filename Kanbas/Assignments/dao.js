
import assignmentModel from "./model.js";
import { ObjectId } from "mongodb";
export function findAssignmentsForCourse(courseId) {
  const courseObjectId = new ObjectId(String(courseId));
  return assignmentModel.find({course:courseObjectId})
}

export function createAssignment(assignment) {
  return assignmentModel.create(assignment);
}

export function deleteAssignment(assignmentId) {
  const assignmentObjectId = new ObjectId(String(assignmentId));
  return assignmentModel.deleteOne({_id:assignmentObjectId});
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignmentObjectId = new ObjectId(String(assignmentId));
  return assignmentModel.updateOne({_id:assignmentObjectId},assignmentUpdates);
}
