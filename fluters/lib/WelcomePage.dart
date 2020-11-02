import 'dart:async';
import 'package:fluters/application.dart';
import 'package:fluters/homeScreen.dart';
import 'package:flutter/material.dart';

class WelcomePage extends StatefulWidget {
  WelcomePage({Key key}) : super(key: key);

  @override
  _WelcomePageState createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  int counter = 2;

  Timer _timer;

  @override
  void initState() {
    super.initState();

    _timer = new Timer.periodic(Duration(seconds: 1), (timer) {
      if (counter == 1) {
        _timer.cancel();
        _timer = null;

        //界面跳转
        goHomePage();
      }
      setState(() {
        counter = --counter;
      });
    });
  }

  goHomePage() {
    Navigator.of(context).pushAndRemoveUntil(
        new MaterialPageRoute(builder: (context) => HomeScreen()),
        (route) => route == null);
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    Application.screenH = size.height;
    Application.screenW = size.width;
    Application.barT = MediaQuery.of(context).padding.top;
    Application.barB = MediaQuery.of(context).padding.bottom;
    return Scaffold(
      body: Stack(
        children: [
          Container(
            child: Image.asset('assets/img/001.jpg',
                height: Application.screenH, fit: BoxFit.cover),
          ),
          Positioned(
              top: Application.barT,
              right: 20,
              child: Chip(
                label: Text("$counter秒"),
                backgroundColor: Colors.transparent,
              ))
        ],
      ),
    );
  }
}

class FlowerApp {}
