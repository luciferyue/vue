import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';

function Link({ url, title, param = {} }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={{ fontSize: 40 }} onPress={() => {
        navigation.navigate(url, param)
      }}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#f60',
    borderRadius: 10,
    marginBottom: 10
  },
})

export default Link