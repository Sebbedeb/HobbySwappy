import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useState } from "react";

type Person = {
  id: string;
  name: string;
  email: string;
  age?: number;
  adress?: Adress;
};

type Adress = {
  id: string;
  street: string;
  city: string;
  zip: string;
  persons?: Person[];
};

const GET_PERSONS = gql`
  query GetPersons {
    persons {
      id
      name
    }
  }
`;
const CREATE_PERSON = gql`
  mutation ($name: String!, $email: String!, $age: Int) {
    createPerson(name: $name, email: $email, age: $age) {
      id
      name
      age
      email
    }
  }
`;

function App() {
  const [person, setPerson] = useState({
    name: "",
    email: "",
    age: 0,
  });

  const { loading, error, data } = useQuery(GET_PERSONS);
  const handleCreatePerson = () => {
    createPerson({ variables: person });
  }
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: GET_PERSONS }],
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :{error.message}</p>;
  return (
    <div>
      <div className="logo">
        <img src="../images/HobbySwappy.png" alt="logo" width={300} height={100} />
      </div>
      <div>
        {data.persons.map((person: Person) => (
          <div key={person.id}>{person.name}</div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={person.name}
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
        />
        <input
          type="number"
          value={person.age}
          onChange={(e) => setPerson({ ...person, age: parseInt(e.target.value)})}
        />
        <input
          type="text"
          value={person.email}
          onChange={(e) => setPerson({ ...person, email: e.target.value })}
        />
        <button onClick={handleCreatePerson}>Add Person</button>
      </div>
    </div>
  );
}

export default App;
