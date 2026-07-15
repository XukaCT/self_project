import { BrowserRouter, Route, Routes } from "react-router";
import SignInPage from "./pages/SignInPages";
import ChatAppPage from "./pages/ChatAppPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route
            path="/signin"
            element={<SignInPage />}
          />
          <Route
            path="/signup"
            element={<SignUpPage />}
          />

          {/* protected routes */}
          <Route
            path="/"
            element={<ChatAppPage />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;