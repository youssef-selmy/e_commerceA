const asyncHandler = require("express-async-handler");
const apiErorr = require("../utils/apiErorrs");
const ApiFeatures = require("../utils/apiFeatures");

//const {cloudinaryRemoveImage,cloudinaryUploadImage}=require('../util/cloudinary')

//delete

exports.deleteOne = (Model) => asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const doc=await Model.findById({_id:id})
     //romve profile image frome cloudinary
     if(doc.Img.PublicId!=null){
        await cloudinaryRemoveImage(doc.Img.PublicId);
    }
    const Document = await Model.findByIdAndDelete({ _id: id });
    if (!Document) {
        // eslint-disable-next-line new-cap
        return next(new apiErorr(`cant find this ${Model}: ${id}`, 404));
    }
   
    res.status(204).send();
});
//ubdate

exports.ubdateOne = (Model) => asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});

exports.createOne = (Model) => asyncHandler(async(req, res) => {


    const Document = await Model.create(req.body);

    res.status(200).json({ data: Document });

});


exports.getOne = (Model) => asyncHandler(async(req, res, next) => {
    // eslint-disable-next-line prefer-destructuring, no-undef
    id = req.params.id;
    const Document = await Model.findById(id)
    if (!Document) {
        // eslint-disable-next-line new-cap, no-undef
        return next(new apiErorr(`cant find this Document: ${id}`, 404))
    }
    res.status(200).json({ data: Document })
});



exports.getAll = (Model, modelName ) => asyncHandler(async(req, res) => {
    let filter = {}
    if (req.filterobj) {
        filter = req.filterobj
    }
    const documentCounts = await Model.countDocuments();
    const apifeatures = new ApiFeatures(Model.find(filter), req.query)
        .paginate(documentCounts)
        .sort()
        .filter()
        .limitFiled()
        .search(modelName, req.query);
    //execute qurey
    const { mongossequry, paginationResult } = apifeatures
    const Documents = await mongossequry;

    res.status(200).json({ results: Documents.length, paginationResult, data: Documents });
});