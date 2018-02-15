const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const { Roles } = require("../../enums")

const UserSchema = new mongoose.Schema({
  username : { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password : { type: String, required: true },
  role     : { type: Number, default: Roles["user"] },
}, { timestamps: true })

/**
 *  Hash password before save to db
 */

UserSchema.pre("save", function save(next) {
  const user = this
  if (!user.isModified("password")) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
        user.password = hash
        next()
    })
  })
})

/**
 * Helper method for validating user's password
 */
UserSchema.methods.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    callback(err, isMatch)
  })
}

module.exports = mongoose.model("users", UserSchema)
