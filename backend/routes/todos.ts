import type { Request, Response } from "express";
import { Router } from "express";
import pool from "../db.ts";
import { handleError } from "../utils/handleError.ts";

const router = Router();

// CREATE A NEW TODO
router.post("/", async (req: Request, res: Response) => {
  try {
    const { description, completed = false } = req.body as {
      description: string;
      completed?: boolean;
    };
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed],
    );

    res.status(201).json(newTodo.rows[0]);
  } catch (err: unknown) {
    handleError(err, res);
  }
});

// GET ALL TODOS
router.get("/", async (_req: Request, res: Response) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id ASC",
    );

    res.json(allTodos.rows);
  } catch (err: unknown) {
    handleError(err, res);
  }
});

// UPDATE A TODO
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { description, completed = false } = req.body as {
      description: string;
      completed?: boolean;
    };

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
      [description, completed, id],
    );

    if (updateTodo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({
      message: "Todo was updated!",
      todo: updateTodo.rows[0],
    });
  } catch (err: unknown) {
    handleError(err, res);
  }
});

// DELETE A TODO
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETRUNING *",
      [id],
    );

    if (deleteTodo.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({
      msg: "Todo was successfully deleted!",
    });
  } catch (err: unknown) {
    handleError(err, res);
  }
});

export default router;
