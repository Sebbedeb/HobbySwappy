import { categories, hello } from "../routes/data.js";
import { users, wares, messages, conversations } from "../routes/data.js";
import {
  User,
  Ware,
  Category,
  Message,
  Conversation,
} from "../routes/types.js";

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
      const senderExists = users.some(
        (user) => user.userId === args.messageSenderId
      );
      const receiverExists = users.some(
        (user) => user.userId === args.messageReceiverId
      );

      if (!senderExists || !receiverExists) {
        throw new Error("User not found");
      }

      if (args.messageSenderId === args.messageReceiverId) {
        throw new Error("Sender and receiver cannot be the same");
      }

      const newMessage: Message = {
        messageId: messages.length + 1,
        messageText: args.messageText,
        messageDate: new Date(),
        senderId: args.messageSenderId,
        receiverId: args.messageReceiverId,
      };

      messages.push(newMessage);

      const conversation = conversations.find(
        (conversation) =>
          (conversation.personOneId === args.messageSenderId &&
            conversation.personTwoId === args.messageReceiverId) ||
          (conversation.personOneId === args.messageReceiverId &&
            conversation.personTwoId === args.messageSenderId)
      );

      conversation
        ? conversation.messages.push(newMessage)
        : conversations.push({
            conversationId: conversations.length + 1,
            personOneId: args.messageSenderId,
            personTwoId: args.messageReceiverId,
            messages: [newMessage],
          });
    },
    editUser: (
      _parent: never,
      args: {
        userId: number;
        userName?: string;
        userAdress?: string;
        userZip?: number;
      },
      _context: never,
      _info: never
    ) => {
      const user = users.find((user) => user.userId === args.userId);
      
      if (!user) {
        throw new Error("User not found");
      }
      if (args.userName) {
        user.userName = args.userName;
      }
      if (args.userAdress) {
        user.userAdress = args.userAdress;
      }
      if (args.userZip) {
        user.userZip = args.userZip;
      }
      return user;
  },
  },
};

export { MutationResolvers };
