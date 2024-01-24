import { useCallback, useState } from "react";
import { Container, SubmitButton, Form, List, Trash } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import API from "../../api/services";

export default function Main() {
  const [newRepository, setNewRepository] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    async function searchRepository() {
      setLoading(true);

      try {
        const response = await API.get(`repos/${newRepository}`);

        const repositoryData = {
          name: response.data.full_name,
        }

        setRepositories([...repositories, repositoryData]);
        setNewRepository("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    searchRepository();
  }, [newRepository, repositories]);

  function handleInputChange(event) {
    setNewRepository(event.target.value);
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

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicione o repositório"
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
              <span>
                <a href="/repository">
                  <FaBars size={20} />
                </a>

                {item.name}
              </span>

              <Trash onClick={() => handleDelete(item.name)}>
                <FaTrash size={14} />
              </Trash>
            </li>
          ))
        }
      </List>
    </Container>
  );
}
