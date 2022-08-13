import { memo } from 'react';
import ReactModal from 'react-modal';
import { AnyAction } from 'redux';
import {
  createModal,
  sagaModal,
  SagaModalInjectedProps,
} from 'redux-saga-modal';
import { useAppDispatch, useAppSelector } from './hooks';

ReactModal.setAppElement('#root');

export interface InspectModalProps {
  action: AnyAction;
}

const ObjectItem = ({ payload }: { payload: unknown }) => (
  <>
    {Array.isArray(payload) ? (
      <span>
        {payload.map((val, key) => (
          <i key={key.toString()}>
            <ObjectItem payload={val} />
            &nbsp;
          </i>
        ))}
      </span>
    ) : typeof payload === 'object' ? (
      Object.entries(payload as object).map(([key, val]) => (
        <span key={key}>
          <b>{key}:</b>
          &nbsp;
          <i>{<ObjectItem payload={val} />}</i>
          &nbsp;
        </span>
      ))
    ) : (
      payload
    )}
  </>
);

const ModalTable: React.FC<InspectModalProps & SagaModalInjectedProps> = ({
  isOpen,
  action,
  hide,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={hide}
      closeTimeoutMS={500}
      className={'modal'}
    >
      <h3> {action.type}</h3>
      <h3> Meta </h3>
      <p>
        <ObjectItem payload={action.meta} />
      </p>
      <h3> Payload </h3>
      {typeof action.payload === 'object' ? (
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(action.payload).map(([key, val]) => (
              <tr>
                <td>{key}: </td>
                <td>
                  <ObjectItem payload={val} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        action.payload
      )}
    </ReactModal>
  );
};

export const inspectModal = createModal('inspect');

export const InspectModal = sagaModal({
  name: inspectModal.name,
})(ModalTable);

interface RowProps {
  idx: number;
}
const Row = ({ idx }: RowProps) => {
  const dispatch = useAppDispatch();
  const action = useAppSelector((state) => state.actions[idx]);
  const { type, meta } = action;

  const handleToggle = () => {
    dispatch(inspectModal.actions.show({ action }));
  };
  return (
    <tr key={idx.toString()} onClick={handleToggle}>
      <td>{type}</td>
      <td>{typeof action.payload}</td>
      <td>
        <ObjectItem payload={meta} />
      </td>
    </tr>
  );
};

const Monitor = memo(() => {
  const actionsLen = useAppSelector((state) => state.actions.length);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th rowSpan={2}>Payload</th>
            <th>Meta</th>
          </tr>
        </thead>
        <tbody>
          {new Array(actionsLen).fill(actionsLen).map((_a, idx) => (
            <Row key={`row-${idx}`} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default Monitor;
