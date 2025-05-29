import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get("/")

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value.trim(),
      age: parseInt(inputAge.current.value),
      email: inputEmail.current.value.trim(),
    });

    getUsers();
    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
  }

  async function deleteUser(id) {
    await api.delete(`/users/${id}`);

    getUsers();
    inputName.current.value = "";
    inputAge.current.value = "";
    inputEmail.current.value = "";
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        await getUsers();
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    }

    fetchUsers();
  }
  , []);

  return (
    <div className="home-container">
      <div className="user-form">
        <h1>Cadastro de Usuários</h1>
        <input
          className="input-field"
          name="name"
          type="text"
          placeholder="Nome"
          ref={inputName}
        />
        <input
          className="input-field"
          name="age"
          type="number"
          placeholder="Idade"
          ref={inputAge}
        />
        <input
          className="input-field"
          name="email"
          type="email"
          placeholder="E-mail"
          ref={inputEmail}
        />
        <button className="submit-button" type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </div>

      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-info">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Idade:</strong> {user.age}</p>
            <p><strong>E-mail:</strong> {user.email}</p>
          </div>
          <button className="delete-button" onClick={() => deleteUser(user.id)}>
            <img src={Trash} alt="Deletar" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
