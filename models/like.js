const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    //   this define object id of the liked object(post id or comment id)
    likeable: {
      type: mongoose.Schema.ObjectId,
      required: true,
      // to tell it is a dynamic reference
      refPath: "onModel",
    },

    // this field is used for defining the type of object since this is a dynamic reference
    onModel: {
      type: String,
      required: true,
    //   enum feild illum koipulla it will run , but to restrict to either post or comment we use enum
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);


const Like= mongoose.model('Like', likeSchema);
module.exports = Like;