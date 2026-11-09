import type { Response } from "express";

export function handleError(err: unknown, res: Response): void {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("An unknown error occurred");
  }

  res.status(500).send("Server Error");
};
