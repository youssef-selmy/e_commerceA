const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middlewares/validatorMiddleware')



exports.getCategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];
exports.creatCategoryvalidator = [
    check('name').notEmpty().withMessage('category required')
    .isLength({ min: 3 }).withMessage('too short category name')
    .isLength({ max: 32 }).withMessage('too long category name')
    .custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),
    validatorMiddleware
];
exports.updatecategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    body('name').custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),
    validatorMiddleware,
];
exports.deletecategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];