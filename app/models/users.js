const mongoose = require('mongoose');
var bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;
 
var UserSchema = mongoose.Schema({ 
    name:String, 
    mobile:{ type:Object,default:''},
    otp:String,   
	email:{ type:Object,default:''}, 
    profile: { type:Object,default:'profile/avatar.png'},
}, {
    timestamps: true
});  

UserSchema.pre('save', function(next) {
    var user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
    
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
            });
    });
});  

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('users', UserSchema);