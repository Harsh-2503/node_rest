import { body } from 'express-validator'


const postEquipmentValidator = [
    body('model', 'Invalid cannot not Empty').not().isEmpty(),
    body('manufacturer_id').not().isEmpty().isUUID(4),
    body('serialnumber', 'Invalid cannot not Empty').not().isEmpty(),
];

const updateEquipmentValidator = [
    body('id').not().isEmpty().isUUID(4),
    body('manufacturer_id').optional().isUUID(4),
    body('serialnumber').optional().isString().isLength({ min: 1 }).withMessage('Model must be at least 1 character long when present'),
    body('model',).optional().isString().isLength({ min: 1 }).withMessage('Model must be at least 1 character long when present'),
];

export { postEquipmentValidator, updateEquipmentValidator }