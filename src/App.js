import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showModal } from 'redux-saga-modal';
import { ConfirmModal, CancelModal } from './modals';
import { MODAL_TYPES } from './saga';
import { Layout, Icon, Col, Menu, Row } from 'antd';
import { Table } from './page';

const App = (props) => {
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
            <Table
              onRemove={(item) =>
                props.showModal(MODAL_TYPES.CONFIRM, item)
              }
            />
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
    },
    dispatch
  );

export default connect(
  (state) => state,
  mapDispatchToProps
)(App);
