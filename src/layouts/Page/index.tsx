import { Link } from "react-router-dom";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Select } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import { useUser } from "../../context/UserContext";
import AvatarButton from "../../components/AvatarButton";
import "./Page.css";

interface PageProps {
  title: string;
  children: JSX.Element;
}

export default function Page(props: PageProps) {
  const { title, children } = props;
  const { user, setUser } = useUser();

  const handleUserChange = (value: number) => {
    setUser(value);
  };

  return (
    <Layout>
      <Header className="page-header">
        <div className="page-header-item left">
          <Link to="/active-user">
            <AvatarButton icon={<UserOutlined />} />
          </Link>
          <Link to="/posts">
            <AvatarButton icon={<UnorderedListOutlined />} />
          </Link>
        </div>
        <h1>{title}</h1>
        <div className="page-header-item right">
          {/* Simple Ant design component with custom styles. Controls the current user which can be accessed by other components */}
          <Select
            defaultValue={1}
            onChange={handleUserChange}
            options={[
              { value: 1, label: <span>User 1</span> },
              { value: 2, label: <span>User 2</span> },
              { value: 3, label: <span>User 3</span> },
            ]}
            value={user}
            className="user-select"
          />
        </div>
      </Header>
      <Content className="page-content">{children}</Content>
    </Layout>
  );
}
