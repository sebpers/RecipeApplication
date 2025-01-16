import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import RecipesList from "./components/recipes/RecipesList";
import HomePage from "./pages/HomePage";
import RecipeView from "./components/recipes/RecipeView";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/AccountPage";
import MyPage from "./pages/MyPage";
import AuthProvider from "./context/auth/AuthProvider";
import CreateRecipePage from "./pages/CreateRecipePage";
import AuthorListPage from "./pages/AuthorListPage";
import { validateUserToken } from "./services/AuthService";
import ProtectedRoute from "./helpers/protection/ProtectedRoute";
import FavoriteRecipesPage from "./pages/FavoriteRecipesPage";

function App() {
  const isAuthenticated = async (): Promise<boolean> => {
    const response = await validateUserToken();

    return response.status === 200;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<HomePage />} />
            <Route path="recipes" element={<RecipesList />} />
            <Route path="recipes/recipe/:id" element={<RecipeView />} />
            <Route path="login" element={<AuthPage />} />
            <Route path="register" element={<AuthPage />} />

            {/* Protected routes */}
            <Route
              path="my"
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route index element={<MyPage />} />
              <Route path="create-recipe" element={<CreateRecipePage />} />
              <Route
                path="favorite-recipes"
                element={<FavoriteRecipesPage />}
              />
            </Route>

            <Route path="author/:id" element={<AccountPage />} />
            <Route path="authors" element={<AuthorListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
