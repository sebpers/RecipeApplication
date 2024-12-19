interface RadioButtonsProp {
  options: string[];
  selectedValue: string;
  onChange(value: string): void;
}

const RadioButtonsComponent = ({
  options,
  selectedValue,
  onChange,
}: RadioButtonsProp) => {
  return (
    <div className="flex flex-col space-y-4">
      {options.map((option: string) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="radio"
            value={option}
            checked={selectedValue === option}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-gray-900">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonsComponent;
