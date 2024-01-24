import { useCallback, useState } from "react";
import { Container, SubmitButton, Form } from "./styles";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import API from "../../api/services";

export default function Main() {
  const [newRepository, setNewRepository] = useState("");
  const [respositories, setRepositories] = useState([]);
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

        setRepositories([...respositories, repositoryData]);
        setNewRepository("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    searchRepository();
  }, [newRepository, respositories]);

  function handleInputChange(event) {
    setNewRepository(event.target.value);
  }

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

        <SubmitButton load={isLoading ? true : false}>
          {
            isLoading ? (
              <FaSpinner color="#C7D5E0" size={14} />
            ) : (
              <FaPlus color="#C7D5E0" size={14} />
            )
          }
        </SubmitButton>
      </Form>
    </Container>
  );
}
