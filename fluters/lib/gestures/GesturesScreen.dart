import 'package:flutter/material.dart';

class GesturesScreen extends StatelessWidget {
  const GesturesScreen({Key key}) : super(key: key);

  //点击
  // @override
  // Widget build(BuildContext context) {
  //   return Scaffold(
  //     appBar: AppBar(title: Text('发现-手势')),
  //     body: Container(
  //       color: Colors.red,
  //       child: new Center(
  //         child: new RaisedButton(
  //           onPressed: () {
  //             print("object");
  //           },
  //           child: new Text("文本"),
  //         ),
  //       ),
  //       // constraints: BoxConstraints.expand(), //全屏展开
  //     ),
  //   );
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('发现-手势')),
      body: Container(
        color: Colors.red,
        child: new Center(
          child: new GestureDetector(
            onTap: () {
              print("object");
            },
            child: new Text("文本"),
          ),
        ),
      ),
    );
  }
}
