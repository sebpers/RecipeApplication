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
        className={`px-4 py-2 rounded-full focus:outline-none ${
          activeTab === tabValue
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        {tabValue} {count}
      </button>
    </>
  );
};

export default RecipeTabButtons;
