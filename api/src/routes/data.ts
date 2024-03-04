const adresses = [
    {
        id: "1",
        street: "1234 Elm St",
        city: "Springfield",
        zip: "12345"
    },
    {
        id: "2",
        street: "5678 Oak St",
        city: "Shelbyville",
        zip: "67890"
    },
    {
        id: "3",
        street: "91011 Pine St",
        city: "Capital City",
        zip: "11213"
    },
    {
        id: "4",
        street: "14151 Maple St",
        city: "Ogdenville",
        zip: "41516"
    }
];

const persons = [
    {
        id: "1",
        name: "John",
        email: "john@john.com",
        age: 25,
        adress: adresses[0]
    },
    {
        id: "2",
        name: "Jane",
        email: "Jane@Jane.com",
        age: 30,
        adress: adresses[1]
    },
    {
        id: "3",
        name: "Doe",
        email: "Doe@Doe.com",
        age: 35,
    },
    {
        id: "4",
        name: "Smith",
        email: "Smith@Smith.com",
        age: 40,
        adress: adresses[0]
    }
];

export { persons, adresses };