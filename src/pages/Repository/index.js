import { useParams } from "react-router-dom";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import API from "../../api/services";

export default function Repository() {
  const { name } = useParams();

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getRepository() {
      const [repositoryData, issuesData] = await Promise.all([
        await API.get(`repos/${name}`),
        await API.get(`repos/${name}/issues`, {
          params: {
            state: 'open',
            per_page: 5,
          }
        }),
      ]);

      setRepository(repositoryData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    getRepository();
  }, [name]);

  return (
    <Container>
      {name}
    </Container>
  );
}
