import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: 10px;
  margin: 17px 2%;
  background-color:#DCDCDC;
  border-radius: 8px;
  box-shadow: 1px 1px 1px rgba(18, 18, 18, 0.8);
  elevation: 3;
  padding: 11px;
`;
export const Header = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;
export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 6px;
`;
export const Nome = styled.Text`
  color: #353840;
  font-size: 18px;
  font-weight: bold;
`;
export const ContentContainer = styled.View``;
export const Content = styled.Text`
  margin: 4px;
`;
export const Actions = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
`;
export const LikerButton = styled.TouchableOpacity`
  width: 45px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
export const Like = styled.Text`
  color: #e52246;
  margin-right: 6px;
`;
export const TimePost = styled.Text`
  color: #121212;
`;
