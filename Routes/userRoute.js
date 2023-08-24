const express = require('express');
const { getuservalidator, updateuservalidator, creatuservalidator, deleteuservalidator, changeUserPasswordValidator } = require('../utils/validators/userValidator')

const { getuser, createuser, getusers, upduateuser, deleteuser, changeUserPassword, upduateuserReports, getUserReports, aproveSeller, banUserAcount, unbanUserAcount, seeBanUser, uploadUserPhoto } = require('../controllers/userController');
const { protect } = require('../controllers/authController');
const authController=require('../controllers/authController')
const photoUpload = require('../middlewares/uploadPhoto');



const router = express.Router();

router.put('/changePassword/:id',protect, changeUserPasswordValidator, changeUserPassword)

router.route('/').get(protect,authController.restictTo('admin'),getusers).post(creatuservalidator, createuser);
router.route('/:id')
    .get(protect,getuservalidator, getuser)
    .put(protect,updateuservalidator, upduateuser)
    .delete(protect,deleteuservalidator, deleteuser);
    router.route('/updateuserReport/:id')
    .put(protect,upduateuserReports)

    router.route('/aproveSeller/:id')
    .put(protect,authController.restictTo('admin'),aproveSeller)

    router.route('/ban/:id')
    .put(protect,authController.restictTo('admin'),banUserAcount)
    router.route('/unban/:id')
    .put(protect,authController.restictTo('admin'),unbanUserAcount)

    router.get('/getUSerReports/repo',protect,authController.restictTo('admin'),getUserReports)
    router.get('/all/banUSers',protect,authController.restictTo('admin'),seeBanUser)
    router.route('/uploadImage')
          .post(protect,photoUpload.single("image"), uploadUserPhoto)
module.exports = router;