import 'dart:convert';
import 'package:fluters/manage/company.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ManageListProvider with ChangeNotifier {
  List<Company> _companyList = new List();
  int _currentPage = 1;
  int _showValue = 0;

  //获取list数据
  List<Company> get companyList => _companyList;

  //获取页数
  int get currentPage => _currentPage;

  //获取显示状态
  int get showValue => _showValue;

  set companyList(List<Company> companyList) {
    _companyList = companyList;
    //通知页面刷新
    notifyListeners();
  }

  int _type = 2;
  var url = 'http://m.app.haosou.com/index/getData?';

  //暗号：江湖再见
  getData(pageNumber, type) async {
    var httpURL = url + 'type=$_type&page=$pageNumber';
    var response = await http.get(httpURL);
    if (response.statusCode == 200) {
      var resultStr = response.body;
      var resultMap = json.decode(resultStr).cast<String, dynamic>();
      if (type) {
        _companyList = Company.fromMapData(resultMap);
        _currentPage = 2;
        _showValue = 1;
      } else {
        _companyList.addAll(Company.fromMapData(resultMap));
        _currentPage++;
      }
      notifyListeners();
      return true;
    }
    return false;
  }

  //加载网络数据
  refrshData() async {
    return await getData(1, true);
  }

  //加载更多
  loadMoreData() async {
    return await getData(_currentPage, false);
  }
}
