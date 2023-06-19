import * as React from 'react';
import { config } from './config';
import { useAppDispatch, useAppSelector } from './hooks';
import { makeTable } from './table';
import { User, loadData, usersLoadingSelector, usersSelector } from './users';
import { UserRow } from './UserRow';

const Table = makeTable<User, typeof config>(config, {
  components: { tr: UserRow },
});

export const UsersTable = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => usersSelector(state));
  const loading = useAppSelector((state) => usersLoadingSelector(state));

  React.useEffect(() => {
    if (!loading && data.length <= 0) {
      dispatch(loadData.trigger());
    }
  }, [dispatch, loading, data]);

  return <Table rows={data} loading={loading} idAttr={'id'} />;
};
