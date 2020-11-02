import 'dart:convert';

class Article {
  final String title;
  final String img;
  final String name;
  final String count;

  //构造函数
  Article({
    this.title,
    this.img,
    this.name,
    this.count,
  });

  //string -> List<Article>
  static List<Article> resolveDataList(String json) {
    List<Article> listModel = new List<Article>();
    List list = jsonDecode(json)['list'];
    list.forEach((element) {
      var model = new Article(
        title: element['title'],
        img: element['img'],
        name: element['name'],
        count: element['count'],
      );

      listModel.add(model);
    });

    return listModel;
  }
}
