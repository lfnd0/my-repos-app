import { useCallback, useState } from "react";
import { Container, SubmitButton, Form } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";
import API from "../../api/services";

export default function Main() {
  const [newRepository, setNewRepository] = useState("");
  const [respositories, setRepositories] = useState([]);

  const handleSubmit = useCallback(event => {
    event.preventDefault();

    async function searchRepository() {
      const response = await API.get(`repos/${newRepository}`);

      const repositoryData = {
        name: response.data.full_name,
      }

      setRepositories([...respositories, repositoryData]);
      setNewRepository("");
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

        <SubmitButton>
          <FaPlus color="#FFFFFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
