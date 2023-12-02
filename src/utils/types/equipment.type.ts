import { QueryResult } from "pg";
import { Equipment, CreateEquipment } from "../interfaces/equipment.interface";
import { Request } from "express";

export type GetEquipmentsResult = QueryResult & { rows: Equipment[] };

export type PostEquipmentRequest<T = CreateEquipment> = Request & { body: T };