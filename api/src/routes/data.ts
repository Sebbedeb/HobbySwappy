import { Category, Ware, User, Message } from "./types";

export const categories: Category[] = [
    {
        categoryId: 1,
        categoryName: "Trading Cards",
        categoryDescription: "Trading Cards"
    },
    {
        categoryId: 2,
        categoryName: "Board Games",
        categoryDescription: "Board Games"
    },
    {
        categoryId: 3,
        categoryName: "Video Games",
        categoryDescription: "Video Games"
    },
    {
        categoryId: 4,
        categoryName: "Books",
        categoryDescription: "Books"
    },
    {
        categoryId: 5,
        categoryName: "Clothes",
        categoryDescription: "Clothes"
    },
    {
        categoryId: 6,
        categoryName: "Electronics",
        categoryDescription: "Electronics"
    },
    {
        categoryId: 7,
        categoryName: "Sports Equipment",
        categoryDescription: "Sports Equipment"
    },
    {
        categoryId: 8,
        categoryName: "Antiques",
        categoryDescription: "Antiques"
    },
    {
        categoryId: 9,
        categoryName: "Other",
        categoryDescription: "Other"
    }
];

export const users: User[] = [
    {
        userId: 1,
        userName: "Sebbedeb",
        userPassword: "1234",
        userAdress: "Morbærhaven 1A",
        userZip: 2605,
    },
    {
        userId: 2,
        userName: "BoEg",
        userPassword: "1234",
        userAdress: "Søndergade 10b",
        userZip: 4130,
    },
    {
        userId: 3,
        userName: "Vandmelonika",
        userPassword: "1234",
        userAdress: "Kirsebærvej 12",
        userZip: 2605,
    }
];

export const wares : Ware[] = [
    {
        wareId: 1,
        wareTitle: "Charizard",
        wareDescription: "A perfectly mint Charizard card from 1999. A must have for any collector.",
        warePrice: 1000,
        wareCategory: categories[0],
        User: users[0]
    },
    {
        wareId: 2,
        wareTitle: "Monopoly",
        wareDescription: "Everyone's favorite board game. In perfect condition. Made in 1999.",
        warePrice: 20,
        wareCategory: categories[1],
        User: users[1]
    },
    {
        wareId: 3,
        wareTitle: "Super Mario 64",
        wareDescription: "Super Mario 64 for the Nintendo 64. In perfect condition. Made in 1996. A little slow on the loading time",
        warePrice: 50,
        wareCategory: categories[2],
        User: users[1]
    },
    {
        wareId: 4,
        wareTitle: "Harry Potter 1",
        wareDescription: "Harry Potter and the Philosopher's Stone. First edition. In perfect condition.",
        warePrice: 10,
        wareCategory: categories[3],
        User: users[0]
    },
    {
        wareId: 5,
        wareTitle: "Nike Air Max 90",
        wareDescription: "Nike Air Max 90. In perfect condition. Size 42.5. Made in 2020. Never worn",
        warePrice: 100,
        wareCategory: categories[4],
        User: users[1]
    },
    {
        wareId: 6,
        wareTitle: "Creality Ender 3 Pro 3D Printer",
        wareDescription: "Creality Ender 3 Pro 3D Printer. In perfect condition. Made in 2020. Used once. Comes with 1kg of PLA filament.",
        warePrice: 500,
        wareCategory: categories[5],
        User: users[0]
    },
    {
        wareId: 7,
        wareTitle: "Hockey Stick",
        wareDescription: "Hockey Stick from the 2020 game between the New York Rangers and the New York Islanders. In perfect condition. Signed by the entire New York Rangers team.",
        warePrice: 20,
        wareCategory: categories[6],
        User: users[1]
    },
    {
        wareId: 8,
        wareTitle: "Ming Vase",
        wareDescription: "Ming Vase from the 15th century. In perfect condition. A must have for any collector. signed by John Ming",
        warePrice: 100,
        wareCategory: categories[7],
        User: users[0]
    },
    {
        wareId: 9,
        wareTitle: "A rock from the moon",
        wareDescription: "A rock from the moon. In perfect condition. A must have for any collector. Signed by Neil Armstrong.",
        warePrice: 100,
        wareCategory: categories[8],
        User: users[1]
    }
];



export const messages: Message[] = [
    {
        messageId: 1,
        messageText: "Hello, I would like to buy your Charizard card",
        messageDate: new Date(),
        messageSender: users[0].userName,
        messageReceiver: users[1].userName
    },
    {
        messageId: 2,
        messageText: "Sure, I would like to trade it for your Monopoly game",
        messageDate: new Date(),
        messageSender: users[1].userName,
        messageReceiver: users[0].userName
    }
];

export const hello = ["Hello world!"];