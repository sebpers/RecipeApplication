interface SecondaryButtonProp {
  text?: string;
  onClickFunc(): void;
}

const SecondaryButtonComponent = (props: SecondaryButtonProp) => {
  const { text, onClickFunc } = props;

  const defaultText = "Cancel";

  return (
    <button
      type="button"
      className="rounded bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={onClickFunc}
    >
      {text ? text : defaultText}
    </button>
  );
};

export default SecondaryButtonComponent;
