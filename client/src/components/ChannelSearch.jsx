import { useState, useEffect } from "react";
import { useChatContext } from "stream-chat-react";
import {ResultsDropdown} from "./";
import { SearchIcon } from "../assets";

const ChannelSearch = ({setToggleContainer}) => {
  const {client, setActiveChannel} = useChatContext();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if (!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }

  }, [query])

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

        const [channels, {users}] = await Promise.all([channelResponse, userResponse]);

        if (channels.length) {
          return  setTeamChannels(channels);
        }
        if (users.length){
          return setDirectChannels(users);
        }

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

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);

  }

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
      {query && (
        <ResultsDropdown 
          teamChannels={teamChannels}
          directChannels={directChannels}
          isLoading={isLoading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        /> 
      )}
    </div>
  );
};
export default ChannelSearch;
