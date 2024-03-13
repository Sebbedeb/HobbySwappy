type Ware = {
    wareId: number;
    wareTitle: string;
    wareDescription: string;
    warePrice: number;
    wareCategory: Category;
    User?: number;
}

type User = {
    userId: number;
    userName: string;
    userPassword: string;
    userAddress: string;
    userZip: number
    wares?: number[];
}

type Message = {
    messageId: number;
    messageText: string;
    messageDate: Date;
    senderId: number;
    receiverId: number;
}

type Conversation = {
    conversationId: number;
    personOneId: number;
    personTwoId: number;
    messages: number[];
}

type Category = {
    categoryId: number;
    categoryName: "Trading Cards" | "Board Games" | "Video Games" | "Books" | "Clothes" | "Electronics" | "Sports Equipment" | "Antiques" | "Other" | "Crafting";
    categoryDescription: string;
}

export type { Ware, User, Message, Category, Conversation };