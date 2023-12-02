import pool from "./db.service";
import { GetManufacturersResult } from "../utils/types/manufacturer.type";
import { GetEquipmentsResult } from "../utils/types/equipment.type";
import { getOffset, validatePageParam } from "../utils/helpers/pagination.helper";
import config from "../configs/general.config";

async function getManufacturers(id?: string, page?: unknown): Promise<GetManufacturersResult> {

  const currentPage = validatePageParam(page)
  const offset = getOffset(currentPage);

  if (id) {
    return await pool.query("SELECT * from manufacturer WHERE id = $1LIMIT $2 OFFSET $3", [id, config.listPerPage, offset])
  }
  return await pool.query("SELECT * from manufacturer LIMIT $1 OFFSET $2", [config.listPerPage, offset]);
}


async function createManufacturer(name: string): Promise<GetManufacturersResult> {
  const result = pool.query(`INSERT into manufacturer (name) values ($1) RETURNING id , name`, [name])
  return result;
}


async function updateManufacturer(id: string, name: string | Number): Promise<GetManufacturersResult> {
  const result = pool.query(`UPDATE manufacturer SET name = $1 WHERE id = $2 RETURNING id, name
  `, [name, id])
  return result
}


async function removeManufacturer(id: string): Promise<GetManufacturersResult> {
  const result = pool.query('DELETE from manufacturer WHERE id = $1 RETURNING id', [id])
  return result
}


async function manufacturerEquipment(manufacturer_id: string, page?: unknown): Promise<GetEquipmentsResult> {
  const currentPage = validatePageParam(page)
  const offset = getOffset(currentPage);

  const result = pool.query('SELECT * from equipment WHERE manufacturer_id = $1 LIMIT $2 OFFSET $3', [manufacturer_id, config.listPerPage, offset])
  return result

}


export { getManufacturers, createManufacturer, updateManufacturer, removeManufacturer, manufacturerEquipment };
