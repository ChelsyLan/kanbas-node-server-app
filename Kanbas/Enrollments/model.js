import mongoose from "mongoose";
import enrollmentSchema from "./schema.js";
const model = mongoose.model("EnrollmentModel", enrollmentSchema);
export default model;