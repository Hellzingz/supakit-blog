const ConfirmModal = ({
  title,
  description,
  onCancel,
  onConfirm,
}) => {


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{description}</p>
        <div className="flex justify-end">
          <div className="flex gap-2">
            <button
              className="bg-green-700 text-white px-4 py-2 rounded-lg"
              onClick={() => onConfirm()}
            >
              Confirm
            </button>

            <button
              className="bg-red-400 text-white px-4 py-2 rounded-lg"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConfirmModal;
