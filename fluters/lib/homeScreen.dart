import 'package:fluters/find/FindScreen.dart';
import 'package:fluters/friends/FriendsScreen.dart';
import 'package:fluters/manage/ManageScreen.dart';
import 'package:fluters/my/MyScreen.dart';
import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

//暗号：初见Flutter
class _HomeScreenState extends State<HomeScreen> {
  final List<Widget> _children = [
    FriendsScreen(),
    FindScreen(),
    ManageScreen(),
    MyScreen(),
  ];
  int _current = 0;
  void onTabFoot(int selectIndex) {
    setState(() {
      _current = selectIndex;
    });
  }

  List<BottomNavigationBarItem> _list = [
    new BottomNavigationBarItem(
        icon: Icon(Icons.face_retouching_natural), title: Text("好友")),
    new BottomNavigationBarItem(
        icon: Icon(Icons.find_in_page), title: Text("发现")),
    new BottomNavigationBarItem(icon: Icon(Icons.mail), title: Text("管理")),
    new BottomNavigationBarItem(icon: Icon(Icons.person), title: Text("我的")),
  ];

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        body: _children[_current],
        drawer: new Drawer(
          child: Center(
            child: Text("drawer 抽屉"),
          ),
        ),
        bottomNavigationBar: new BottomNavigationBar(
            type: BottomNavigationBarType.fixed,
            onTap: onTabFoot,
            currentIndex: _current,
            selectedItemColor: Colors.orange, //Color(0xff123456),
            unselectedFontSize: 14.0,
            items: _list));
  }
}
