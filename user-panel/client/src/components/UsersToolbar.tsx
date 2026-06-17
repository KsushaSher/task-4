import { FaTrash, FaUnlock, FaUserSlash } from 'react-icons/fa';

interface Props {
  selectedCount: number;
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
  onDeleteUnverified: () => void;
}

export default function UsersToolbar({
  selectedCount,
  onBlock,
  onUnblock,
  onDelete,
  onDeleteUnverified,
}: Props) {
  const disabled = selectedCount === 0;

  return (
    <div className="btn-toolbar mb-3 gap-2">
      <button className="btn btn-warning" disabled={disabled} onClick={onBlock}>
        Block
      </button>

      <button
        className="btn btn-success"
        disabled={disabled}
        onClick={onUnblock}
        title="Unblock selected users"
      >
        <FaUnlock />
      </button>

      <button
        className="btn btn-danger"
        disabled={disabled}
        onClick={onDelete}
        title="Delete selected users"
      >
        <FaTrash />
      </button>

      <button
        className="btn btn-secondary"
        onClick={onDeleteUnverified}
        title="Delete all unverified users"
      >
        <FaUserSlash />
      </button>
    </div>
  );
}
