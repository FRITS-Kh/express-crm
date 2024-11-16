import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export const hashPassword = (password, salt) =>
  crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

export const hashPasswordWithSalt = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(password, salt);

  return { salt, hash };
};

UserSchema.methods.comparePassword = function (password) {
  const hashedPassword = hashPassword(password, this.salt);

  return this.hashPassword === hashedPassword;
};

export const User = mongoose.model('User', UserSchema);
