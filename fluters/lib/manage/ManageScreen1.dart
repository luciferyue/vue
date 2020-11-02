import 'package:fluters/manage/Article.dart';
import 'package:fluters/manage/ArticleItem.dart';
import 'package:flutter/material.dart';

class ManageScreen extends StatefulWidget {
  ManageScreen({Key key}) : super(key: key);

  @override
  _ManageScreenState createState() => _ManageScreenState();
}

class _ManageScreenState extends State<ManageScreen> {
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
              "address":"暗号：不⽤背，学规律",
              "img":"http://cdn.guanaitong.com/s2/geidao/img/medal.jpg",
              "type":"| 互联网",
              "assets":"| B轮融资",
              "scale":"| 10000人以上",
              "info":"热招：前端架构师等 300个职位"
            },
            {
              "address":"上海浦东新区",
              "img":"http://cdn.guanaitong.com/s2/geidao/img/medal.jpg",
              "type":"| 互联网",
              "assets":"| B轮融资",
              "scale":"| 10000人以上",
              "info":"热招：前端架构师等 300个职位"
            }
          ]
        }
      """);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('文章列表')),
        body: ListView.builder(
            itemCount: _dataList.length,
            itemBuilder: (context, index) {
              var model = _dataList[index];
              return ArticleItem(model);
            }));
  }
}
