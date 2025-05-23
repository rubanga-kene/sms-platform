import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: { type: String, unique: true },
  password: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
