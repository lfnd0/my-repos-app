import { Container, SubmitButton, Form } from "./styles";
import { FaGithub, FaPlus } from "react-icons/fa";

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={() => { }}>
        <input type="text" placeholder="Adicione o repositório" />

        <SubmitButton>
          <FaPlus color="#FFFFFF" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
