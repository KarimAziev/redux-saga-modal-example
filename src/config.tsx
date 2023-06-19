import React from 'react';
import { ActionButton } from './ActionButton';
import { useAppSelector } from './hooks';
import { TableConfig } from './table';
import { User, removeUser } from './users';

const UserDeleteButton = React.memo(({ id }: { id: User['id'] }) => {
  const loading = useAppSelector((state) => !!state.loadingIds[id]);
  return (
    <ActionButton
      className={'action'}
      disabled={loading}
      action={removeUser.trigger(id)}
    >
      Delete
    </ActionButton>
  );
});

const UserTitle = React.memo(
  ({ name, id }: { name: User['name']; id: User['id'] }) => {
    const loading = useAppSelector((state) => !!state.loadingIds[id]);
    return <div className={loading ? 'removing' : ''}>{name}</div>;
  }
);

export const config: TableConfig<User> = {
  name: {
    title: 'Name',
    render: (value, _idx, row) => <UserTitle name={value} id={row.id} />,
  },
  id: {
    title: 'Action',
    render: (value) => <UserDeleteButton id={value} />,
  },
};
