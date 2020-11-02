import 'package:fluters/find/Article.dart';
import 'package:flutter/material.dart';

class ArticleItem extends StatelessWidget {
  final Article model;

  ArticleItem(this.model);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 150,
      padding: EdgeInsets.all(5),
      child: Card(
        elevation: 10,
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              new Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    model.title,
                    style: TextStyle(fontSize: 20, color: Colors.black),
                  ),
                  Row(
                    children: <Widget>[
                      Text(
                        model.name,
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                      SizedBox(width: 10),
                      Icon(Icons.local_florist, size: 18, color: Colors.grey),
                      Text(
                        model.count,
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                    ],
                  )
                ],
              ),
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(8),
                    image: DecorationImage(
                        image: NetworkImage(model.img), fit: BoxFit.cover)),
              )
            ],
          ),
        ),
      ),
    );
  }
}
