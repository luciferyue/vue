import 'package:fluters/WelcomePage.dart';
import 'package:fluters/gestures/GesturesScreen.dart';
import 'package:fluters/gird/GirdeView.dart';
import 'package:fluters/homeScreen.dart';
import 'package:fluters/my/myThirdScreen.dart';
import 'package:fluters/my/sceondScreen.dart';
import 'package:fluters/my/myThirdScreen.dart';
import 'package:fluters/singleChild/SingleChildScrollView.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter', //安卓应用管理器上方
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: WelcomePage(),
      // home: HomeScreen(),
      // home: GesturesScreen(),
      // home: GirdeView(),
      // home: SingleChildSrcoll(),
      // initialRoute: "/first",
      routes: {
        '/seconds': (BuildContext context) {
          return MySecondScreens("静态路由传入参数");
        },
        '/third': (BuildContext context) {
          return MyThirdScreens();
        }
      },
      // routes: <String, WidgetBuilder>{
      //   "/first": (BuildContext context) => new FirstScreen(),
      //   "/second": (BuildContext context) =>
      //       new SecondScreen(content: '界面二', title: '标题'),
      //   // "/second": (BuildContext context) => new SecondScreen('界面二', '标题'),
      // },
    );
  }
}

// class HomeScreen extends StatelessWidget {
// }

class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: new Text("界面一"),
        // centerTitle: false, //是否局中标题
        leading: Icon(Icons.ac_unit),
        actions: <Widget>[Icon(Icons.access_alarm), Icon(Icons.access_alarm)],
      ),
      body: new Center(
        child: Text("body"),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  final String content;
  final String title;

  //构造函数
  SecondScreen({this.content, this.title});
  // SecondScreen(this.content, this.title);

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: AppBar(
        title: new Text("$title"),
        // centerTitle: false, //是否局中标题
        leading: Icon(Icons.ac_unit),
        actions: <Widget>[Icon(Icons.access_alarm), Icon(Icons.access_alarm)],
      ),
      body: new Center(
        child: Text("$content"),
      ),
    );
  }
}
