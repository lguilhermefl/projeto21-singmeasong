import { Request, Response } from "express";
import * as e2eService from "../services/e2eService.js";

async function reset(req: Request, res: Response) {
  await e2eService.reset();

  res.sendStatus(200);
}

export const e2eController = {
  reset,
};
