import { Request, Response, NextFunction } from "express";
import { getManufacturers, createManufacturer, updateManufacturer, removeManufacturer, manufacturerEquipment } from "../services/manufacturer.service";
import { ManufacturerResponse } from "../utils/interfaces/manufacturer.interface";
import { QueryResult } from "pg";
import { Manufacturer, CreateManufacturer, UpdateManufacturer } from "../utils/interfaces/manufacturer.interface";
import { validationResult } from 'express-validator'
import { PostManufactureRequest } from "../utils/types/manufacturer.type";
import { Equipment, EquipmentResponse } from "../utils/interfaces/equipment.interface";
import { isDuplicateKeyError, isInavlidUUIDError } from "../utils/errors/custom.error";


async function get(req: Request, res: Response<ManufacturerResponse>, next: NextFunction): Promise<void> {
  try {
    const page: unknown = req.query.page;
    const result: QueryResult<Manufacturer> = await getManufacturers(req.params.id, page);
    if (!result.rows || result.rows.length === 0) {
      res.status(404).json({ message: "No records found" })
      return;
    }

    res.status(200).json({ message: "Success", result: result.rows });
  } catch (err) {
    console.error(`Error occurred while getting manufacturers`, err);

    if (isInavlidUUIDError(err)) {
      res.status(422).json({ message: "Invalid value" })
      return;
    }

    res.status(500).json({ message: "Internal server error" });
  }
}

async function create(req: Request, res: Response<ManufacturerResponse>, next: NextFunction): Promise<void> {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    res.status(422).json({ message: "Bad Request", error: validationErrors.array() })
    return;
  }
  try {
    const { name } = req.body as CreateManufacturer;

    const result: QueryResult<Manufacturer> = await createManufacturer(name)
    if (!result.rows || result.rows.length === 0) {
      res.status(400).json({ message: "Unable to create records" })
      return;
    }
    res.status(201).json({ message: "Success", result: result.rows });
  }
  catch (err) {
    console.error(`Error occurred while creating manufacturer`, err);
    if (isDuplicateKeyError(err)) {
      res.status(409).json({ message: 'Record already exists' });
      return
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

async function update(req: Request, res: Response<ManufacturerResponse>, next: NextFunction): Promise<void> {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    res.status(422).json({ message: "Bad Request", error: validationErrors.array() })
    return;
  }

  const { name, id } = req.body as UpdateManufacturer;
  try {
    const result: QueryResult<Manufacturer> = await updateManufacturer(id, name)
    if (!result.rows || result.rows.length === 0) {
      res.status(404).json({ message: "Record not found" })
      return;
    }
    res.status(200).json({ message: "Success", result: result.rows });
  }
  catch (err) {
    console.error(`Error occurred while updating manufacturer`, err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function remove(req: Request, res: Response<ManufacturerResponse>, next: NextFunction): Promise<void> {
  try {
    const id: string = req.params.id
    if (!id) {
      res.status(422).json({ message: "Bad Request Id not provided or invalid" })
      return;
    }
    const result: QueryResult<Manufacturer> = await removeManufacturer(id);
    if (!result.rows || result.rows.length === 0) {
      res.status(404).json({ message: "No records found" })
      return;
    }
    res.status(200).json({ message: "Success" });
  }
  catch (err) {
    console.error(`Error occurred while deleting manufacturers`, err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function equipment(req: Request, res: Response<EquipmentResponse>, next: NextFunction): Promise<void> {
  try {

    const { id } = req.body as Manufacturer
    const page: unknown = req.query.page;

    if (!id) {
      res.status(422).json({ message: "Bad Request Id not provided or invalid" })
      return;
    }
    const result: QueryResult<Equipment> = await manufacturerEquipment(id, page);
    if (!result.rows || result.rows.length === 0) {
      res.status(404).json({ message: "No records found" })
      return;
    }
    res.status(200).json({ message: "Success", result: result.rows });
  }
  catch (err) {
    console.error(`Error occurred while deleting manufacturers`, err);
    res.status(500).json({ message: "Internal server error" });
  }
}


export {
  get,
  create,
  update,
  remove,
  equipment
};
