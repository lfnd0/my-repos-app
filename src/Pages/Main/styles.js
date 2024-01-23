import styled from "styled-components";

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
    }
  }
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
    border: 1px solid #C7D5E0;
    color: #171A21;
  }
`;

export const SubmitButton = styled.button`
  border: 0;
  border-radius: 4px;
  margin-left: 8px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1B2838;
`;
