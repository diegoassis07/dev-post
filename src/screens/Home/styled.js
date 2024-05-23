import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
export const Title = styled.Text`
  text-align: center;
  width: 100%;
  padding: 8px;
  background-color: #36393f;
  font-size: 33px;
  font-style: italic;
  font-weight: bold;
  color: #fff;
`;
export const ButtonPost = styled.TouchableOpacity`
  position: absolute;
  bottom: 5%;
  right: 6%;
  width: 70px;
  height: 70px;
  background-color: #202225;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;
