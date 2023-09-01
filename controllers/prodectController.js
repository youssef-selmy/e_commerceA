const asyncHandler = require("express-async-handler"); 
const path=require('path')
 // eslint-disable-next-line import/order
const Product = require("../models/prodectModel");
const factory = require("./handlerFactory");
const {cloudinaryRemoveImage,cloudinaryUploadImage}=require('../utils/cloudinary')



//desc get list of product
//route get/api/v1/product
//public
exports.getProducts = factory.getAll(Product, "Products")

//get single product
//route get/api/v1/product/:id
//public
exports.getProduct = factory.getOne(Product)

//desc   create product
//route post/api/v1/product
//private
exports.createProduct = factory.createOne(Product)

//upduate
//route put/api/v1/product/:id
//private
exports.upduateProduct = factory.ubdateOne(Product)

//delete
//route put/api/v1/product/:id
//private
exports.deleteProduct = factory.deleteOne(Product);


exports.upduateProductReports = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await Product.findByIdAndUpdate(req.params.id, {
        report: req.body.report,
    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});

exports.updateProductImageCtrl = asyncHandler(async (req, res) => {
    // 1. Validation
    
    if (!req.file) {
      return res.status(400).json({ message: "no image provided" });
    }
  
    // 2. Get the product from DB and check if post exist
    const pord = await Product.findById(req.params.id);
    if (!pord) {
      return res.status(404).json({ message: "product not found" });
    }

    // 3. Check if this product belong to logged in user
    const cruntProducts=req.user.products;
    let productId=""
   cruntProducts.forEach(element => {
    if(element==req.params.id){
       productId=element;
    }
    
   });
  //  console.log(productId.toString())
    
    if (req.params.id !== productId.toString()) {
      return res
        .status(403)
        .json({ message: "access denied, you are not allowed" });
    }
  
    // 4. Delete the old image
    // await cloudinaryRemoveImage(pord.img.PublicId);
  
    // 5. Upload new photo
    const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
    const result = await cloudinaryUploadImage(imagePath);
  // console.log(result)
    // 6. Update the image field in the db
    pord.Img={
      url:result.secure_url,
      PublicId:result.public_id,                
  }
  await pord.save();
  
  
    // 7. Send response to client
    res.status(200).json({message:"photo uploaded",data:pord,})

  
    // 8. Remvoe image from the server
    fs.unlinkSync(imagePath);
  });
