const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')

const path=require("path")
const fs=require('fs')
const apiErorr = require('../utils/apiErorrs')

const factory = require('./handlerFactory')
const {cloudinaryRemoveImage,cloudinaryUploadImage}=require('../utils/cloudinary')
const user = require('../models/UserModel');
const { report } = require("process");



//desc get list of user
//route get/api/v1/user
//private
exports.getusers = factory.getAll(user)





//get single user
//route get/api/v1/user/:id
//private
exports.getuser = factory.getOne(user)






//desc   create user
//route post/api/v1/user
//private
exports.createuser = factory.createOne(user)




//upduate
//route put/api/v1/user/:id
//private
exports.upduateuser = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        slug: req.body.slug,
        phone: req.body.phone,
        email: req.body.email,
        profileImg: req.body.profileImg,
        role: req.body.role,
    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});

exports.upduateuserReports = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        report: req.body.report,
    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});

exports.getUserReports=asyncHandler(async(req,res,next)=>{
    const usersReport=await user.find({})
    const usersArr=[]
usersReport.forEach((e)=>{
    if(e.report!==null){
       usersArr.push(e)
    }
})
    if(!usersReport){
        return next(new apiErorr(`there is no reports`))
    }
    res.status(200).json({data: usersArr})
});


exports.aproveSeller = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        role:"seller",
    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});


exports.banUserAcount = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        ban:true,
    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});


exports.unbanUserAcount = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        ban:false,
    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});


exports.seeBanUser=asyncHandler(async(req,res,next)=>{
    const usersBan=await user.find({})
    const usersArr=[]
    usersBan.forEach((e)=>{
    if(e.ban==true){
       usersArr.push(e)
    }
})
    if(!usersBan){
        return next(new apiErorr(`there is no reports`))
    }
    res.status(200).json({data: usersArr})
});







exports.changeUserPassword = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),

    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});
//del
//route put/api/v1/user/:id
//private
exports.deleteuser = factory.deleteOne(user)



exports.uploadUserPhoto=asyncHandler(async(req,res)=>{
    //validation
    if(!req.file){
      return  res.status(400).json({message:"no photo provided to upload"})
    }


    //2:get the path to the image
    const imagePathe=path.join(__dirname,`../images/${req.file.filename}`);

//3:upload to cloudinary
const result=await cloudinaryUploadImage(imagePathe);
//console.log(result)
//4:get the user from db

const User= await user.findById(req.user.id);

//5:delete the olad profile photo if exist
if(User.Img.PublicId!=null){
    await cloudinaryRemoveImage(User.Img.PublicId);
}
//6:change the profile photo in db
User.Img={
    url:result.secure_url,
    PublicId:result.public_id,                
}
await User.save();


//send res
    res.status(200).json({message:"photo uploaded",
    Img:{ url: result.secure_url, PublicId: result.public_id },
})


//remove image from server
fs.unlinkSync(imagePathe);
})
