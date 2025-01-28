import { useEffect, useState } from "react";
import CustomPieChart from "../hooks/charts/CustomChartPie";
import { getUserStatistics } from "../services/UserService";
import CustomLineChart from "../hooks/charts/CustomLineChart";

export const DashboardStatisticUsersPage = () => {
  const [roles, setRoles] = useState([]);
  const [usersCreatedAt, setUsersCreatedAt] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUserStatistics();
      setRoles(result.roleDistribution);
      setUsersCreatedAt(result.userCreationTimeSpan);
    };

    fetchUsers();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-auto">
      <div className="lg:col-span-2 sm:col-span-2">
        <CustomPieChart data={roles} title="Roles" />
      </div>

      <div className="lg:col-span-2 sm:col-span-2">
        <CustomLineChart data={usersCreatedAt} />
      </div>
    </div>
  );
};
