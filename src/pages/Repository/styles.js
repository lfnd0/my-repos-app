import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";

const loadAnimated = keyframes`
  from {
    transform: rotate(0deg);
  };
  to {
    transform: rotate(360deg);
  };
`;

export const Loading = styled.div`
  color: #C7D5E0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${props => props.load &&
    css`
      svg {
        animation: ${loadAnimated} 2s linear infinite;
      };
    `
  };
`;

export const Container = styled.div`
  max-width: 700px;
  background-color: #2A475E;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  };
  h1 {
    font-size: 30px;
    color: #C7D5E0;
  };
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #C7D5E0;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  };
`;

export const Back = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const Issues = styled.ul`
  margin-top: 30px;
  padding: 30px;
  border-top: 1px solid #C7D5E0;
  list-style: none;
  & + li {
    margin-top: 12px;
  };
  li {
    display: flex;
    padding: 15px 10px;
    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #1B2838;
    };
    div {
      flex: 1;
      margin-left: 12px;
      p {
        margin-top: 10px;
        font-size: 12px;
        color: #C7D5E0;
      }
    };
    strong {
      font-size: 15px;
      a {
        text-decoration: none;
        color: #C7D5E0;
        transform: 0.3s;
        &:hover {
          color: #1B2838;
        };
      };
      span {
        border-radius: 4px;
        font-size: 4px;
        font-weight: 600;
        padding: 2px 4px;
        margin-left: 10px;
        color: #C7D5E0;
        background-color: #1B2838;
      };
    };
  };
`;
