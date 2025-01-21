type typeProp = {
  text?: string;
  onClickFunc?: () => void;
};

const SubmitButtonComponent = (props: typeProp) => {
  const { text, onClickFunc } = props;

  const defaultText = text ? text : "Submit";

  return (
    <button
      type="submit"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded"
      title="Submit"
      onClick={onClickFunc}
    >
      {defaultText}
    </button>
  );
};

export default SubmitButtonComponent;
