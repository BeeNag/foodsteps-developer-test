import { BrowserRouter, Routes, Route } from "react-router-dom";

import PostsPage from './PostsPage';
import "./App.css";
import { ConfigProvider } from "antd";
import UserDetailsPage from "./UserDetailsPage";

export const DEFAULT_USER_ID = 1;

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: 'Helvetica Neue',
          colorPrimary: 'black',
        },
      }}
    >
          <BrowserRouter>
            <Routes>
                <Route path="posts" element={<PostsPage />} />
                <Route path="active-user" element={<UserDetailsPage />} />
                <Route path="*" element={<PostsPage />} />
            </Routes>
          </BrowserRouter>
  </ConfigProvider>
  );
}

export default App;
