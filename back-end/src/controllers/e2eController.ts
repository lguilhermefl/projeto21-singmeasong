import { Request, Response } from "express";
import * as e2eService from "../services/e2eService.js";

async function reset(req: Request, res: Response) {
  await e2eService.reset();

  res.sendStatus(200);
}

async function update(req: Request, res: Response) {
  const { id } = req.params;
  const propsToUpdate = req.body;

  await e2eService.update(+id, propsToUpdate);

  res.sendStatus(200);
}

async function populate(req: Request, res: Response) {
  await e2eService.populate();

  res.sendStatus(201);
}

export const e2eController = {
  reset,
  update,
  populate,
};
