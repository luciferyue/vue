import 'dart:convert';
import 'dart:io';
import 'package:fluters/details/DetailsScreen.dart';
import 'package:fluters/manage/Article.dart';
import 'package:fluters/manage/ArticleItem.dart';
import 'package:fluters/manage/CompanyItem.dart';
import 'package:fluters/manage/company.dart';
import 'package:flutter/material.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';
import 'package:http/http.dart' as http;

class ManageScreen extends StatefulWidget {
  ManageScreen({Key key}) : super(key: key);

  @override
  _ManageScreenState createState() => _ManageScreenState();
}

class _ManageScreenState extends State<ManageScreen> {
  List<Company> _dataList = [];
  int pageNo = 1;

  RefreshController _refreshController =
      RefreshController(initialRefresh: false);

  @override
  void initState() {
    super.initState();
    //首次进来加载第一页
    getDataList(1, (data) {
      setState(() {
        _dataList = Company.fromMapData(data);
      });
    });
  }

  getDataList(page, cb) async {
    String url = 'http://m.app.haosou.com/index/getData?type=1&page=$page';
    // HttpClient httpClient = new HttpClient();
    // HttpClientRequest request = await httpClient.getUrl(Uri.parse(url));
    // HttpClientResponse response = await request.close();
    // var data = await response.transform(utf8.decoder).join();
    // httpClient.close();
    var response = await http.get(url);
    var data = response.body;
    var json = jsonDecode(data);
    cb(json);
  }

  Widget _buildList() {
    if (_dataList.isEmpty) {
      return new Center(
        child: CircularProgressIndicator(),
      );
    }

    return SmartRefresher(
      controller: _refreshController,
      enablePullDown: true,
      enablePullUp: true,
      header: ClassicHeader(
          refreshingText: '正在加载中...',
          idleText: '下拉刷新',
          completeText: '加载完成',
          failedText: '数据刷新异常',
          releaseText: '松开刷新'),
      footer: ClassicFooter(
          idleText: '加载更多数据', loadingText: '玩命加载中...', noDataText: '没有更多数据'),
      onRefresh: _onRefresh,
      onLoading: _onLoading,
      child: ListView.builder(
        itemBuilder: (context, index) {
          var model = _dataList[index];
          return InkWell(
            child: CompanyItem(model),
            onTap: () {
              //跳转
              Navigator.push(
                  context,
                  new MaterialPageRoute(
                      builder: (context) => new DetailsScreen(model)));
            },
          );
        },
        itemCount: _dataList.length,
      ),
    );
  }

  //暗号：原来还可以这么玩
  void _onRefresh() async {
    // await Future.delayed(Duration(seconds: 2), () {
    //   _refreshController.refreshCompleted();
    // });
    pageNo = 1; //页码重置
    getDataList(1, (data) {
      _refreshController.refreshCompleted();

      setState(() {
        _dataList = Company.fromMapData(data);
      });
    });
  }

  void _onLoading() async {
    pageNo = pageNo + 1; //页码加1
    getDataList(pageNo, (data) {
      _refreshController.loadComplete();
      setState(() {
        _dataList.addAll(Company.fromMapData(data));
      });
    });
    // await Future.delayed(Duration(seconds: 2), () {
    //   _refreshController.loadComplete();
    // });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('原来还可以这么玩')), body: _buildList());
  }
}
