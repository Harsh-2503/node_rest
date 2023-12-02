import pool from "./db.service";
import { GetEquipmentsResult } from "../utils/types/equipment.type";
import { Equipment } from "../utils/interfaces/equipment.interface";
import { getOffset, validatePageParam } from "../utils/helpers/pagination.helper";
import config from "../configs/general.config";

async function getEquipments(id?: string, page?: unknown): Promise<GetEquipmentsResult> {

    const currentPage = validatePageParam(page)
    const offset = getOffset(currentPage);

    if (id) {
        return await pool.query("SELECT * from equipment WHERE id = $1 LIMIT $2 OFFSET $3", [id, config.listPerPage, offset])
    }
    return await pool.query("SELECT * from equipment LIMIT $1 OFFSET $2", [config.listPerPage, offset]);
}

async function createEquipment(model: string | Number, manufacturer_id: string, serialnumber: string | Number): Promise<GetEquipmentsResult> {
    const result = pool.query(`INSERT into equipment (model, manufacturer_id, serialnumber) values ($1, $2, $3)  RETURNING id ,model,manufacturer_id, serialnumber`, [model, manufacturer_id, serialnumber])
    return result;
}

async function updateEquipment(id: string,
    options: Equipment): Promise<GetEquipmentsResult> {
    const values: any[] = [];
    let setClause = '';
    let index = 1
    Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
            setClause += `${key} = $${index}, `;
            values.push(value);
            index = index + 1
        }
    });

    if (setClause.length > 0) {
        setClause = setClause.slice(0, -2);
    }
    const result = pool.query(`UPDATE equipment SET ${setClause} WHERE id = $${values.length + 1} RETURNING id ,model,manufacturer_id, serialnumber`, [...values, id])
    return result
}

async function removeEquipment(id: string): Promise<GetEquipmentsResult> {
    const result = pool.query('DELETE from equipment WHERE id = $1 RETURNING id', [id])
    return result
}


async function equipmentManufacturer(id: string, page?: unknown): Promise<GetEquipmentsResult> {

    const result = pool.query(`SELECT manufacturer.* FROM manufacturer
    JOIN equipment ON equipment.manufacturer_id = manufacturer.id
    WHERE equipment.id = $1`, [id])
    return result

}

export { getEquipments, createEquipment, updateEquipment, removeEquipment, equipmentManufacturer };
