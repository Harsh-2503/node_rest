import { GetManufacturersResult } from "../types/manufacturer.type";
import { ValidationError } from "express-validator";

interface Manufacturer {
    id: string;
    name?: string;
}

interface CreateManufacturer extends Manufacturer {
    name: string
}

interface UpdateManufacturer extends Manufacturer {
    name: string;
}


interface ManufacturerResponse {
    message: string;
    result?: GetManufacturersResult['rows'];
    error?: ValidationError[]
}


export { Manufacturer, ManufacturerResponse, CreateManufacturer, UpdateManufacturer }