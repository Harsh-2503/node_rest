import { Request, Response, NextFunction } from "express";
import { QueryResult } from "pg";
import { Equipment, CreateEquipment, UpdateEquipment } from "../utils/interfaces/equipment.interface";
import { EquipmentResponse } from "../utils/interfaces/equipment.interface";
import { getEquipments, createEquipment, updateEquipment, removeEquipment, equipmentManufacturer } from "../services/equipment.service";
import { getManufacturers } from "../services/manufacturer.service";
import { validationResult } from "express-validator";
import { PostEquipmentRequest } from "../utils/types/equipment.type";
import { Manufacturer } from "../utils/interfaces/manufacturer.interface";
import { isForeignKeyConstraitError } from "../utils/errors/custom.error";


async function get(req: Request, res: Response<EquipmentResponse>, next: NextFunction): Promise<void> {
    try {

        const page: unknown = req.query.page;
        const result: QueryResult<Equipment> = await getEquipments(req.params.id, page);

        if (!result.rows || result.rows.length === 0) {
            res.status(404).json({ message: "No records found" })
            return;
        }
        res.status(200).json({ message: "Success", result: result.rows });
    } catch (err) {
        console.error(`Error occurred while getting manufacturers`, err);
        res.status(500).json({ message: "Internal server error" });
    }
}


async function create(req: Request, res: Response<EquipmentResponse>, next: NextFunction): Promise<void> {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ message: "Bad Request", error: validationErrors.array() })
        return;
    }
    const { model, manufacturer_id, serialnumber } = req.body as CreateEquipment;
    try {
        const result: QueryResult<Equipment> = await createEquipment(model, manufacturer_id, serialnumber)
        if (!result.rows || result.rows.length === 0) {
            res.status(400).json({ message: "Unable to create records" })
            return;
        }
        res.status(201).json({ message: "Success", result: result.rows });

    } catch (err) {
        console.error(`Error occurred while creating manufacturer`, err);
        if (isForeignKeyConstraitError(err)) {
            res.status(404).json({ message: "No manufacturer record found" })
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

async function update(req: PostEquipmentRequest, res: Response<EquipmentResponse>, next: NextFunction): Promise<void> {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        res.status(422).json({ message: "Bad Request", error: validationErrors.array() })
        return;
    }
    const { id, model, manufacturer_id, serialnumber } = req.body as UpdateEquipment;

    try {

        const result: QueryResult<Equipment> = await updateEquipment(id, { model, manufacturer_id, serialnumber })
        if (!result.rows || result.rows.length === 0) {
            res.status(400).json({ message: "Unable to create records" })
            return;
        }
        res.status(200).json({ message: "Success", result: result.rows });
    }
    catch (err) {
        console.error(`Error occurred while updating manufacturer`, err);
        if (isForeignKeyConstraitError(err)) {
            res.status(404).json({ message: "No manufacturer record found" })
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

async function remove(req: Request, res: Response<EquipmentResponse>, next: NextFunction): Promise<void> {
    try {
        const id: string = req.params.id
        if (!id) {
            res.status(422).json({ message: "Bad Request" })
            return;
        }
        const result: QueryResult<Equipment> = await removeEquipment(id);
        if (!result.rows || result.rows.length === 0) {
            res.status(404).json({ message: `No records found` })
            return;
        }
        res.status(200).json({ message: "Success" });
    }
    catch (err) {
        console.error(`Error occurred while deleting manufacturers`, err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function manufacturer(req: Request, res: Response<EquipmentResponse>, next: NextFunction): Promise<void> {
    try {
        const { id } = req.body as UpdateEquipment

        if (!id) {
            res.status(422).json({ message: "Bad Request Id not provided or invalid" })
            return;
        }

        const result: QueryResult<Manufacturer> = await equipmentManufacturer(id);
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
    manufacturer
};