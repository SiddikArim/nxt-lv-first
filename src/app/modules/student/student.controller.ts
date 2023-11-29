import { Request, Response } from "express";
import { StudentServices } from "./student.servcie";
// import Joi from "joi";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // creating a schema validation using Joi
    const { error, value } = studentValidationSchema.validate(studentData);
    console.log({ error });
    // will call service function to send this data
    const result = await StudentServices.createStudentIntoDB(value);

    if (error) {
      res.send(500).json({
        success: false,
        message: "Error in the request",
        error: error,
      });
    }

    res.status(200).json({
      success: true,
      message: "student is created succesfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Student can't be created",
      error: error,
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
