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
    <div className="flex items-center md:justify-between border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-center md:space-x-5">
        <p className="text-sm text-gray-700 text-center">
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
