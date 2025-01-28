interface searchComponentInterfaceProp {
  placeholder?: string;
  classes?: string;
  search: string;
  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const SearchComponent = (prop: searchComponentInterfaceProp) => {
  const { placeholder, classes, search, handleSearchChange } = prop;
  const placeholderText = placeholder ? placeholder : "Search";
  const searchTerm = search ? search : "";

  return (
    <input
      className={`w-full md:w-2/4 flex justify-center ${classes}`}
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder={placeholderText}
    />
  );
};

export default SearchComponent;
