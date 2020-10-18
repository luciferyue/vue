import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
//暗号：建立清晰规范的数据处理流程
function EditScreen({ route }) {
  const navigation = useNavigation();
  const { userName, setUserName } = route.params;
  const [name, setName] = React.useState(userName);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="请输入姓名"
      />
      <Button
        title="确定"
        onPress={() => {
          setUserName(name);
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    width: 200,
    height: 40,
  }
});
export default EditScreen