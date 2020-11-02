import 'package:fluters/details/DetailsScreen.dart';
import 'package:fluters/manage/CompanyItem.dart';
import 'package:fluters/provider/company_list.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class ManageScreen extends StatefulWidget {
  ManageScreen({Key key}) : super(key: key);

  @override
  _ManageScreenState createState() => _ManageScreenState();
}

class _ManageScreenState extends State<ManageScreen> {
  RefreshController _refreshController =
      RefreshController(initialRefresh: false);

  @override
  void initState() {
    super.initState();
    ManageListProvider provider =
        Provider.of<ManageListProvider>(context, listen: false);
    provider.refrshData();
  }

  Widget _buildList() {
    return Consumer<ManageListProvider>(builder: (context, provider, _) {
      return IndexedStack(
        index: provider.showValue,
        children: [
          Center(
            child: CircularProgressIndicator(),
          ),
          SmartRefresher(
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
                idleText: '加载更多数据',
                loadingText: '玩命加载中...',
                noDataText: '没有更多数据'),
            onRefresh: _onRefresh,
            onLoading: _onLoading,
            child: ListView.builder(
              itemBuilder: (context, index) {
                var model = provider.companyList[index];
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
              itemCount: provider.companyList.length,
            ),
          )
        ],
      );
    });
  }

  //暗号：江湖再见见
  void _onRefresh() async {
    ManageListProvider provider =
        Provider.of<ManageListProvider>(context, listen: false);
    bool isScucess = await provider.refrshData();
    if (isScucess) {
      _refreshController.refreshCompleted();
    } else {
      _refreshController.refreshFailed();
    }
  }

  void _onLoading() async {
    ManageListProvider provider =
        Provider.of<ManageListProvider>(context, listen: false);
    bool isScucess = await provider.loadMoreData();
    if (isScucess) {
      _refreshController.loadComplete();
    } else {
      _refreshController.loadFailed();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(title: Text('江湖再见')), body: _buildList());
  }
}
