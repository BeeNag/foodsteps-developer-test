import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";

import { UserProvider } from "./context/UserContext";
import PostsPage from "./components/PostsPage";
import UserDetailsPage from "./components/UserDetailsPage";
import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Helvetica Neue",
          colorPrimary: "black",
        },
      }}
    >
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="posts" element={<PostsPage />} />
            <Route path="active-user" element={<UserDetailsPage />} />
            <Route path="*" element={<PostsPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ConfigProvider>
  );
}

export default App;
