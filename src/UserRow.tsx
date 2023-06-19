import { PropsWithChildren } from 'react';
import { User } from './users';
import { useAppSelector } from './hooks';
import { modal } from './Modal';

export const UserRow = ({
  children,
  id,
}: PropsWithChildren<{ id: User['id'] }>) => {
  const loading = useAppSelector((state) => state.loadingIds[id]);

  const isUserOpen = useAppSelector((state) => {
    const isCurrentUserOpen =
      modal.selector<{ id: User['id'] }>(state)?.props?.id === id;
    return isCurrentUserOpen;
  });

  const className = [
    'row',
    loading ? 'loading' : undefined,
    isUserOpen && 'open',
  ]
    .filter((s) => !!s)
    .join(' ');

  return <tr className={className}>{children}</tr>;
};
