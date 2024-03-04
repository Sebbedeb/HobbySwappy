import { persons, adresses } from '../routes/data.js';
import { Adress, Person } from '../routes/types.js';

const MutationResolvers = {
    Mutation: {
        createPerson: (_parent: never, args: { name: string, age: number, email: string }, _context: never, _info: never) => {
            const newPerson = {
                id: String(persons.length + 1),
                name: args.name,
                email: args.email,
                age: args.age !== undefined ? args.age : 0, // Providing a default value if age is not provided
            };
            persons.push(newPerson);
            return newPerson;
        },
        createAdress: (_parent: never, args: { street: string, city: string, zip: string }, _context: never, _info: never) => {
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
        addPersonToAdress: (_parent: never, args: { personId: string, adressId: string }, _context: never, _info: never) => {
            const person: Person = persons.find((person) => person.id === args.personId) as Person;
            const adress: Adress = adresses.find((adress) => adress.id === args.adressId) as Adress;
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
        removePersonFromAdress: (_parent: never, args: { personId: string, adressId: string }, _context: never, _info: never) => {
            const person: Person = persons.find((person) => person.id === args.personId) as Person;
            const adress: Adress = adresses.find((adress) => adress.id === args.adressId) as Adress;
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
        deletePerson: (_parent: never, args: { id: string }, _context: never, _info: never) => {
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
