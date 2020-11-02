import 'package:fluters/friends/InheritedWidgetDemo.dart';
import 'package:flutter/material.dart';

class FriendsScreen extends StatelessWidget {
  // const FriendsScreen({Key key}) : super(key: key);

  List<String> items = List.generate(50, (index) => "item $index");

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('好友动态')),
        body: Center(
          child: RaisedButton(
            child: Text('跳转provider'),
            onPressed: () {
              Navigator.of(context).push(new MaterialPageRoute(
                  builder: (context) => InheritedWidgetDemo()));
            },
          ),
        ));
  }
}
