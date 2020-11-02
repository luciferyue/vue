import 'package:fluters/application.dart';
import 'package:fluters/details/DotsIndicator.dart';
import 'package:fluters/details/company_hot_job.dart';
import 'package:fluters/details/company_inc.dart';
import 'package:fluters/details/info.dart';
import 'package:fluters/manage/company.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

const double _kAppH = 256.0;

class DetailsScreen extends StatefulWidget {
  final Company _company;

  DetailsScreen(this._company);

  @override
  _DetailsScreenState createState() => _DetailsScreenState();
}

class _DetailsScreenState extends State<DetailsScreen>
    with TickerProviderStateMixin {
  final Future<SharedPreferences> _preferences =
      SharedPreferences.getInstance();

  List<Widget> _imageList;
  List<String> _urls = [
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20170725/861159df793857d6cb984b52db4d4c9c.jpg',
    'https://img2.bosszhipin.com/mcs/chatphoto/20151215/a79ac724c2da2a66575dab35384d2d75532b24d64bc38c29402b4a6629fcefd6_s.jpg',
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20180207/c15c2fc01c7407b98faf4002e682676b.jpg'
  ];

  List<Tab> _tabs;

  TabController _controller;
  VoidCallback onTapAction;
  int _currentIndex = 0;
  Widget _detailsTabInfo;

  @override
  void initState() {
    super.initState();

    _imageList = [];
    _urls.forEach((String url) {
      _imageList.add(new Container(
        color: Colors.red,
        child: new ConstrainedBox(
          constraints: BoxConstraints.expand(),
          child: new Image.network(url, height: _kAppH, fit: BoxFit.cover),
        ),
      ));
    });

    _detailsTabInfo = new CompanyInc(widget._company.inc);

    _tabs = [
      new Tab(text: '公司概况'),
      new Tab(text: '热招职位'),
    ];

    _controller = new TabController(length: _tabs.length, vsync: this);

    onTapAction = () {
      setState(() {
        if (_currentIndex == 0) {
          _detailsTabInfo = new CompanyInc(widget._company.inc);
        } else {
          _detailsTabInfo = new CompanyHotJob();
        }
        _currentIndex = _controller.index;
      });
    };
    _controller.addListener(onTapAction);
    // _controller.removeListener(onTapAction);
    // readData();
  }

  // void saveData() async {
  //   final SharedPreferences pref = await _preferences;
  //   pref.setString('someTing', '存储数据');
  // }

  // void readData() async {
  //   final SharedPreferences pref = await _preferences;
  //   String data = pref.getString('someTing');
  //   print(data);
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: new Text("详情"),
      // ),
      body: Stack(
        children: <Widget>[
          SingleChildScrollView(
            child: Column(
              children: [
                SizedBox.fromSize(
                  size: Size.fromHeight(_kAppH),
                  child: IndicatorViewPager(pages: _imageList),
                ),
                Container(
                  color: Colors.white,
                  child: new Column(
                    children: [
                      DetailsInfo(widget._company),
                      Divider(color: Colors.black),
                      new TabBar(
                        tabs: _tabs,
                        controller: _controller,
                        labelColor: Colors.black,
                        labelStyle: TextStyle(fontSize: 18.0),
                        indicatorSize: TabBarIndicatorSize.tab,
                        indicatorWeight: 3,
                        indicatorColor: Colors.red,
                      )
                    ],
                  ),
                ),
                IndexedStack(
                  index: _currentIndex,
                  children: [CompanyInc(widget._company.inc), CompanyHotJob()],
                ),
                _detailsTabInfo
              ],
            ),
          ),
          new Positioned(
              top: Application.barT,
              left: 10,
              child: BackButton(color: Colors.white)),
        ],
      ),
    );
  }
}
