import React from "react";
import { Text, View, StyleSheet, PermissionsAndroid, Platform, Button, Alert } from 'react-native';

const Permissions = () => {
  const [permissionsGranted, setPermissionsGranted] = React.useState(false);
  function askForPermissions() {
    const PERMISSIONS = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ];
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple(PERMISSIONS).then((results) => {
        Alert.alert(JSON.stringify(results));
        const allPermissionsGranted = Object.values(results).every(
          (result) => result === 'granted'
        );
        if (allPermissionsGranted) {
          setPermissionsGranted(true);
        }
      });
    } else {
      setPermissionsGranted(true);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        {permissionsGranted ? '已授权' : '未授权'}
      </Text>
      <Button title="请求授权" onPress={askForPermissions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Permissions;
