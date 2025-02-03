import { Pagination } from "flowbite-react";

interface PaginateProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginateComponent: React.FC<PaginateProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center space-x-5">
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons={true}
        />
      </div>
    </div>
  );
};

export default PaginateComponent;
