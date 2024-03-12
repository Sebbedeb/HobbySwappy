import UserModel from '../models/UserModel.js';
import WareModel from '../models/WareModel.js';
import MessageModel from '../models/MessageModel.js';
import ConversationModel from '../models/ConversationModel.js';
import CategoryModel from '../models/CategoryModel.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Access the JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET as string;

// Use the environment variables in your application code
console.log('JWT_SECRET:', JWT_SECRET);

const MutationResolvers = {
  
  Mutation: {

    createCategory: async (_parent: never, args: { categoryName: string; categoryDescription: string }) => {
      try {
        const newCategory = new CategoryModel({
          //categoryName: args.categoryName,
          //categoryDescription: args.categoryDescription,

          categoryName: "testName",
          categoryDescription: "testDescription"
        });
        await newCategory.save();
        return newCategory;
      } catch (error) {
        throw new Error('Failed to create category');
      }
    },


    createUser: async (_parent: never, args: { userName: string; userPassword: string; userAddress: string; userZip: number }) => {
      try {
        const newUser = new UserModel({
          userId: 0,
          userName: args.userName,
          userPassword: args.userPassword,
          userAddress: args.userAddress,
          userZip: args.userZip,
        });
        console.log("attempting to save", newUser);
  
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error('Failed to create user');
      }
    },

    login: async (_parent: never, args: { userName: string; userPassword: string }) => {
      try {
        const userName = args.userName;
        const userPassword = args.userPassword;
        console.log("userName", userName);
        console.log("userPassword", userPassword);
        const user = await UserModel.findOne({ userName });
        console.log("user", user);

        if (!user) {
          throw new Error('User not found');
        }

        /*
  
        const validPassword = await compare(userPassword, user.userPassword);
        
        if (!validPassword) {
          throw new Error('Invalid password');
        }
        */
  

        const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });

        console.log("token", token);
  
        return { token };
      } catch (error) {
        throw new Error("Failed to login");
      }
    },


    

    createWare: async (_parent: never, args: { wareTitle: string; wareDescription: string; warePrice: number; wareCategory: string; userId: number }) => {
      try {
        const category = await CategoryModel.findOne({ categoryName: args.wareCategory });
        if (!category) {
          throw new Error('Category not found');
        }

        const user = await UserModel.findOne({ userId: args.userId });
        if (!user) {
          throw new Error('User not found');
        }

        const newWare = new WareModel({
          wareTitle: args.wareTitle,
          wareDescription: args.wareDescription,
          warePrice: args.warePrice,
          wareCategory: category._id, // Assuming category has _id field
          user: user._id, // Assuming user has _id field
        });
        await newWare.save();
        return newWare;
      } catch (error) {
        throw new Error('Failed to create ware');
      }
    },

    sendMessage: async (_parent: never, args: { messageText: string; messageSenderId: number; messageReceiverId: number }) => {
      try {
        const sender = await UserModel.findOne({ userId: args.messageSenderId });
        const receiver = await UserModel.findOne({ userId: args.messageReceiverId });
        if (!sender || !receiver) {
          throw new Error('Sender or receiver not found');
        }

        const newMessage = new MessageModel({
          messageText: args.messageText,
          messageDate: new Date(),
          sender: sender._id, // Assuming sender has _id field
          receiver: receiver._id, // Assuming receiver has _id field
        });
        await newMessage.save();

        // Handle conversation logic here if needed

        return newMessage;
      } catch (error) {
        throw new Error('Failed to send message');
      }
    },

    editUser: async (_parent: never, args: { userId: number; userName?: string; userAddress?: string; userZip?: number }) => {
      try {
        const user = await UserModel.findOne({ userId: args.userId });
        if (!user) {
          throw new Error('User not found');
        }

        if (args.userName) {
          user.userName = args.userName;
        }
        if (args.userAddress) {
          user.userAddress = args.userAddress;
        }
        if (args.userZip) {
          user.userZip = args.userZip;
        }

        await user.save();
        return user;
      } catch (error) {
        throw new Error('Failed to edit user');
      }
    },
  },
};

export { MutationResolvers };
