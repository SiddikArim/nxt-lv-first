import express, { Application, Request, Response } from "express";
import cors from "cors";
import { StudentsRoute } from "./app/modules/student/student.router";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentsRoute);

const getAController = (req: Request, res: Response) => {
  res.send("Hello World!");
};
app.get("/", getAController);

export default app;
