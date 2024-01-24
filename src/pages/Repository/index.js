import { useParams } from "react-router-dom";

export default function Repository() {
  const { name } = useParams();

  return (
    <h1>{name}</h1>
  );
}
