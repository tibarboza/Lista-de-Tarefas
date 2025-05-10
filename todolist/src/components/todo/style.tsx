import styled from "styled-components/";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const BtnActionTodo = styled(Button)`
  background: transparent;
  border: none;

  &:hover {
    @media (hover: hover) {
      background-color: transparent;
    }
  }
`;

export const SeparatorTodo = styled(Separator)`
  height: 30px;
  background-color: black;
`;
