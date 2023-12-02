
import { GetEquipmentsResult } from "../types/equipment.type";
import { ValidationError } from "express-validator";

interface Equipment {
    id?: string | undefined;
    model?: string;
    manufacturer_id?: string;
    serialnumber?: string;
}

interface CreateEquipment extends Equipment {
    model: string;
    manufacturer_id: string;
    serialnumber: string;
}

interface UpdateEquipment extends Equipment {
    id: string;
}

interface EquipmentResponse {
    message: string;
    result?: GetEquipmentsResult['rows'];
    error?: ValidationError[]
}


export { Equipment, EquipmentResponse, CreateEquipment, UpdateEquipment }