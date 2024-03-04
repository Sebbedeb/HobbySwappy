import { persons, adresses } from '../routes/data.js';
const MutationResolvers = {
    Mutation: {
        createPerson: (_parent, args, _context, _info) => {
            const newPerson = {
                id: String(persons.length + 1),
                name: args.name,
                email: args.email,
                age: args.age !== undefined ? args.age : 0, // Providing a default value if age is not provided
            };
            persons.push(newPerson);
            return newPerson;
        },
        createAdress: (_parent, args, _context, _info) => {
            const newAdress = {
                id: String(persons.length + 1),
                street: args.street,
                city: args.city,
                zip: args.zip,
            };
            adresses.push(newAdress);
            return newAdress;
        },
        //Add a mutation to add a person to an address.
        addPersonToAdress: (_parent, args, _context, _info) => {
            const person = persons.find((person) => person.id === args.personId);
            const adress = adresses.find((adress) => adress.id === args.adressId);
            if (person !== undefined && adress !== undefined) {
                person.adress = adress;
                if (adress.persons !== undefined) {
                    adress.persons.push(person);
                }
                return person;
            }
            return null;
        },
        //Add a mutation to remove a person from an address.
        removePersonFromAdress: (_parent, args, _context, _info) => {
            const person = persons.find((person) => person.id === args.personId);
            const adress = adresses.find((adress) => adress.id === args.adressId);
            if (person !== undefined && adress !== undefined) {
                person.adress = undefined;
                if (adress.persons !== undefined) {
                    adress.persons = adress.persons.filter((p) => p.id !== person.id);
                }
                return person;
            }
            return null;
        },
        //Add a mutation to delete a person.
        deletePerson: (_parent, args, _context, _info) => {
            const personIndex = persons.findIndex((person) => person.id === args.id);
            if (personIndex !== -1) {
                const person = persons[personIndex];
                persons.splice(personIndex, 1);
                return person;
            }
            return null;
        },
    }
};
export { MutationResolvers };
