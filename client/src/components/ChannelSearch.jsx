import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";

import { SearchIcon } from "../assets";

const ChannelSearch = () => {
  const {client, setActiveChannel} = useChatContext();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teamChannel, setTeamChannel] = useState([]);
  const [directChannel, setDirectChannel] = useState([]);

  const getChannels = async (text) => {
    try {
        const channelResponse = client.queryChannels({
          type: "team",
          name: {$autocomplete: text},
          members: {$in: [client.userID]}
        })

        const userResponse = client.queryUsers({
          id: {$ne: client.userID},
          name: {$autocomplete: text}
        })

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
