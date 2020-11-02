import 'package:fluters/my/sceondScreen.dart';
import 'package:flutter/material.dart';

class NavigationTast extends StatelessWidget {
  const NavigationTast({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: Text("导航使用"),
      ),
      body: Center(
        child: Column(
          children: <Widget>[
            RaisedButton(
                child: Text("静态跳转"),
                onPressed: () {
                  Navigator.of(context)
                      .pushNamed('/seconds')
                      .then((value) => {print(value)});
                }),
            RaisedButton(
                child: Text("动态跳转"),
                onPressed: () {
                  Navigator.push(
                      context,
                      new MaterialPageRoute(
                          builder: (context) =>
                              new MySecondScreens("动态跳转传入参数")));
                }),
          ],
        ),
      ),
    );
  }
}
