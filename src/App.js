import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  //load data
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [])

  // handle user submit button event--------
  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    const user = { name, email }

    //sent/post data to server-----------------------

    fetch('http://localhost:5000/user', {

      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify(user)
    })

      .then(res => res.json())
      .then(data => {
        // for output show users
        const newUser = [...users, data];
        setUsers(newUser)

        // console.log(data);
      })

    // console.log(name, email);
  }



  return (
    <div className="App">
      <h1>My Own Data : {users.length} </h1>

      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' required />
        <input type="text" name='email' placeholder='Email' required />
        <input type="submit" value='Add user' />
      </form>

      <ul>
        {
          users.map(user => <li key={user.id}> id: {user.id}, Name: {user.name}, email: {user.email}</li>)
        }
      </ul>

    </div>
  );
}

export default App;
