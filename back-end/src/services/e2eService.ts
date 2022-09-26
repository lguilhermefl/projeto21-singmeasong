import * as e2eRepository from "../repositories/e2eRepository.js";

export async function reset() {
  await e2eRepository.reset();
}

export async function update(id: number, propsToUpdate: any) {
  await e2eRepository.update(id, propsToUpdate);
}

export async function populate() {
  await e2eRepository.populate();
}
