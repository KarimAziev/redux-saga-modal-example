import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showModal } from 'redux-saga-modal';
import { ConfirmModal, CancelModal } from './modals';
import MODAL_TYPES from './modalTypes';
import { Layout, Icon, Col, Menu, Row } from 'antd';
import { Table } from './page';
import * as routines from './routines';

const App = (props) => {
  const { removeUserTrigger } = props;
  return (
    <Layout>
      <Layout.Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className='logo' />
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['4']}>
          <Menu.Item
            key='1'
            onClick={() => props.showModal(MODAL_TYPES.CANCEL)}
          >
            <Icon type='user' />

            <span className='nav-text'>{MODAL_TYPES.CANCEL}</span>
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type='video-camera' />
            <span className='nav-text'>{MODAL_TYPES.CONFIRM}</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout.Content>
        <Row>
          <Col span={12} offset={5}>
            <Table onRemove={(item) => removeUserTrigger(item)} />
          </Col>
        </Row>
      </Layout.Content>

      <ConfirmModal />
      <CancelModal />
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showModal,
      removeUserTrigger: routines.removeUser.trigger,
    },
    dispatch
  );

export default connect(
  (state) => state,
  mapDispatchToProps
)(App);
