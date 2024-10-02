import { useEffect, useState } from "react";

import { Card, Space } from "antd";
import "./PostsPage.css";
import Page from "./Page";
import { DEFAULT_USER_ID } from "./App";

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    
    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${DEFAULT_USER_ID}`)
            .then((response) => response.json())
            .then((json) => setPosts(json));
    } , []);

    return (
        <Page title="Posts">
            <Space direction="vertical">
                {posts.length === 0 ? "No posts found." : posts.map((post, index) => <PostCard key={index} post={post}/>)}
            </Space>
        </Page>
    );
}

interface PostCardProps {
    post: Post;
}

function PostCard(props: PostCardProps) {
    const {post} = props;

    return <Card className="post-card">
        <h3>{post.title}</h3>
    </Card>
}
