import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  border-radius: 4px;
  padding: 30px;
  margin: 80px auto;
  background-color: #2A475E;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #C7D5E0;
    svg {
      margin-right: 10px;
    };
  };
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
    border: 1px solid ${props => (props.hasError ? '#FF0000' : '#C7D5E0')};
    color: #171A21;
  };
`;

const loadAnimated = keyframes`
  from {
    transform: rotate(0deg);
  };
  to {
    transform: rotate(360deg);
  };
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: "submit",
  disabled: props.load,
}))`
  border: 0;
  border-radius: 4px;
  margin-left: 8px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1B2838;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  };
  ${props => props.load &&
    css`
      svg {
        animation: ${loadAnimated} 2s linear infinite;
      };
    `
  };
`;

export const List = styled.ul`
  margin-top: 20px;
  color: #C7D5E0;
  list-style: none;
  li {
    padding: 15px 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    & + li {
      border-top: 1px solid #C7D5E0;
    };
    a {
      margin-right:5px;
      color: #C7D5E0;
      text-decoration: none;
    };
    span {
      display: flex;
      align-items: center;
    };
  }
`;

export const Trash = styled.button.attrs({
  type: "button"
})`
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
  color: #FF0000;
  background: transparent;
`;
