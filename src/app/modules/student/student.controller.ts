import { Request, Response } from "express";
import { StudentServices } from "./student.servcie";
import Joi from "joi";

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Joi
    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .required()
        .min(2)
        .max(15)
        .pattern(/^[A-Z][a-z]*$/, { name: "capitalized" })
        .messages({
          "string.pattern.base": "{#label} should start with a capital letter",
        }),
      lastName: Joi.string().required(),
    });

    const guardianSchema = Joi.object({
      fatherName: Joi.string().required(),
      fatherOccupation: Joi.string().required(),
      fatherContactNumber: Joi.string().required(),
      motherName: Joi.string().required(),
      motherOccupation: Joi.string().required(),
      motherContactNumber: Joi.string().required(),
    });

    const localGuardianSchema = Joi.object({
      name: Joi.string().required(),
      occupation: Joi.string().required(),
      contactNumber: Joi.string().required(),
      address: Joi.string().required(),
    });

    const studentSchema = Joi.object({
      id: Joi.number().required(),
      name: userNameSchema.required(),
      gender: Joi.string().valid("male", "female", "others").required(),
      contactNumber: Joi.string().required(),
      emergencyNumber: Joi.string().required(),
      dateOfBirth: Joi.string().required(),
      email: Joi.string().email().required(),
      bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .required(),
      presentAddress: Joi.string().required(),
      permanentAddress: Joi.string().required(),
      guardian: guardianSchema.required(),
      localGuardian: localGuardianSchema.required(),
      profileImage: Joi.string(),
      isActive: Joi.string().valid("active", "block").default("active"),
    });

    const { student: studentData } = req.body;
    const { error, value } = studentSchema.validate(studentData);
    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    res.status(200).json({
      success: true,
      message: "student is created succesfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Student can't be created",
      error: err,
    });
  }
};

const getAllstudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "students are retrived succesfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Students can't retrived succesfully",
      error: err,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      massage: "Student is retrived Succesfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Student can't retrived succesfully",
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllstudents,
  getSingleStudent,
};
