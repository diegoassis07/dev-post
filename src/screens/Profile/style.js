import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #36393f;
`;
export const Title = styled.Text`
  width: 100%;
  color: #fff;
  font-size: 33px;
  font-weight: bold;
  font-style: italic;
  margin-top: 10px;
  border-bottom-width: 1px;
  padding-bottom: 6px;
  border-bottom-color: #ddd;
  text-align: center;
`;

export const ButtonProfile = styled.TouchableOpacity`
  width: 205px;
  height: 205px;
  border-radius: 100px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;
export const ImageProfile = styled.Image`
  width: 205px;
  height: 205px;
  border-radius: 105px;
`;
export const ButtonText = styled.Text`
  position: absolute;
  z-index: 99;
`;
export const Nome = styled.Text`
  color: #fff;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
  margin-top: 20px;
`;
export const Email = styled.Text`
  color: #fff;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
  margin-top: 5px;
`;
export const UploadProfile = styled.TouchableOpacity`
  width: 93%;
  background-color: #418cfd;
  padding: 13px;
  margin-top: 20px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
export const UploadText = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  font-style: italic;
`;
export const LogOut = styled.TouchableOpacity`
  width: 93%;
  background-color: #fff;
  padding: 13px;
  margin-top: 12px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;
export const LogOutText = styled.Text`
  color: #363636;
  font-size: 22px;
  font-weight: 700;
  font-style: italic;
`;
export const UploadImagem = styled.Image`
  width: 220px;
  height: 220px;
  border-radius: 105px;
`;
