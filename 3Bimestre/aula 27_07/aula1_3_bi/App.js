import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Image } from 'react-native';

export default function App() {
  return (
    <ScrollView>
      <Image source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat1.png',
        }}
        style={{width: 200, height: 200}}/>
      <Text>Digite o e-mail</Text>
      <TextInput placeholder='fulano@hotmail.com'/>
      <Text>Senha</Text>
      <TextInput placeholder='abc@123'/>
      <Button onPress={() => {}} title='Login'/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
