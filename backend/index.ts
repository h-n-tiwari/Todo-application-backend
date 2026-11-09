import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import todoRoutes from "./routes/todos.ts"

const app = express();
const port = 7000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// TODO ROUTES
app.use("/todos", todoRoutes);

// ABOUT ROUTE
app.get("/about", (_req: Request, res: Response) => {
  res.send("Hello!");
});

// START SERVER
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
