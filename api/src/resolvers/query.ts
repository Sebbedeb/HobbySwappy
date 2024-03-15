import UserModel from '../models/UserModel.js';
import WareModel from '../models/WareModel.js';
import ConversationModel from '../models/ConversationModel.js';
import CategoryModel from '../models/CategoryModel.js';
import MessageModel from '../models/MessageModel.js';

const QueryResolvers = {
  Query: {
    users: async () => {
      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        throw new Error('Failed to fetch users');
      }
    },

    user: async (_parent: never, args: { userId: number }) => {
      try {
        const user = await UserModel.findOne({ userId: args.userId });
        return user;
      } catch (error) {
        throw new Error('Failed to fetch user');
      }
    },

    categories: async () => {
      try {
        const categories = await CategoryModel.find();
        return categories;
      } catch (error) {
        throw new Error('Failed to fetch categories');
      }
    },

    wares: async (_parent: never, args: {categoryId: number}) => {
      try {
        if (args.categoryId) {
          return await WareModel.find({ wareCategory: args.categoryId });
        }
        else {
        return await WareModel.find();
      }
     } catch (error) {
        throw new Error('Failed to fetch wares');
      }
    },

    waresByUserId: async (_parent: never, args: { userId: number }) => {
      try {
        const wares = await WareModel.find({ userId: args.userId });
        return wares;
      } catch (error) {
        throw new Error('Failed to fetch wares');
      }
    },

    ware: async (_parent: never, args: { wareId: number }) => {
      try {
        const ware = await WareModel.findOne({ wareId: args.wareId });
        return ware;
      } catch (error) {
        throw new Error('Failed to fetch ware');
      }
    },

    conversation: async (_parent: never, args: { conversationId: number}) => {
      try {
        const conversation = await ConversationModel.findOne({ conversationId: args.conversationId });
        return conversation;
      } catch (error) {
        throw new Error('Failed to fetch conversation');
      }
    },

    conversations: async (_parent: never, args: { userId: number }) => {
      try {
        const conversations = await ConversationModel.find({ $or: [{ personOneId: args.userId }, { personTwoId: args.userId }] });
        return conversations;
      } catch (error) {
        throw new Error('Failed to fetch conversations');
      }
    },

    messages: async (_parent: never, args: { conversationId: number }) => {
      try {
        const conversation = await ConversationModel.findOne({ conversationId: args.conversationId });
        console.log("Found Convo: "+conversation);
        if (!conversation) {
          throw new Error('Conversation not found');
        }
        const messages = await MessageModel.find({ messageId: { $in: conversation.messages } });
        return messages;
      } catch (error) {
        throw new Error('Failed to fetch messages');
      }
    }
  }
};

export { QueryResolvers };
