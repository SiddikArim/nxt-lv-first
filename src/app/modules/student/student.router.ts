import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

// will call a controller

router.post("/create-student", StudentControllers.createStudent);
router.get("/", StudentControllers.getAllstudents);
router.get("/:studentId", StudentControllers.getSingleStudent);
export const StudentsRoute = router;
