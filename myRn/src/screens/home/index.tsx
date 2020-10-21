import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Button } from 'react-native';
import { Header, Colors } from 'react-native/Libraries/NewAppScreen';
import Link from "components/button-link"

const Home = (props) => {
  const [userName, setUserName] = React.useState('建立清晰规范的数据处理流程');
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <Header />
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle} >MY React Native</Text>
          <Text style={styles.sectionTitle} >当前用户：{userName}</Text>
          <Link url="Permissions" title="授权" />
          <Link url="Detail" title="详情跳转" />
          <Link url="Edit" title="编辑姓名" param={{ userName, setUserName }} />
          <Link url="Gird" title="九宫格" />
          <Link url="Movie" title="电影选票" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 20
  }
});

export default Home;
