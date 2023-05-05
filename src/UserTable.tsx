import * as React from 'react';
import { ActionButton } from './ActionButton';
import { useAppSelector, useAppDispatch } from './hooks';
import { makeTable, TableConfig } from './table';
import {
  User,
  usersLoadingSelector,
  loadData,
  usersSelector,
  removeUser,
} from './users';

export const config: TableConfig<User, 'id' | 'name'> = {
  name: { title: 'Name' },
  id: {
    title: 'Action',
    render: (value) => (
      <ActionButton
        className={'action'}
        action={removeUser.trigger.bind(null, value)}
      >
        Delete
      </ActionButton>
    ),
  },
};

const Table = makeTable<User, typeof config>(config);

export const UsersTable = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => usersSelector(state));
  const loading = useAppSelector((state) => usersLoadingSelector(state));
  const loadingIds = useAppSelector((state) => state.users.loadingIds);

  React.useEffect(() => {
    if (!loading && data.length <= 0) {
      dispatch(loadData.trigger());
    }
  }, [dispatch, loading, data]);

  return (
    <Table
      rows={data}
      loading={loading}
      loadingIds={loadingIds}
      idAttr={'id'}
    />
  );
};
