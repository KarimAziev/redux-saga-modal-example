import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ConfirmModal from './ConfirmModal';
import { Layout, Col, Row, Divider, Table, Spin } from 'antd';
import { routines, usersSelector } from './users';

const App = ({ users, removeUser }) => {
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Spin spinning={!!record.loading} key={record.key}>
          <span>
            <Divider type={'vertical'} />
            <a onClick={() => removeUser(record.key)}>Delete</a>
          </span>
        </Spin>
      ),
    },
  ];

  return (
    <Layout>
      <Row>
        <Col span={12}>
          <Table dataSource={users} columns={columns} />
        </Col>
      </Row>

      <ConfirmModal />
    </Layout>
  );
};

export default connect(
  (state) => ({
    users: usersSelector(state),
  }),
  (dispatch) => bindActionCreators(routines, dispatch)
)(App);
