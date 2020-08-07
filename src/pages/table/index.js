import React from 'react';
import styles from './index.css';
import ProTable from '@ant-design/pro-table';
import { getTablelData } from '@/services/table';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];
export default () => {
  return (
    <div>
      <h1 className={styles.title}>Page table/index</h1>
      <ProTable
        rowKey="id"
        columns={columns}
        pagination={{
          current: 1,
          pageSize: 10,
        }}
        request={params => {
          return getTablelData(params);
        }}
      ></ProTable>
    </div>
  );
};
