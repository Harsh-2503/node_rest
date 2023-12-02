import { QueryResult } from "pg";
import { Manufacturer, CreateManufacturer } from "../interfaces/manufacturer.interface";
import { Request } from "express";

export type GetManufacturersResult = QueryResult & { rows: Manufacturer[] };
export type PostManufactureRequest<T = CreateManufacturer> = Request & { body: T };