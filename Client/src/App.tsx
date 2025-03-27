import { Route, Routes } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import RecipesList from "./components/recipes/RecipesList";
import HomePage from "./pages/HomePage";
import RecipeView from "./components/recipes/RecipeView";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/AccountPage";
import MyPage from "./pages/MyPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import AuthorListPage from "./pages/AuthorListPage";
import { getMe, validateUserToken } from "./services/AuthService";
import ProtectedRoute from "./helpers/protection/ProtectedRoute";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardUsers from "./pages/DashboardUsers";
import { DashboardStatisticUsersPage } from "./pages/DashboardStatisticUsersPage";
import FavoriteAuthorsPage from "./pages/FavoriteAuthorsPage";

function App() {
  const isAuthenticated = async (): Promise<boolean> => {
    const response = await validateUserToken();

    return response.status === 200;
  };

  const isAdmin = async (): Promise<boolean> => {
    const response = await getMe();

    return (await isAuthenticated()) && response.data?.roles?.includes("Admin");
  };

  const isAdminOrAuthor = async (): Promise<boolean> => {
    const response = await getMe();

    return (
      (await isAuthenticated()) &&
      (response.data?.roles?.includes("Author") ||
        response.data?.roles?.includes("Admin"))
    );
  };

  const isLoggedIn = async (): Promise<boolean> => {
    return await isAuthenticated();
  };

  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<AuthPage />} />
        <Route path="register" element={<AuthPage />} />
        <Route path="recipes" element={<RecipesList />} />
        <Route path="recipes/recipe/:id" element={<RecipeView />} />
        <Route path="author/:id" element={<AccountPage />} />
        <Route path="authors" element={<AuthorListPage />} />

        {/* Protected routes */}
        <Route
          path="my"
          element={<ProtectedRoute isAuthenticated={isLoggedIn} />}
        >
          <Route index element={<MyPage />} />
          {/* Only allow admin or author to enter create-recipe route */}
          <Route
            path=""
            element={<ProtectedRoute isAuthenticated={isAdminOrAuthor} />}
          >
            <Route path="create-recipe" element={<CreateRecipePage />} />
          </Route>
          {/*END */}
          <Route
            path="favorite-recipes"
            element={<FavoriteRecipesPage />}
          />{" "}
          <Route path="favorite-authors" element={<FavoriteAuthorsPage />} />{" "}
        </Route>

        {/* Protected routes */}
        <Route
          path="dashboard"
          element={<ProtectedRoute isAuthenticated={isAdmin} />}
        >
          <Route element={<DashboardPage />}>
            <Route path="users" index element={<DashboardUsers />} />
            <Route
              path="statistics/users"
              element={<DashboardStatisticUsersPage />}
            />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
