import { useEffect, useMemo, useState } from "react";
import { getQueryUsersParam } from "../services/UserService";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import SearchComponent from "../components/common/search/SearchComponent";
import { queryUserWithRoles } from "../interfaces/query/userQueries";
import useAuth from "../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<queryUserWithRoles[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("firstName");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [search, setSearch] = useState<string>("");

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Conditional styling for rows
  const conditionalRowStyles = [
    {
      when: (row: queryUserWithRoles) => row.id === user?.id,
      style: {
        backgroundColor: "#a0ebfd",
        fontWeight: "bold",
      },
    },
    {
      when: (row: queryUserWithRoles) => row.roles.includes("Author"),
      style: {
        backgroundColor: "#fdfdea",
      },
    },
    {
      when: (row: queryUserWithRoles) =>
        row.roles.includes("Admin") && row.id !== user?.id,
      style: {
        backgroundColor: "#ebf5ff",
      },
    },
    {
      when: (row: queryUserWithRoles) => !row.roles?.length,
      style: {
        backgroundColor: "#ffebee",
      },
    },
  ];

  const navigate = useNavigate();

  const handleRowClick = (row) => {
    if (row.roles.includes("Author")) {
      navigate(`/author/${row.id}`);
    }

    if (row.id === user?.id) {
      navigate("/my");
    }
  };

  const columns = useMemo(
    () => [
      {
        name: "#Id",
        selector: (row: queryUserWithRoles) => row?.id || "N/A",
        sortable: true,
      },
      {
        name: "First name",
        selector: (row: queryUserWithRoles) => row?.firstName || "N/A",
        sortable: true,
      },
      {
        name: "Last name",
        selector: (row: queryUserWithRoles) => row?.lastName || "N/A",
        sortable: true,
      },
      {
        name: "Roles",
        selector: (row: queryUserWithRoles) => row?.roles.join(", ") || "N/A",
        sortable: true,
      },
      {
        name: "Email",
        selector: (row: queryUserWithRoles) => row?.email || "N/A",
        sortable: true,
      },
      {
        name: "Created at",
        selector: (row: queryUserWithRoles) =>
          row?.createdAt
            ? format(new Date(row.createdAt), "yyyy-MM-dd HH:mm:ss")
            : "N/A",
        sortable: true,
      },
    ],
    []
  );

  // Handle sorting
  const handleSort = async (column: any, sortDirection: string) => {
    const { name } = column;
    setSortBy(name);
    setSortOrder(sortDirection);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  // Handle page size change
  const handlePerPageChange = (newPerPage: number, page: number) => {
    setPageSize(newPerPage);
    setPageNumber(page);
  };

  // Fetch users from the API
  const fetchUsers = async (
    page: number,
    pageSize: number,
    sortBy: string,
    sortOrder: string,
    search: string
  ) => {
    setLoading(true);

    const fetchedData = await getQueryUsersParam({
      pageNumber: page,
      pageSize: pageSize,
      sortBy: sortBy,
      sortOrder: sortOrder,
      search: search,
    });

    setUsers(fetchedData.items);
    setTotalRows(fetchedData.totalCount);
    setLoading(false);
  };

  // Handle search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    // Clear previous timeout if it exists
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Prevent database from being hit too often
    const timeout = setTimeout(() => {
      fetchUsers(1, pageSize, sortBy, sortOrder, event.target.value);
    }, 500);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    fetchUsers(pageNumber, pageSize, sortBy, sortOrder, search);
  }, [pageNumber, pageSize, sortBy, sortOrder]);

  return (
    <>
      <div className="mt-5">
        <SearchComponent
          search={search}
          handleSearchChange={handleSearchChange}
          placeholder="Filter..."
        />
      </div>

      <div className="space-x-2 mt-5">
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/10 ring-inset">
          No role
        </span>
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
          Visitor
        </span>
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
          Author
        </span>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
          Admin
        </span>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          title="Users in database"
          columns={columns}
          data={users}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerPageChange}
          sortServer
          onSort={handleSort}
          progressPending={loading}
          conditionalRowStyles={conditionalRowStyles}
          responsive
          aria-label="User data table"
          noDataComponent="No users found"
          onRowClicked={handleRowClick} // Handle row clicks
          highlightOnHover // Optional: Highlight row on hover for better UX
          pointerOnHover // Optional: Change cursor to pointer on hover
        />
      </div>
    </>
  );
};

export default DashboardUsers;
