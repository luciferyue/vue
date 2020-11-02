import 'package:flutter/material.dart';

class MySecondScreens extends StatelessWidget {
  // const MySecondScreens({Key key}) : super(key: key);

  final String content;

  MySecondScreens(this.content);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: Text("二级页面"),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            Text(content),
            RaisedButton(
                child: Text('返回方式1'),
                onPressed: () {
                  Navigator.of(context).pop("返回的东西");
                }),
            RaisedButton(
                child: Text("返回方式2,关闭当前，再前进"),
                onPressed: () {
                  Navigator.of(context).popAndPushNamed('/third');
                }),
            RaisedButton(
                child: Text("返回方式3,关闭当前，再前进"),
                onPressed: () {
                  Navigator.of(context).pushReplacementNamed('/third');
                }),
          ],
        ),
      ),
    );
  }
}
