import { User } from "@/model/User";
import bcypt from "bcryptjs";
const authService = {
  loginUser: async (email: string, password: string) => {
    return true;
  },
  findUserByEmail: async (email: string) => {
    if (!email) {
      throw new Error("Email is required");
    }
    return await User.findOne({ email: email });
  },
  validateUser: async (user: { email: string; password: string }, plainPassword: string) => {
    if (!user || !plainPassword) {
      throw new Error("User and password are required for validation");
    }
    return user.password === plainPassword;
  },
  // registerUser: async (userData) => {},
};
export default authService;
