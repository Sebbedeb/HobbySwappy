import UserModel from '../models/UserModel.js';
import WareModel from '../models/WareModel.js';
import MessageModel from '../models/MessageModel.js';
import ConversationModel from '../models/ConversationModel.js';
import CategoryModel from '../models/CategoryModel.js';
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { conversations } from '../routes/data.js';

const MutationResolvers = {
  
  Mutation: {

    createCategory: async (_parent: never, args: { categoryName: string; categoryDescription: string }) => {
      try {
        const newCategory = new CategoryModel({
          categoryName: args.categoryName,
          categoryDescription: args.categoryDescription,
        });
        await newCategory.save();
        return newCategory;
      } catch (error) {
        console.error('Error creating category:', error);
        throw new Error('Failed to create category');
      }
    },
    


    createUser: async (_parent: never, args: { userName: string; userPassword: string; userAddress: string; userZip: number }) => {
      try {
        const newUser = new UserModel({
          userName: args.userName,
          userPassword: args.userPassword,
          userAddress: args.userAddress,
          userZip: args.userZip,
        });

        if( await UserModel.findOne({userName: args.userName})){
          throw new Error('User already exists');
        }
  
        await newUser.save();
        return newUser;
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },

    login: async (_parent: never, args: { userName: string; userPassword: string }) => {
      try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const userName = args.userName;
        const userPassword = args.userPassword;

        const user = await UserModel.findOne({ userName });

        if (!user) {
          throw new Error('User not found');
        }
  
        const validPassword: boolean = userPassword === user.userPassword
        
        if (!validPassword) {
          throw new Error('Invalid password');
        }
        
  

        const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });

        console.log("token", token);
  
        return { token, userId: user.userId};
      } catch (error) {
        throw new Error("Failed to login");
      }
    },


    

    createWare: async (_parent: never, args: { wareTitle: string; wareDescription: string; warePrice: number; wareCategory: string; userId: number, imgName?: string }) => {
      try {
        const category = await CategoryModel.findOne({ categoryId: args.wareCategory });
        console.log("category: "+category);
        if (!category) {
          throw new Error('Category not found');
        }

        const user = await UserModel.findOne({ userId: args.userId });
        console.log("user: "+user);
        if (!user) {
          throw new Error('User not found');
        }

        const newWare = new WareModel({
          wareTitle: args.wareTitle,
          wareDescription: args.wareDescription,
          warePrice: args.warePrice,
          wareCategory: category.categoryId, 
          userId: user.userId, 
          imgName: args.imgName
        });


        console.log("Attempting to save "+newWare)
        await newWare.save();
        console.log("newWare saved: "+newWare);
        return newWare;
      } catch (error) {
        console.error('Error creating ware:', error);
        throw new Error('Failed to create ware');
      }
    },

    sendMessage: async (_parent: never, args: { messageText: string; messageSenderId: number; messageReceiverId: number }) => {
      try {
        const sender = await UserModel.findOne({ userId: args.messageSenderId });
        const receiver = await UserModel.findOne({ userId: args.messageReceiverId });
        if (!sender || !receiver) {
          console.error('Sender or receiver not found');
        }

        const newMessage = new MessageModel({
          messageText: args.messageText,
          senderId: args.messageSenderId,
          receiverId: args.messageReceiverId,
        });
        
        console.log("attempting to save ", newMessage);
        await newMessage.save();
        console.log("new Message saved: "+newMessage);


        let conversation = await ConversationModel.findOne({
          $or: [
            { personOneId: args.messageSenderId, personTwoId: args.messageReceiverId },
            { personOneId: args.messageReceiverId, personTwoId: args.messageSenderId }
          ]
        });
        

        if (!conversation) {
          conversation = new ConversationModel({
            personOneId: args.messageSenderId,
            personTwoId: args.messageReceiverId,
            messages: [newMessage.messageId],
          });
        } else {
          console.log("Found conversation: "+conversation);
          conversation.messages.push(newMessage.messageId);
          console.log("conversation after push: "+conversation);
        }

        console.log("attempting to save conversation: "+conversation);
        await conversation.save();
        console.log("conversation saved: "+conversation);

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
