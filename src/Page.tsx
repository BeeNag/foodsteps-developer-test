import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import "./Page.css";
import AvatarButton from "./AvatarButton";
import { Link } from "react-router-dom";

interface PageProps {
    title: string;
    children: JSX.Element;
}

export default function Page(props: PageProps) {
    const {title, children} = props;

    return <Layout>
        <Header className="page-header">
                <div className="page-header-item left">
                    <Link to="/active-user"><AvatarButton icon={<UserOutlined/>} /></Link>
                    <Link to="/posts"><AvatarButton icon={<UnorderedListOutlined/>} /></Link>
                </div>
                <h1>{title}</h1>  
                <div className="page-header-item right">(Toggle user here)</div>
        </Header>
        <Content className="page-content">
            {children}
        </Content>
    </Layout>
}
