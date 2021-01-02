var mongoose=require("mongoose");
var passportlocalmongoose=require("passport-local-mongoose");

let rolesValidos = {
  values: ["ADMIN", "USER"],
  message: '{VALUE} rol invalid'
}

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username needed']
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  registerAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: 'USER',
    required: [true],
    enum: rolesValidos
  }
})

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
}

UserSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", UserSchema);