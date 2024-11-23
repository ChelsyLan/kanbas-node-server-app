import Database from "../Database/index.js";
export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) =>assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssginment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssginment];
  return newAssginment;
}

export function deleteAssignment(assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter((a) => a._id !== assignmentId);
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find((a) => a._id === assignmentId);
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}