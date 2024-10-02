import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, Space } from "antd";

import { useUser } from "./context/UserContext";
import Page from "./Page";
import SearchBar from "./SearchBar";
import "./PostsPage.css";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Posts() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user}`)
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
        setFilteredPosts(json); // Initialise the filtered posts to show all posts initially
      });
  }, [user]);

  return (
    <Page title="Posts">
      <Space direction="vertical">
        <SearchBar posts={posts} onSearch={setFilteredPosts} />
        {filteredPosts.length === 0
          ? "No posts found."
          : filteredPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
      </Space>
    </Page>
  );
}

interface PostCardProps {
  post: Post;
}

function PostCard(props: PostCardProps) {
  const { post } = props;
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  const handlePostClick = (postId: number) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  return (
    // The Card component will expand when clicked to show the body content of a post. Click it again to reduce back to just the title
    <Card className="post-card" onClick={() => handlePostClick(post.id)}>
      <h3>{post.title}</h3>
      <AnimatePresence>
        {expandedPostId === post.id && (
          <motion.div
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 500, opacity: 1 }} // This is a bit of a quick hack. Probably a better idea to calculate the height needed with a ref that way it will always be correct
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <p>{post.body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
