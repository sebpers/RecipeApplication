const CardMenuComponent = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) => {
  return (
    <div className="absolute top-0 right-0 mt-2 mr-2 bg-white border shadow-lg rounded-lg w-40">
      <ul>
        <li>
          <button
            onClick={onEdit}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Edit
          </button>
        </li>
        <li>
          <button
            onClick={onDelete}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CardMenuComponent;
