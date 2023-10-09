import { styled } from "styled-components";

const Form = styled.form`
  align-self: center;
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1.625rem;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.span`
  font-size: 1rem;
  color: rgb(16, 16, 16);
  font-weight: 600;
`;

export const SubLabel = styled.span`
  font-size: 1rem;
  color: rgb(16, 16, 16);
`;

export const Input = styled.input`
  max-width: 20ch;
  padding: 0.25rem 1.25rem;
  border: 1px solid rgb(90, 90, 90);
  box-sizing: border-box;
  border-radius: 8px;
  min-height: 2.5rem;
  max-width: 400px;
  margin-bottom: 4px;
`;

export const TextArea = styled.textarea`
  max-width: 60ch;
  width: 100%;
  height: 12rem;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid rgb(90, 90, 90);
  padding: 1.125rem 1.25rem;
`;

export const Group = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FieldError = styled(Label)`
  color: red;
`;

export default Form;
