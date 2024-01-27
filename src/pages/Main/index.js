import { useCallback, useEffect, useState } from "react";
import { Container, SubmitButton, Form, List, Trash } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import API from "../../api/services";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepository, setNewRepository] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const localStorageRepositories = localStorage.getItem("repositories");

    if (localStorageRepositories) {
      setRepositories(JSON.parse(localStorageRepositories));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("repositories", JSON.stringify(repositories))
  }, [repositories]);

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    async function searchRepository() {
      setLoading(true);
      setAlert(false);

      try {
        if (newRepository === "") {
          throw new Error("O nome do repositório não pode ser vazio");
        }

        const response = await API.get(`repos/${newRepository}`);

        const hasRepository = repositories.find(item => item.name === newRepository);
        if (hasRepository) {
          throw new Error("O repositório já foi adicionado");
        }

        const repositoryData = {
          name: response.data.full_name,
        }

        setRepositories([...repositories, repositoryData]);
        setNewRepository("");
      } catch (error) {
        setAlert(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    searchRepository();
  }, [newRepository, repositories]);

  function handleInputChange(event) {
    setNewRepository(event.target.value);
    setAlert(false);
  }

  const handleDelete = useCallback(name => {
    const fetchRepositories = repositories.filter(repository => repository.name !== name);
    setRepositories(fetchRepositories);
  }, [repositories]);

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit} hasError={alert}>
        <input
          type="text"
          placeholder="autor/repositório"
          value={newRepository}
          onChange={handleInputChange}
        />

        <SubmitButton load={isLoading ? 1 : 0}>
          {
            isLoading ? (
              <FaSpinner color="#C7D5E0" size={14} />
            ) : (
              <FaPlus color="#C7D5E0" size={14} />
            )
          }
        </SubmitButton>
      </Form>

      <List>
        {
          repositories.map(item => (
            <li key={item.name}>
              {item.name}

              <span>
                <Link to={`/repository/${encodeURIComponent(item.name)}`} title="Ver detalhes do repositório">
                  <FaBars size={20} />
                </Link>

                <Trash onClick={() => handleDelete(item.name)} title="Excluir o repositório">
                  <FaTrash size={16} />
                </Trash>
              </span>
            </li>
          ))
        }
      </List>
    </Container >
  );
}
