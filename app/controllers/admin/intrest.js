//services
const responses = require('../../middleware/responses');
const multer = require('multer');
var fs = require('fs');

//Modal
const Intrest = require('../../models/intrest');

// Multer
var image;
var upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'images/Intrest/')
      },
      filename: function (req, file, cb) {
        imagename = Date.now() + '.png';
        image=imagename;
        cb(null, imagename)
      } 
    })
})

//-------------------------------  addIntrest ---
exports.addIntrest = async (req, res) => {
    upload.single('image')(req, res,async function (err) {
        if (!req.file) { 
            return responses.sendResponse(res, "fail", "image can not be empty");
        }
        var imagename = "Intrest/"+image ;
        const {name} = req.body
        const IntrestData = await getIntrestData(name,imagename);
        return responses.sendResponse(res, 'success', "Intrest has been uploaded successfully.");               

    })
} 
//-------------------------------  viewIntrest ---
exports.viewIntrest = async (req, res) => {
    Intrest.find().then(async data =>{ 
        if (!data || data.length == 0) {
          return responses.sendResponse(res, "fail", "Sorry, Intrest not found.");
        }  
        return responses.sendResponseData(res, data, "success", "Intrest show Successfully.");
    })
}
//-------------------------------  editIntrest ---
exports.editIntrest = async (req, res) => {
    Intrest.findOne({_id:req.body.id}).then(async data =>{ 
        if (!data || data.length == 0) {
          return responses.sendResponse(res, "fail", "Sorry, Intrest not found.");
        }  
        return responses.sendResponseData(res, data, "success", "Intrest show Successfully.");
    })
}
//-------------------------------  deleteIntrest ---
exports.deleteIntrest = async (req, res) => {
    const {id,filename} = req.params;
    Intrest.deleteOne({_id: id}).then(async (check) => {
        if (check.deletedCount == 1) {
            // // remove media
            //     const path=process.env.WORK_PATH+'images/'+filename;      
            //     await fs.unlinkSync(path);
            return responses.sendResponse(res, "success", "Intrest deleted successfully.");
        } else {
            return responses.sendResponse(res, "fail", "Sorry, Record not found.");
        }
    })
}

//-------------------------------  updateIntrest ---

exports.updateIntrest = async (req, res) => {
    
    upload.single('image')(req, res,async function (err) {
        var imagename;
        if (typeof (req.file) == "undefined") {
            imagename = req.body.images;
        }else{
            imagename = "Intrest/"+image ;  
        }
        const {name,id} = req.body;
        const checkIntrestRecord=await Intrest.findOne({_id:id}).exec(); 
        if(checkIntrestRecord){
            const IntrestDataUpdate = await Intrest.findByIdAndUpdate(id, {        
                name: name,
                image: imagename, 
            }, { new: true });
            // if(typeof (req.file) != "undefined"){
            // // remove media
            //     const path=process.env.WORK_PATH+'images/'+checkIntrestRecord.image;      
            //     await fs.unlinkSync(path);
            // }
            return responses.sendResponse(res, 'success', "Intrest has been uploaded successfully."); 
        }else{
            return responses.sendResponse(res, "fail", "Sorry, Record not found.");
        }     
    })

}


//Operation
    //Insert Intrest
    async function getIntrestData(name,image){

        const new_Intrest = new Intrest({
            name: name,
            image: image,   
        });

        const InsertNew=await new_Intrest.save();
        return InsertNew;
    }

    //Update Intrest
    async function IntrestDataUpdate(id,name,image){
        console.log('Update');
        const updateIntrest = Intrest.findByIdAndUpdate(id, {        
            name: name,
            image: image, 
        }, { new: true });
        return updateIntrest;
    }