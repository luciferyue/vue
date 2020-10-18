import * as React from 'react';
import { View, Text } from 'react-native';

function DetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "blue" }}>
      <Text style={{ fontSize: 40 }} onPress={() => {
        navigation.goBack()
      }}>Detail Screen</Text>
    </View>
  );
}

export default DetailScreen