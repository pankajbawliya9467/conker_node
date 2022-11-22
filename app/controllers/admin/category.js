//services
const responses = require('../../middleware/responses');
const multer = require('multer');
var fs = require('fs');

//Modal
const Category = require('../../models/category');

// Multer
var image;
var upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'images/category/')
      },
      filename: function (req, file, cb) {
        imagename = Date.now() + '.png';
        image=imagename;
        cb(null, imagename)
      } 
    })
})

//-------------------------------  addCategory ---
exports.addCategory = async (req, res) => {
    upload.single('image')(req, res,async function (err) {
        if (!req.file) { 
            return responses.sendResponse(res, "fail", "image can not be empty");
        }
        var imagename = "category/"+image ;
        const {name} = req.body
        const categoryData = await getCategoryData(name,imagename);
        return responses.sendResponse(res, 'success', "Category has been uploaded successfully.");               

    })
} 
//-------------------------------  viewCategory ---
exports.viewCategory = async (req, res) => {
    Category.find().then(async data =>{ 
        if (!data || data.length == 0) {
          return responses.sendResponse(res, "fail", "Sorry, Category not found.");
        }  
        return responses.sendResponseData(res, data, "success", "Category show Successfully.");
    })
}
//-------------------------------  editCategory ---
exports.editCategory = async (req, res) => {
    Category.findOne({_id:req.body.id}).then(async data =>{ 
        if (!data || data.length == 0) {
          return responses.sendResponse(res, "fail", "Sorry, Category not found.");
        }  
        return responses.sendResponseData(res, data, "success", "Category show Successfully.");
    })
}
//-------------------------------  deleteCategory ---
exports.deleteCategory = async (req, res) => {
    const {id,filename} = req.params;
    Category.deleteOne({_id: id}).then(async (check) => {
        if (check.deletedCount == 1) {
            // // remove media
            //     const path=process.env.WORK_PATH+'images/'+filename;      
            //     await fs.unlinkSync(path);
            return responses.sendResponse(res, "success", "Category deleted successfully.");
        } else {
            return responses.sendResponse(res, "fail", "Sorry, Record not found.");
        }
    })
}

//-------------------------------  updateCategory ---

exports.updateCategory = async (req, res) => {
    
    upload.single('image')(req, res,async function (err) {
        var imagename;
        if (typeof (req.file) == "undefined") {
            imagename = req.body.images;
        }else{
            imagename = "category/"+image ;  
        }
        const {name,id} = req.body;
        const checkCategoryRecord=await Category.findOne({_id:id}).exec(); 
        if(checkCategoryRecord){
            const categoryDataUpdate = await CategoryDataUpdate(id,name,imagename);
            // if(typeof (req.file) != "undefined"){
            // // remove media
            //     const path=process.env.WORK_PATH+'images/'+checkCategoryRecord.image;      
            //     await fs.unlinkSync(path);
            // }
            return responses.sendResponse(res, 'success', "Category has been uploaded successfully."); 
        }else{
            return responses.sendResponse(res, "fail", "Sorry, Record not found.");
        }     
    })

}


//Operation
    //Insert Category
    async function getCategoryData(name,image){

        const new_category = new Category({
            name: name,
            image: image,   
        });

        const InsertNew=await new_category.save();
        return InsertNew;
    }

    //Update category
    async function CategoryDataUpdate(id,name,image){
        console.log('Update');
        const updateCategory = Category.findByIdAndUpdate(id, {        
            name: name,
            image: image, 
        }, { new: true });
        return updateCategory;
    }