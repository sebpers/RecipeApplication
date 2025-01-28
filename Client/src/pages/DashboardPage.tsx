import { useState, useRef, useEffect } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiOutlineBookOpen,
  HiOutlineChartSquareBar,
  HiOutlineUsers,
} from "react-icons/hi";
import { Link, Outlet } from "react-router-dom";
import { useRoleGuard } from "../hooks/auth/useRoleGuard";

const DashboardPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const sidebarRef = useRef(null);

  useRoleGuard(["Admin"]);

  const toggleSidebar = () => {
    setShowBurger(!showBurger);
    setSidebarOpen((prev) => !prev);
  };

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        !event.target.closest("button")
      ) {
        setShowBurger(true);
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex container md:shadow-lg">
      {/* Hamburger Menu Button (Visible on small screens) */}
      {showBurger && (
        <button
          onClick={toggleSidebar}
          className="sm:hidden p-2 m-2 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-white dark:focus:ring-gray-600 absolute top-2 left-2 border border-1 z-50"
        >
          <span className="sr-only">Open Sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      )}

      {/* Sidebar (Visible on large screens or when toggled on small screens) */}
      <div
        ref={sidebarRef}
        className={`transition-all duration-300 ease-in-out fixed sm:relative md:top-0 top-20 left-0 z-40 w-64 h-full bg-gray-50 dark:bg-gray-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`} // Translate offscreen in mobile, on screen when open
      >
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>

              <Link to="users">
                <Sidebar.Item icon={HiOutlineUsers}>Users</Sidebar.Item>
              </Link>

              {/* Statistic Collapse Section */}
              <Sidebar.Collapse
                icon={HiOutlineChartSquareBar}
                label="Statistic"
              >
                <Link to="statistics/users">
                  <Sidebar.Item>Users</Sidebar.Item>
                </Link>
                <Link to="recipes">
                  <Sidebar.Item>Recipes</Sidebar.Item>
                </Link>
                <Link to="roles">
                  <Sidebar.Item>Roles</Sidebar.Item>
                </Link>
                <Link to="comments">
                  <Sidebar.Item>Comments</Sidebar.Item>
                </Link>
              </Sidebar.Collapse>

              <Link to="recipes">
                <Sidebar.Item icon={HiOutlineBookOpen}>Recipes</Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Main content */}
      <div
        className={`overflow-x-auto transition-all duration-300 ease-in-out flex-1 ${
          isSidebarOpen ? "ml-0 sm:ml-64" : "ml-0"
        }`} // Ensure main content is taking available space
      >
        <div className="md:p-4 flex flex-col justify-center">
          <h1 className="text-2xl mx-auto">Dashboard Content</h1>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
