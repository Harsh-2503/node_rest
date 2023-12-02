import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import manufacturerRouter from "./src/routes/manufacturer.route";
import equipmentRouter from './src/routes/equipment.route';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "ok" });
});

app.use("/manufacturer", manufacturerRouter);
app.use("/equipment", equipmentRouter);

app.listen(port, () => {
  console.log(`Your Node Server is Running on http://localhost:${port}`);
});
