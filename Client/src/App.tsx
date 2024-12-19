import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "./pages/LayoutPage";
import RecipesList from "./components/recipes/RecipesList";
import HomePage from "./pages/HomePage";
import RecipeView from "./components/recipes/RecipeView";
import AuthPage from "./pages/AuthPage";
import NotFoundPage from "./pages/NotFoundPage";
import RoleProvider from "./context/role/RoleProvider";
import AccountPage from "./pages/AccountPage";
import MyPage from "./pages/MyPage";
import AuthProvider from "./context/auth/AuthProvider";
import CreateRecipePage from "./pages/CreateRecipePage";
import AuthorListPage from "./pages/AuthorListPage";

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutPage />}>
              <Route index element={<HomePage />} />
              <Route path="recipes" element={<RecipesList />} />
              <Route path="recipes/recipe/:id" element={<RecipeView />} />
              <Route path="login" element={<AuthPage />} />
              <Route path="register" element={<AuthPage />} />
              <Route path="my" element={<MyPage />} />
              <Route path="my/create-recipe" element={<CreateRecipePage />} />
              <Route path="author/:id" element={<AccountPage />} />
              <Route path="authors" element={<AuthorListPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;
