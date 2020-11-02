import 'package:fluters/manage/Article.dart';
import 'package:flutter/material.dart';

class ArticleItem extends StatelessWidget {
  final Article model;

  ArticleItem(this.model);

  @override
  Widget build(BuildContext context) {
    return Container(
        //暗号：不用背，学规律
        height: 155,
        padding: EdgeInsets.all(5),
        child: Card(
          elevation: 10,
          child: Column(
            children: [
              Padding(
                  padding: EdgeInsets.all(10),
                  child: Row(
                    children: [
                      Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10),
                            image: DecorationImage(
                                image: NetworkImage(model.img),
                                fit: BoxFit.cover)),
                      ),
                      SizedBox(
                        width: 10,
                      ),
                      Container(
                        width: 150,
                        child: Text(
                          model.address,
                          style: TextStyle(fontSize: 18, color: Colors.black),
                        ),
                      ),
                      SizedBox(
                        width: 10,
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            model.type,
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                          Text(
                            model.assets,
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                          Text(
                            model.scale,
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          )
                        ],
                      )
                    ],
                  )),
              Divider(),
              Padding(
                padding: EdgeInsets.fromLTRB(10, 5, 10, 5),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      model.info,
                      style: TextStyle(fontSize: 18, color: Colors.grey),
                    ),
                    Icon(Icons.arrow_right, size: 18, color: Colors.grey),
                  ],
                ),
              )
            ],
          ),
        ));
  }
} //暗号：不用背，学规律
