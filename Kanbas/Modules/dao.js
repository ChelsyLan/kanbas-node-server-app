import mongoose from "mongoose";
import courseModel from "../Courses/model.js";
import moduleModel from "./model.js";
const {ObjectId} = mongoose.Types;
export function findModulesForCourse(courseId) {
  const courseObjectId = new ObjectId(String(courseId));
  const course = courseModel.findOne({_id:courseObjectId});
  if (!course){
    console.log("course not found",courseId);
    return [];
  }
  return moduleModel.find({course:courseObjectId});
}

export function createModule(module) {
  delete module._id
  return moduleModel.create(module);
}

export function deleteModule(moduleId) {
  const moduleObjectId = new ObjectId(String(moduleId));
  return moduleModel.deleteOne({_id:moduleObjectId});
}

export function updateModule(moduleId, moduleUpdates) {
  if (!ObjectId.isValid(moduleId)) {
    throw new Error('Invalid ObjectId format');
  }
  const moduleObjectId = new ObjectId(moduleId);
  return moduleModel.updateOne({_id:moduleObjectId},moduleUpdates);
}
