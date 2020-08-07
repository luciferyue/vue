const total = 201;
function searchTableData({ name = '', age = '', city = '', ...pagination }) {
  const res = [];
  let i = 0;
  console.log(pagination);
  while (i < pagination.pageSize) {
    const realIndex = i + (pagination.current - 1) * pagination.pageSize;
    if (realIndex >= total) {
      break;
    }
    const tem = {
      id: realIndex,
      name: '名字' + realIndex,
      age: i,
      city: '城市' + realIndex,
    };
    //根据条件筛选
    if (
      tem.name.indexOf(name) > -1 &&
      tem.name.indexOf(age) > -1 &&
      tem.name.indexOf(city) > -1
    ) {
      res.push(tem);
    }
    i++;
  }

  return { data: res, ...pagination, total };
}
export default {
  'POST /api/getTableData': (req, res) => {
    res.send({
      status: 'ok',
      ...searchTableData(req.body),
    });
  },
};
