import * as React from 'react';
import { Table, Divider } from 'antd';
import { connect } from 'react-redux';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
  },
];

const TableList = (props) => {
  const { onRemove } = props;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Divider type='vertical' />
          <a href='javascript:;' onClick={onRemove}>
            Delete
          </a>
        </span>
      ),
    },
  ];
  return <Table columns={columns} dataSource={data} />;
};

TableList.displayName = 'Table';

export default TableList;
