import React, { useState } from "react";

interface ListInputComponentProps {
  labelName: string;
  fieldName: "ingredients" | "instructions"; // To differentiate between lists
  listItems: string[];
  onListChange: (
    fieldName: "ingredients" | "instructions",
    updatedList: string[]
  ) => void;
}

const ListInputComponent = (props: ListInputComponentProps) => {
  const { labelName, fieldName, listItems, onListChange } = props;

  const [listItem, setListItem] = useState<string>(""); // Track the current input
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track the index of the item being edited
  const [error, setError] = useState<string | null>(null); // Track validation error

  const handleListItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListItem(e.target.value);
    if (error) setError(null); // Clear validation error on input change
  };

  const addListItem = () => {
    if (listItem.trim() === "") {
      setError(`Please enter a ${labelName.toLowerCase()}.`);
      return;
    }
    const updatedList = [...listItems, listItem];
    onListChange(fieldName, updatedList); // Notify parent
    setListItem(""); // Clear input field
    setError(null); // Clear validation error
  };

  const handleDelete = (index: number) => {
    const updatedList = listItems.filter((_, i) => i !== index);
    onListChange(fieldName, updatedList); // Notify parent
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setListItem(listItems[index]);
  };

  const handleSave = () => {
    if (listItem.trim() === "") {
      setError(`Please enter a ${labelName.toLowerCase()}.`);
      return;
    }
    const updatedList = listItems.map((item, index) =>
      index === editingIndex ? listItem : item
    );
    onListChange(fieldName, updatedList); // Notify parent
    setEditingIndex(null); // Exit edit mode
    setListItem(""); // Clear input
    setError(null); // Clear validation error
  };

  // Prevent form submission on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission when Enter is pressed
      addListItem(); // Add the item to the list
    }
  };

  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {labelName}
      </label>
      <div className="flex space-x-2 mb-5">
        <input
          type="text"
          value={listItem}
          onChange={handleListItemChange}
          onKeyDown={handleKeyDown} // Prevent Enter key from submitting the form
          placeholder={`Add ${labelName}...`}
          className={`px-3 py-2 border w-full ${
            error ? "border-red-500" : "border-gray-300"
          } rounded`}
        />
        {editingIndex === null ? (
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={addListItem}
          >
            Add
          </button>
        ) : (
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {listItems.length > 0 && (
        <ul className="list-disc mt-2 p-5 shadow-lg border border-2">
          {listItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{item}</span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListInputComponent;
