import { useParams } from "react-router-dom";
import { Back, Container, Issues, Loading, Owner, Pagination, Filters } from "./styles";
import { useEffect, useState } from "react";
import API from "../../api/services";
import { FaArrowLeft, FaSpinner } from "react-icons/fa";

export default function Repository() {
  const { name } = useParams();

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterIndex, setFilterIndex] = useState(0);
  const [filters] = useState([
    { state: 'all', label: 'Todas', active: true },
    { state: 'open', label: 'Abertas', active: false },
    { state: 'closed', label: 'Fechadas', active: false },
  ]);

  useEffect(() => {
    async function getRepository() {
      const repositoryData =
        await API.get(`repos/${name}`);

      setRepository(repositoryData.data);
      setLoading(false);
    }

    getRepository();
  }, [name, filters]);

  useEffect(() => {
    async function getIssuesPage() {
      const pagedIssuesData = await API.get(`repos/${name}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 10,
        },
      });

      setIssues(pagedIssuesData.data)
    }

    getIssuesPage();
  }, [name, page, filters, filterIndex]);

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
    if (action === 'next') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  function handleFilter(index) {
    setFilterIndex(index);
    setPage(1);
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

      <Filters active={filterIndex}>
        {
          filters.map((filter, index) => (
            <button
              key={filter.label}
              type="button"
              onClick={() => { handleFilter(index) }}
            >
              {filter.label}
            </button>
          ))
        }
      </Filters>

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

      <Pagination>
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
      </Pagination>
    </Container>
  );
}
