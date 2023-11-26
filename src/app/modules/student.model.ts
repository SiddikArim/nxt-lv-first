import { Schema, model } from "mongoose";
import { Guardian, Student, UserName } from "./student/student.interface";

//schema class e student er instance userName set kore type er moto use kora
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});
// shchema class use kore guardian keo type hisebe use
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNumber: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNumber: { type: String, required: true },
});
// schema class use kore loaclGuardan generic e diye dibo same vabe jeno eta keo type hisebe use kora jay
const loaclGuardanSchema = new Schema({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true },
});
// schema class diye student
const studentSchema = new Schema<Student>({
  id: { type: Number },
  name: userNameSchema,
  gender: ["male", "female"],
  contactNumber: { type: String, required: true },
  emergencyNumber: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  email: { type: String, required: true },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: loaclGuardanSchema,
  profileImage: { type: String },
  isActive: ["active", "block"],
});

// MODEL CREATION
export const StudentModel = model<Student>("Student", studentSchema);
// model ke ekta variable e rakhsi > model<Student> ekhane student ta mainly generic hisebe type set kortese ("student",...) ta mainly ei model er name ta dedicate kore and (..., studentSchema) mainly ta mane param er 2nd ta oi generic theke ba instance theke je schema seta dedicate kore
