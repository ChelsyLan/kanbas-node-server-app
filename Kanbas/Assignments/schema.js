import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
 {
   title:String,
   course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
   description: String,
   due_date:Date,
   available_date:Date,
   points:Number,
 },
 { collection: "assignments" }
);
export default assignmentSchema;