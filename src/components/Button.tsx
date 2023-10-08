import { styled } from "styled-components";

const Button = styled.button<{
  $disabled?: boolean;
  $variant?: "primary" | "secondary";
}>`
  height: 50px;
  margin: 0px;
  width: 100%;
  max-width: 10rem;
  border-radius: 10px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 2px 4px;
  background-color: rgb(40, 94, 80);
  color: rgb(255, 255, 255);
  cursor: pointer;
  transition: box-shadow 100ms ease;

  ${({ $variant }) =>
    $variant === "secondary" &&
    `
    background-color: white;
    color: rgb(90, 90, 90);
    border: 1px solid rgb(90, 90, 90);
  `}

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 6px;
  }
`;

export default Button;
