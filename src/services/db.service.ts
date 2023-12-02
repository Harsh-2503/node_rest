import { Pool } from "pg";
import db from "../configs/db.config";

const pool = new Pool(db);

export default pool;
