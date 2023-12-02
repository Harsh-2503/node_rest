import express, { Router, Request, Response, NextFunction } from "express";
import { get, create, update, remove, equipment } from "../controllers/manufacturer.route";
const router: Router = express.Router();
import { postManufacturerValidator, updateManufacturerValidator } from "../utils/validators/manufacturer.validator";

router.get("/equipment", equipment)
router.get("/", get);
router.post("/", postManufacturerValidator, create)
router.put("/", updateManufacturerValidator, update)
router.get("/:id", get);
router.delete("/:id", remove)

export default router;




