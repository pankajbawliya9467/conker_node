//services
const responses = require('../../middleware/responses');
const userDetailAuth = require('../../middleware/userDetailAuth');

const jwt = require('jsonwebtoken');
const config = require('../../config');
const express = require('express');
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
var bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;

const SMS = require('../../middleware/sms');

//Modal
const User = require('../../models/users.js');


//-------------------------------  SIGNUP ---
exports.signup = async (req, res) => {
    const {mobile } = req.body
    if(mobile){

        User.findOne({mobile: mobile}).then(async check =>{ 

            if(!check || check.length == 0){     
                //add new user
                    const userData = await getUserData(req);
                        // Send SMS
                        // await SMS.sendSMS(res,mobile,userData.otp);
                    return responses.sendResponse(res, 'success', "SMS has been sent, Please verify your account.");               
            }else{
                //Update user for OTP
                    const UpdateOtp =await updateOtp(check._id,req);
                    // Send SMS
                        //  await SMS.sendSMS(res,mobile,UpdateOtp.otp);
                    return responses.sendResponse(res, 'success', "SMS has been sent, Please verify your account.");
            }

        });

    }else{
        return responses.sendResponse(res, 'fail', "Please enter valid mobile number");
    }
}

//-------------------------------  VERIFIED USER ---
exports.verify = async (req, res) => {
    const { mobile, otp } = req.body
    User.findOne({mobile:mobile}).then(async check =>{

        if(!check || check.length ==0)
        {
          return responses.sendResponse(res, 'fail','Sorry,mobile address you entered were invalid.');
        }else{
            //OTP check
                        // const verifyUser=await User.findByIdAndUpdate(check._id,{verify: 'true'}, {new: true});
                        // let token = generateJwtToken(check);
                        // return responses.sendSuccessfullyTokenResponse(res, verifyUser, token, 'success', "Thank you for verifying your mobile number.");
                if(check.otp != otp)
                {
                    return responses.sendResponse(res, 'fail','Sorry, Invalid otp please enter a valid otp.');
                }else{
                    //verify user
                        const verifyUser=await User.findByIdAndUpdate(check._id,{verify: 'true'}, {new: true});
                        // let token = generateJwtToken(check);
                        const token = jwt.sign({user_id:check._id},config.secret, { expiresIn: config.tokenLifetime});
                        return responses.sendSuccessfullyTokenResponse(res, verifyUser, token, 'success', "Thank you for verifying your mobile number.");
                }
        }

    });
}

//-------------------------------  Update User ---

exports.updateUser = async (req, res) => {

    const userDetail=await userDetailAuth(req,res);
   
    User.findOne({_id:userDetail._id}).then(async check =>{
        if(!check || check.length ==0){
            return responses.sendResponse(res, 'fail','Sorry,User not found.');
        }else{

            const UpdateADR =await updateADR(check._id,req);         
            let token = generateJwtToken(UpdateADR);
            return responses.sendSuccessfullyTokenResponse(res, UpdateADR, token, 'success', "Thank you submitting information.");
        }
    });

}

exports.addPlayerId = async (req, res) => {
    const userDetail=await userDetailAuth(req,res);
    User.findOne({_id:userDetail._id}).then(async check =>{
        if(!check || check.length ==0){
            return responses.sendResponse(res, 'fail','Sorry,User not found.');
        }else{
            await User.findByIdAndUpdate(check._id, {        
                player_id:req.body.player_id, 
            }, { new: true });        
            return responses.sendResponse(res,'success', "Successfully added PlayerId.");
        }
    });
}

exports.userInfo = async (req, res) => {

    const userDetail=await userDetailAuth(req,res);
   
    User.findOne({_id:userDetail._id},{_id:1,steps:1,mobile:1,email:1,role:1,litigant_party:1,litigant_advocate:1,neutral:1,advocate_status:1,neutral_status:1}).then(async check =>{
        if(!check || check.length ==0){
            return responses.sendResponse(res, 'fail','Sorry,User not found.');
        }else{
            return responses.sendResponse(res,check, 'success', "Thank you submitting information.");
        }
    });

}







//Get Otp 4 digit
function getOtp(){
//   var otp=Math.floor(1111 + Math.random() * 9999);
//   otp = String(otp);
//   otp = otp.substring(0,4);
var otp = "1234";
  return otp;
}

//JWT Token
function generateJwtToken(id) {
    return jwt.sign({ user: id }, config.secret, { expiresIn: 345600 }); // expires in 4 days
}


//Insert user
async function getUserData(req){
    let request=req.body;  
    const otp=getOtp();

    const new_user = new User({
      mobile: request.mobile,      
      otp:otp    
    });

    const InsertNew=await new_user.save();
    return InsertNew;
}

//Update mobile Numbers
async function updateOtp(id,req){
    const otp=getOtp();
    const update_user = User.findByIdAndUpdate(id, {        
        otp:otp
    }, { new: true });

    return update_user;
}

//Update ADR registration 
async function updateADR(id,req){
    let request=req.body;  
    const update_user = User.findByIdAndUpdate(id, {        
        f_name:request.f_name, 
        m_name:request.m_name, 
        l_name:request.l_name,
        email:request.email,
        state:request.state,
        city:request.city,
        steps:1
    }, { new: true });
    return update_user;
}

