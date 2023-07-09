import { Document, Schema, Model, model } from 'mongoose';


export class UserClassModel {
   username : string
   password : string
   email : string
}



const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: true,
  versionKey: false,
});


export const UserModel = model('User', UserSchema);
