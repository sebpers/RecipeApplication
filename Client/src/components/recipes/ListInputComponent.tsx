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

  const [listItem, setListItem] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleListItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListItem(e.target.value);
    if (error) setError(null);
  };

  const addListItem = () => {
    if (listItem.trim() === "") {
      setError(`Please enter ${labelName.toLowerCase()}.`);
      return;
    }

    const updatedList: string[] = [...listItems, listItem];

    onListChange(fieldName, updatedList);
    setListItem("");
    setError(null);
  };

  const handleDelete = (index: number) => {
    const updatedList: string[] = listItems.filter((_, i) => i !== index);

    onListChange(fieldName, updatedList);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setListItem(listItems[index]);
  };

  const handleSave = () => {
    if (listItem.trim() === "") {
      setError(`Please enter ${labelName.toLowerCase()}.`);
      return;
    }

    const updatedList: string[] = listItems.map((item, index) =>
      index === editingIndex ? listItem : item
    );

    onListChange(fieldName, updatedList);
    setEditingIndex(null);
    setListItem("");
    setError(null);
  };

  // Prevent form submission on Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addListItem();
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
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={addListItem}
          >
            Add
          </button>
        ) : (
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded"
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
