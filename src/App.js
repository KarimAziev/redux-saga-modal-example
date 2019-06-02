import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from './Modal';
import Table from 'rc-table';
import { routines, usersSelector } from './users';
import './index.css';

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
        <span>
          <button
            className={'action'}
            onClick={() => removeUser(record.key)}>
            Delete
          </button>
        </span>
      ),
    },
  ];

  return (
    <section>
      <Table data={users} columns={columns} />
      <Modal />
    </section>
  );
};

export default connect(
  (state) => ({
    users: usersSelector(state),
  }),
  (dispatch) => bindActionCreators(routines, dispatch)
)(App);
