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

//查询
const sql = 'select * from t_user where id=2';
conn.query(sql, (err, rows, fields) => {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  console.log('查询id=2数据是: ', rows);
});

//插入
conn.query('select * from t_user', (err, rows) => {
  if (err) {
    console.log('[query] - :' + err);
    return;
  }
  const newId = rows.pop().id + 1;
  conn.query('INSERT INTO t_user SET  ?', { id: newId, name: 'node add' }, (err, data) => {
    if (err) {
      console.log('[query] - :' + err);
      return;
    }
    console.log('插入数据成功');
    conn.end();
  });
});