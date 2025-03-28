type DescriptionTypeProp = {
  setOriginalDescription: (description: string) => void;
  setShowDescriptionDialog: (val: boolean) => void;
  description: string;
};

const DescriptionComponent = ({
  setOriginalDescription,
  setShowDescriptionDialog,
  description,
}: DescriptionTypeProp) => {
  const hasDescription: string = description;
  const blueButton: string = "btn-blue btn-blue-sm:hover";
  const greenButton: string = "btn-green btn-green-sm:hover";

  return (
    <>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            setOriginalDescription(description); // Save the current value
            setShowDescriptionDialog(true);
          }}
          className={`text-sm mb-3 ${
            hasDescription.length ? `${blueButton}` : `${greenButton}`
          }`}
        >
          {description ? "Edit" : "Add Story"}
        </button>
      </div>

      <p>{description}</p>
    </>
  );
};

export default DescriptionComponent;
