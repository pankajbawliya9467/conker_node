//services
const responses = require('../../middleware/responses');

//Modal
const User = require('../../models/users');

exports.getUser = async (req, res) => {
        User.find({verify:"true"}).sort({_id:-1}).then(check => {
            if(!check || check.length == 0){
              return responses.sendResponse(res, 'fail','not found.');
            }else{
                      return responses.sendResponseData(res, check,'success',"Successfully log in");
            }
        })
}

