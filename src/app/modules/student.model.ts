import { Schema, model } from "mongoose";
import { Guardian, Student, UserName } from "./student/student.interface";
// import validator from "validator";

//schema class e student er instance userName set kore type er moto use kora
const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "vi first name lagbei lagbe"],
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
  id: { type: Number, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: [true, "Please enter your name"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not supported",
    },
    required: [true, "please enter your gender"],
  },
  contactNumber: {
    type: String,
    required: [true, "Please Enter your contact number"],
  },
  emergencyNumber: { type: String, required: true },
  dateOfBirth: {
    type: String,
    required: [
      true,
      "please enter your emergency number so that we can reach you",
    ],
  },
  email: {
    type: String,
    required: [true, "please enter your email address"],
    unique: true,
    // validate: {
    //   validator: (value: string) => {
    //     validator.isEmail(value);
    //   },
    //   message: "{VALUE} is not a valid email",
    // },
  },
  bloodGroup: {
    type: String,
    // enum: {
    //   values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    //   message: "{VALUE} this not a proper blood group",
    // },
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, "enter your guardian details"],
  },
  localGuardian: {
    type: loaclGuardanSchema,
    required: [true, "We need your local guardian details for emergency"],
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ["active", "block"],
    default: "active",
  },
});

// MODEL CREATION
export const StudentModel = model<Student>("Student", studentSchema);
// model ke ekta variable e rakhsi > model<Student> ekhane student ta mainly generic hisebe type set kortese ("student",...) ta mainly ei model er name ta dedicate kore and (..., studentSchema) mainly ta mane param er 2nd ta oi generic theke ba instance theke je schema seta dedicate kore
