import mongoose from './index';

export type User = {
  name: string;
  email: string;
  password: string;
  status: string;
  image: string;
  preferences: string[];
};

// defining data structure
const User = new mongoose.Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, default: '' },
  image: { type: String, default: '' },
  preferences: { type: [String], default: [] },
});

const UserModel = mongoose.model('users', User);
export default UserModel;
