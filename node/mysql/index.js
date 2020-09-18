const mysql = require('mysql');
const cfg = {
  host: 'localhost',
  user: 'root',
  password: "davy1101",
  database: "test"
}

const conn = mysql.createConnection(cfg);

conn.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log("连接成功!");
  }
});

function querySql(sql, value) {
  return new Promise((resolve, reject) => {
    conn.query(sql, value, (err, rows, fields) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(rows)
      }
    });
  })
}

/**
 * 查询数据
 */
// querySql('select * from t_user where id=2').then((data) => {
//   console.log('查询的数据是: ', data);
// })

//插入
// querySql('select * from t_user').then((data) => {
//   const newId = data.pop().id + 1;
//   querySql('INSERT INTO t_user SET  ?', { id: newId, name: 'node add' }).then((data) => {
//     console.log('插入数据成功', data);
//     conn.end();
//   })
// })

//更新某个值
// querySql('UPDATE t_user SET name=? where id=2', ['node change']).then((data) => {
//   console.log('数据修改', data);
//   conn.end();
// })

//删除最后一条
// querySql('select * from t_user').then((data) => {
//   const newId = data.pop().id;
//   querySql(`DELETE FROM t_user where id=${newId}`).then((data) => {
//     console.log('数据删除成功', data);
//   })
// })

//插入嵌套式
// conn.query('select * from t_user', (err, rows) => {
//   if (err) {
//     console.log('[query] - :' + err);
//     return;
//   }
//   const newId = rows.pop().id + 1;
//   conn.query('INSERT INTO t_user SET  ?', { id: newId, name: 'node add' }, (err, data) => {
//     if (err) {
//       console.log('[query] - :' + err);
//       return;
//     }
//     console.log('插入数据成功');
//     conn.end();
//   });
// });