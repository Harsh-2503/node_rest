import { body } from 'express-validator'


const postManufacturerValidator = [
    body('name', 'Invalid cannot not Empty').not().isEmpty(),
];

const updateManufacturerValidator = [
    body('name', "Invalid cannot not Empty").not().isEmpty(),
    body('id',).not().isEmpty().isUUID(4)
];

export { postManufacturerValidator, updateManufacturerValidator }