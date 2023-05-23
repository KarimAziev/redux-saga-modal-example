import { memo } from 'react';
import { ConnectedConfirmModal } from './Modal';
import { UsersTable } from './UserTable';
import './index.css';

const App = memo(() => (
  <>
    <div className='wrapper'>
      <UsersTable />
    </div>
    <ConnectedConfirmModal />
  </>
));

export default App;
