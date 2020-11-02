import 'package:flutter/material.dart';

class GirdeView extends StatelessWidget {
  List<String> items = List.generate(50, (index) => "item $index");

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('网格布局-GirdeView')), body: getGirdeView3());
  }

  getGirdeView1() {
    return GridView.count(
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 10),
      crossAxisCount: 2,
      crossAxisSpacing: 10,
      mainAxisSpacing: 10,
      childAspectRatio: 0.5,
      children: items.map((item) => getItemContainer(item)).toList(),
    );
  }

  getGirdeView2() {
    return GridView.builder(
      itemCount: items.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 3,
        crossAxisSpacing: 10,
        mainAxisSpacing: 10,
        childAspectRatio: 0.5,
      ),
      itemBuilder: (context, index) {
        return getItemContainer(items[index]);
      },
    );
  }

  getGirdeView3() {
    return GridView.builder(
      itemCount: items.length,
      gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 100, crossAxisSpacing: 20, mainAxisSpacing: 10),
      itemBuilder: (context, index) {
        return getItemContainer(items[index]);
      },
    );
  }

  Widget getItemContainer(String item) {
    return Container(
      alignment: Alignment.center,
      color: Colors.blue,
      child: Text(
        item,
        style: TextStyle(color: Colors.white, fontSize: 20),
      ),
    );
  }
}
