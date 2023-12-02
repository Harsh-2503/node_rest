import express, { Router, Request, Response, NextFunction } from "express";
import { get, create, update, remove, manufacturer } from "../controllers/equipment.route";
const router: Router = express.Router();
import { postEquipmentValidator, updateEquipmentValidator } from "../utils/validators/equipment.validator";


router.get("/manufacturer", manufacturer)
router.get("/", get);
router.post("/", postEquipmentValidator, create)
router.put("/", updateEquipmentValidator, update)
router.get("/:id", get);
router.delete("/:id", remove)


export default router;
