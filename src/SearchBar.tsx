import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Post } from "./PostsPage";

import "./SearchBar.css";

interface SearchBarProps {
  posts: Post[];
  onSearch: (filteredPosts: Post[]) => void;
}

const SearchBar = ({ posts, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleClear = () => {
    setSearchQuery("");
    onSearch(posts); // Reset posts when clearing the search query
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredPosts =
      query.length >= 2
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          )
        : posts;

    onSearch(filteredPosts); // updated filtered posts in parent component
  };

  const isActive = isFocused || searchQuery.length > 0;

  return (
    <motion.div
      className="search-input-wrapper"
      initial={{ boxShadow: "none", borderColor: "#939393" }}
      animate={{
        boxShadow: isFocused ? "0px 2px 8px 0px rgba(0, 0, 0, 0.24)" : "none",
        borderColor: isActive ? "#000" : "#939393",
      }}
      whileHover={{ boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.24)" }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
    >
      <input
        type="text"
        className="search-input"
        placeholder="Search posts"
        value={searchQuery}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </motion.div>
  );
};
