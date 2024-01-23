import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets";

const ChannelSearch = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const getChannels = async (text) => {
    try {
        //TODO: Fetching channels data from API

    } catch (error) {
        setQuery('')
    }
  }

  const onSearch = (e) => {
    e.preventDefault();

    setIsLoading(true)
    setQuery(e.target.value)
    getChannels(e.target.value)
  };
  return (
    <div className="channel-search__container">
      <div className="channel-search__input__wrapper">
        <div className="channel-search__input__icon">
          <SearchIcon />
        </div>
        <input
          className="channel-search__input__text"
          type="text"
          placeholder="Search"
          value={query}
          onChange={onSearch}
        />
      </div>
    </div>
  );
};
export default ChannelSearch;
