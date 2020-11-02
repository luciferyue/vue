import 'package:fluters/my/BrowserScreen.dart';
import 'package:fluters/my/navigation_tast.dart';
import 'package:flutter/material.dart';

class MyScreen extends StatelessWidget {
  const MyScreen({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('我的')),
      body: new Column(children: [
        RaisedButton(
          child: Text("跳转"),
          onPressed: () {
            Navigator.push(
                context,
                new MaterialPageRoute(
                    builder: (context) => new NavigationTast()));
          },
        ),
        RaisedButton(
          child: Text("跳转webView"),
          onPressed: () {
            Navigator.push(
                context,
                new MaterialPageRoute(
                    builder: (context) => new BrowserScreen()));
          },
        ),
      ]),
    );
  }
}
