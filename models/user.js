const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    avatar: {
        type: String
    },

    friendships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friendship'
    }]
},
{
   timestamps: true 
}
       
);

let storage = multer.diskStorage({
    // cb = call back()
    destination: function (req, file, cb) {
        // __dirname for current path here (/models)
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);  
                // file.fieldname here udheshkanadh avatar field in the schema
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });

  // static
      // .single means single instance/file will be uploaded to the field name avatar
  userSchema.statics.uploadedAvatar =  multer({storage : storage}).single('avatar');
// to make availabe avatar path public
   userSchema.statics.avatarPath = AVATAR_PATH; 
  

const User = mongoose.model('User', userSchema);  

module.exports = User;