import { useCallback } from 'react';
import { AnyAction } from 'redux';
import { useAppDispatch } from './hooks';

interface ActionCreator {
  (...args: any): AnyAction;
}
export interface ActionProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onClick'
  > {
  action: AnyAction | ActionCreator;
}

export const ActionButton: React.FC<ActionProps> = ({
  action,
  children,
  ...rest
}) => {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(
    () => dispatch(typeof action === 'function' ? action(rest) : action),
    [dispatch, action, rest]
  );

  return (
    <button style={{ fontSize: 'inherit' }} {...rest} onClick={handleClick}>
      {children}
    </button>
  );
};
