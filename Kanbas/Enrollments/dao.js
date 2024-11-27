import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({
    _id: Date.now().toString(),
    user: userId,
    course: courseId,
  });
}

export const unenrollUserFromCourse = (userId, courseId) => {
  const { enrollments } = Database;
  enrollments.filter((e) => {
    e.course !== courseId && e.user !== userId;
  });
};
