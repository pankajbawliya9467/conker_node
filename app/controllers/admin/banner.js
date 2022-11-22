//services
const responses = require('../../middleware/responses');
const multer = require('multer');
var fs = require('fs');

//Modal
const Banner = require('../../models/banner');

// Multer
var image;
var upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'images/banner/')
      },
      filename: function (req, file, cb) {
        imagename = Date.now() + '.png';
        image=imagename;
        cb(null, imagename)
      } 
    })
})

//-------------------------------  addBanner ---
exports.addBanner = async (req, res) => {
    upload.single('image')(req, res,async function (err) {
        if (!req.file) { 
            return responses.sendResponse(res, "fail", "image can not be empty");
        }
        var imagename = "banner/"+image ;
        const {name} = req.body
        const BannerData = await getBannerData(name,imagename);
        return responses.sendResponse(res, 'success', "Banner has been uploaded successfully.");               

    })
} 
//-------------------------------  viewBanner ---
exports.viewBanner = async (req, res) => {
    Banner.find().then(async data =>{ 
        if (!data || data.length == 0) {
          return responses.sendResponse(res, "fail", "Sorry, Banner not found.");
        }  
        return responses.sendResponseData(res, data, "success", "Banner show Successfully.");
    })
}
//-------------------------------  editBanner ---
exports.editBanner = async (req, res) => {
    Banner.findOne({_id:req.body.id}).then(async data =>{ 
        if (!data || data.length == 0) {
          return responses.sendResponse(res, "fail", "Sorry, Banner not found.");
        }  
        return responses.sendResponseData(res, data, "success", "Banner show Successfully.");
    })
}
//-------------------------------  deleteBanner ---
exports.deleteBanner = async (req, res) => {
    const {id,filename} = req.params;
    Banner.deleteOne({_id: id}).then(async (check) => {
        if (check.deletedCount == 1) {
            // // remove media
            //     const path=process.env.WORK_PATH+'images/'+filename;      
            //     await fs.unlinkSync(path);
            return responses.sendResponse(res, "success", "Banner deleted successfully.");
        } else {
            return responses.sendResponse(res, "fail", "Sorry, Record not found.");
        }
    })
}

//-------------------------------  updateBanner ---

exports.updateBanner = async (req, res) => {
    
    upload.single('image')(req, res,async function (err) {
        var imagename;
        if (typeof (req.file) == "undefined") {
            imagename = req.body.images;
        }else{
            imagename = "Banner/"+image ;  
        }
        const {name,id} = req.body;
        const checkBannerRecord=await Banner.findOne({_id:id}).exec(); 
        if(checkBannerRecord){
            const BannerDataUpdate = await Banner.findByIdAndUpdate(id, {        
                name: name,
                image: imagename, 
            }, { new: true });
            // if(typeof (req.file) != "undefined"){
            // // remove media
            //     const path=process.env.WORK_PATH+'images/'+checkBannerRecord.image;      
            //     await fs.unlinkSync(path);
            // }
            return responses.sendResponse(res, 'success', "Banner has been uploaded successfully."); 
        }else{
            return responses.sendResponse(res, "fail", "Sorry, Record not found.");
        }     
    })

}


//Operation
    //Insert Banner
    async function getBannerData(name,image){

        const new_Banner = new Banner({
            name: name,
            image: image,   
        });

        const InsertNew=await new_Banner.save();
        return InsertNew;
    }

    //Update Banner
    async function BannerDataUpdate(id,name,image){
        console.log('Update');
        const updateBanner = Banner.findByIdAndUpdate(id, {        
            name: name,
            image: image, 
        }, { new: true });
        return updateBanner;
    }