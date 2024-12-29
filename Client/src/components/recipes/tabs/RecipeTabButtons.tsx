interface RecipeTabButtonProp {
  activeTab: string;
  tabValue: string;
  count?: string;
  onSetActiveTab(tab: string): void;
}

const RecipeTabButtons = (props: RecipeTabButtonProp) => {
  const { activeTab, tabValue, count, onSetActiveTab } = props;

  return (
    <>
      <button
        onClick={() => onSetActiveTab(tabValue)}
        className={`rounded-full focus:outline-none transition-colors duration-300
    px-2 py-1 text-sm sm:px-3 sm:py-1 sm:text-base
    ${
      activeTab === tabValue
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }
  `}
      >
        {tabValue} {count}
      </button>
    </>
  );
};

export default RecipeTabButtons;
