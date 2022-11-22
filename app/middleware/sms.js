const axios = require('axios');
const responses = require('./responses');


// ---------------------- SMS Service -------
exports.sendSMS =  function sendResponse(res, mobile, OTP) {

    const key=process.env.SMS_KEY
    const URL='https://2factor.in/API/V1/'+key+'/SMS/'+mobile+'/'+OTP+'/Justitiaa+Login+Verification'

    axios.get(URL).then(res => {     
        console.log(res);   
        return true;
    }).catch(error => {
        console.log(error);
        return responses.sendResponse(res, 'fail', error);   
    });

}