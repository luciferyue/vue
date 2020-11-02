import 'package:fluters/find/Article.dart';
import 'package:fluters/find/ArticleItem.dart';
import 'package:flutter/material.dart';

class FindScreen extends StatefulWidget {
  FindScreen({Key key}) : super(key: key);

  @override
  _FindScreenState createState() => _FindScreenState();
}

class _FindScreenState extends State<FindScreen> {
  List<Article> _dataList = [];

  @override
  void initState() {
    super.initState();
    getDataList();
  }

  getDataList() {
    setState(() {
      _dataList = Article.resolveDataList("""
        {
          "list":[
            {
              "title":"恭喜王路飞同学获得一个勋章",
              "img":"http://cdn.guanaitong.com/s2/geidao/img/medal.jpg",
              "name":"路飞",
              "count":"1123"
            },
            {
              "title":"恭喜王路飞同学获得一个勋章",
              "img":"http://cdn.guanaitong.com/s2/geidao/img/medal.jpg",
              "name":"路飞",
              "count":"12312"
            }
          ]
        }
      """);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('发现')),
        body: ListView.builder(
            itemCount: _dataList.length,
            itemBuilder: (context, index) {
              var model = _dataList[index];
              return ArticleItem(model);
            }));
  }
}
