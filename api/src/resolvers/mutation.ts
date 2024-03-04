import { categories, hello } from "../routes/data.js";
import { users, wares, messages } from "../routes/data.js";
import { User, Ware, Category, Message } from "../routes/types.js";

const MutationResolvers = {
  Mutation: {
    createUser: (
      _parent: never,
      args: {
        userName: string;
        userPassword: string;
        userAdress: string;
        userZip: number;
      },
      _context: never,
      _info: never
    ) => {
      console.log(args);
      const newUser: User = {
        userId: users.length + 1,
        userName: args.userName,
        userPassword: args.userPassword,
        userAdress: args.userAdress,
        userZip: args.userZip,
      };
      users.push(newUser);
      return newUser;
    },

    createWare: (
      _parent: never,
      args: {
        wareTitle: string;
        wareDescription: string;
        warePrice: number;
        wareCategory: string;
        userId: number;
      },
      _context: never,
      _info: never
    ) => {
      if (
        !categories.find(
          (category) => category.categoryName === args.wareCategory
        )
      ) {
        throw new Error("Category not found");
      }
      if (!users.find((user) => user.userId === args.userId)) {
        throw new Error("User not found");
      }

      const newWare: Ware = {
        wareId: wares.length + 1,
        wareTitle: args.wareTitle,
        wareDescription: args.wareDescription,
        warePrice: args.warePrice,
        wareCategory: categories.find(
          (category) => category.categoryName === args.wareCategory
        ) as Category,
        User: users.find((user) => user.userId === args.userId),
      };
      wares.push(newWare);
      return newWare;
    },

    sendMessage: (
      _parent: never,
      args: {
        messageText: string;
        messageSenderId: number;
        messageReceiverId: number;
      },
      _context: never,
      _info: never
    ) => {
      if (
        !users.find((user) => user.userId === args.messageSenderId) ||
        !users.find((user) => user.userId === args.messageReceiverId)
      ) {
        throw new Error("User not found");
      }
      const newMessage: Message = {
        messageId: messages.length + 1,
        messageText: args.messageText,
        messageDate: new Date(),
        messageSender: users.find(
          (user) => user.userId === args.messageSenderId
        )!.userName,
        messageReceiver: users.find(
          (user) => user.userId === args.messageReceiverId
        )!.userName,
      };
      messages.push(newMessage);
      return newMessage;
    },
  },
};

export { MutationResolvers };
