import 'package:flutter/material.dart';

// ignore: must_be_immutable
class FriendsScreen extends StatelessWidget {
  // const FriendsScreen({Key key}) : super(key: key);

  List<String> items = List.generate(50, (index) => "item $index");

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('好友列表')),
      body: getListView2(),
    );
  }

  getListView1() {
    return ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          var content = items[index];
          return InkWell(
            child: Padding(
              padding: EdgeInsets.all(10),
              child: Text(content),
            ),
            onTap: () {
              print("object");
            },
          );
        });
  }

  getListView2() {
    return ListView.separated(
      itemCount: items.length,
      itemBuilder: (context, index) {
        var content = items[index];
        return InkWell(
          child: Padding(
            padding: EdgeInsets.all(10),
            child: Text(content),
          ),
          onTap: () {
            print("object");
          },
        );
      },
      separatorBuilder: (context, index) {
        return Divider(
          color: Colors.red,
        );
      },
    );
  }
}
