import { useParams } from "react-router-dom";
import { Back, Container, Issues, Loading, Owner, Pages } from "./styles";
import { useEffect, useState } from "react";
import API from "../../api/services";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function Repository() {
  const { name } = useParams();

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getRepository() {
      const [repositoryData, issuesData] = await Promise.all([
        await API.get(`repos/${name}`),
        await API.get(`repos/${name}/issues`, {
          params: {
            state: 'open',
            per_page: 10,
          }
        }),
      ]);

      setRepository(repositoryData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    getRepository();
  }, [name]);

  useEffect(() => {
    async function getIssuesPage() {
      const pagedIssuesData = await API.get(`repos/${name}/issues`, {
        params: {
          state: 'open',
          page,
          per_page: 10,
        },
      });

      setIssues(pagedIssuesData.data)
    }

    getIssuesPage();
  }, [name, page]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  if (isLoading) {
    return (
      <Loading load={isLoading}>
        <FaSpinner color="#C7D5E0" size={40} />
      </Loading>
    );
  }

  return (
    <Container>
      <Back to="/">
        <FaArrowLeft color="#C7D5E0" size={20} title="Voltar" />
      </Back>

      <Owner>
        <img
          src={repository.owner.avatar_url}
          alt={repository.owner.login}
        />

        <h1>{repository.name}</h1>

        <p>{repository.description}</p>
      </Owner>

      <Issues>
        {
          issues.map(issue => (
            <li key={issue.id.toString()}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />

              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {
                    issue.labels.map(label => (
                      <span key={label.id.toString()}>{label.name}</span>
                    ))
                  }
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))
        }
      </Issues>

      <Pages>
        <button
          type="button"
          onClick={() => { handlePage('back') }}
          disabled={page < 2}
        >
          Anterior
        </button>

        <button
          type="button"
          onClick={() => handlePage('next')}
        >
          Próxima
        </button>
      </Pages>
    </Container>
  );
}
