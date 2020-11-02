import 'package:flutter/material.dart';

class MyThirdScreens extends StatelessWidget {
  // const MyThirdScreens({Key key}) : super(key: key);

  // final String content;

  // MyThirdScreens(this.content);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: new AppBar(
          title: Text("三级页面"),
        ),
        body: Center(child: Text("三级页面")));
  }
}
