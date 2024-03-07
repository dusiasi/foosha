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
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: String,
  image: String,
  preferences: [String],
});

const UserModel = mongoose.model('users', User);
export default UserModel;
