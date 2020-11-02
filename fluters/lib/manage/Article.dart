import 'dart:convert';

class Article {
  final String address;
  final String img;
  final String type;
  final String assets;
  final String scale;
  final String info;

  //构造函数
  Article({
    this.address,
    this.img,
    this.type,
    this.assets,
    this.scale,
    this.info,
  });

  //string -> List<Article>
  static List<Article> resolveDataList(String json) {
    List<Article> listModel = new List<Article>();
    List list = jsonDecode(json)['list'];
    list.forEach((element) {
      var model = new Article(
        address: element['address'],
        img: element['img'],
        type: element['type'],
        assets: element['assets'],
        scale: element['scale'],
        info: element['info'],
      );

      listModel.add(model);
    });

    return listModel;
  }
}
