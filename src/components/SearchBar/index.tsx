import React, { useState } from "react";
import { motion } from "framer-motion";
import { ReactComponent as SearchIcon } from "../../assets/search_icon.svg";
import { ReactComponent as CloseIcon } from "../../assets/circular_icon_button.svg";
import type { Post } from "../PostsPage";

import "./SearchBar.css";

interface SearchBarProps {
  posts: Post[];
  onSearch: (filteredPosts: Post[]) => void;
}

// Initially tried to do this using the Ant Design Search input but adding custom styling to that was going to take too long so I came up with this custom component instead.
// This is a quick solution for the search bar, ideally the search function should probably be debounced.
// It is probably also a good idea to memoize the filtered posts if the data set was any larger than this.
// If it was even larger I would probably suggest doing the search itself on the server side
// (i.e. Send the search query to an api endpoint and then search through the dataset there and return the results to the FE).

const SearchBar = ({ posts, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filteredPosts =
      query.length >= 2
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(query.toLowerCase())
          )
        : posts;

    onSearch(filteredPosts); // update filtered posts in parent
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleClear = () => {
    setSearchQuery("");
    onSearch(posts); // Reset posts when clearing the search query
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
      <SearchIcon
        className="search-icon"
        style={{ color: isActive ? "#000" : "#939393" }}
      />
      <input
        type="text"
        className="search-input"
        placeholder="Search posts"
        value={searchQuery}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {searchQuery && (
        <button className="clear-button" onClick={handleClear}>
          <CloseIcon className="close-icon" />
        </button>
      )}
    </motion.div>
  );
};

export default SearchBar;
