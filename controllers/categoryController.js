// eslint-disable-next-line import/order
const categorys = require('../models/categoryModel');
const asyncHandler = require("express-async-handler"); 
const path=require('path')
const {cloudinaryRemoveImage,cloudinaryUploadImage}=require('../utils/cloudinary')

const factory = require('./handlerFactory')
    //desc get list of category
    //route get/api/v1/categories
    //public
exports.getCategories = factory.getAll(categorys)

//get single category
//route get/api/v1/category/:id
//public
exports.getCategory = factory.getOne(categorys)

//desc   create category
//route post/api/v1/categories
//private
exports.createCategory = factory.createOne(categorys)


//upduate
//route put/api/v1/categories/:id
//private
exports.upduateCategory = factory.ubdateOne(categorys)

//delete
//route put/api/v1/categories/:id
//private
exports.deletecategory = factory.deleteOne(categorys)



exports.updateCategoryImageCtrl = asyncHandler(async (req, res) => {
    // 1. Validation
    
    if (!req.file) {
      return res.status(400).json({ message: "no image provided" });
    }
  
    // 2. Get the category from DB 
    const category = await categorys.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
  
    // 4. Delete the old image
    if(category.Img.PublicId !==null){
      await cloudinaryRemoveImage(category.Img.PublicId);
    }
    
  
    // 5. Upload new photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);
  // console.log(result)
    // 6. Update the image field in the db
    category.Img={
      url:result.secure_url,
      PublicId:result.public_id,                
  }
  await category.save();
  
  
    // 7. Send response to client
    res.status(200).json({message:"photo uploaded",data:category,})

  
    // 8. Remvoe image from the server
    fs.unlinkSync(imagePath);
  });

  