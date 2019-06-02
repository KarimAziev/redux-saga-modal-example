import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from './Modal';
import { routines, usersSelector } from './users';
import Table from 'rc-table';
import Animate from 'rc-animate';
import 'rc-table/assets/index.css';
import 'rc-table/assets/animation.css';
import './index.css';

const AnimateBody = (props) => (
  <Animate transitionName={'move'} component={'tbody'} {...props} />
);

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
      <Table
        data={users}
        columns={columns}
        components={{
          body: { wrapper: AnimateBody },
        }}
      />
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
