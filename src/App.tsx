import { useEffect, memo } from 'react';
import { ConnectedConfirmModal } from './Modal';
import {
  usersSelector,
  loadData,
  User,
  removeUser,
  usersLoadingSelector,
} from './users';
import { useAppDispatch, useAppSelector } from './hooks';
import { Preloader } from './Preloader';
import './index.css';

const UsersTable = memo(() => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => usersSelector(state));
  const loading = useAppSelector((state) => usersLoadingSelector(state));

  useEffect(() => {
    dispatch(loadData.trigger());
  }, []);

  const handleDeleteUser = (id: string) => {
    dispatch(removeUser.trigger(id));
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name' as 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age' as 'age',
    },
    {
      title: 'Action',
      dataIndex: 'id' as 'id',
      render: (record: User) => (
        <span>
          <button
            className={'action'}
            onClick={() => handleDeleteUser(record.id)}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  return (
    <div>
      {loading && <Preloader />}
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.dataIndex}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user.id.toString()}>
                {columns.map((col) => (
                  <td key={`${col.dataIndex}-${user.id}`}>
                    {col.render ? col.render(user) : user[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
});

const App = memo(() => (
  <div>
    <UsersTable />
    <ConnectedConfirmModal />
  </div>
));

export default App;
