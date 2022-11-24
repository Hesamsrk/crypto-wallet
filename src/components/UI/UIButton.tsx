import styled from "styled-components/native";
import React from "react";

interface PropTypes {
    bgColor?: string
    onClick: () => void
}

export const UIButton = ({onClick, bgColor, children}: React.PropsWithChildren<PropTypes>) => (
    <ButtonContainer onPress={onClick} bgColor={bgColor || "white"}>
        <ButtonText>{children || ""}</ButtonText>
    </ButtonContainer>
);


const ButtonContainer = styled.TouchableOpacity<{ bgColor: string }>`
  width: 90%;
  height: 50px;
  padding: 12px;
  margin: 20px;
  border-radius: 20px;
  background-color: ${props => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;
