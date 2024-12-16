import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import RecipesList from "./components/recipes/RecipesList";
import Home from "./pages/Home";
import RecipeView from "./components/recipes/RecipeView";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import RoleProvider from "./context/role/RoleProvider";
import AccountPage from "./pages/AccountPage";
import MyPage from "./pages/MyPage";
import UserProvider from "./context/user/UserProvider";
import AuthProvider from "./context/auth/AuthProvider";
import CreateRecipePage from "./pages/CreateRecipePage";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RoleProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="recipes" element={<RecipesList />} />
                <Route path="recipes/recipe/:id" element={<RecipeView />} />
                <Route path="login" element={<AuthPage />} />
                <Route path="register" element={<AuthPage />} />
                <Route path="my" element={<MyPage />} />
                <Route path="my/create-recipe" element={<CreateRecipePage />} />
                <Route path="author/:id" element={<AccountPage />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </RoleProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
