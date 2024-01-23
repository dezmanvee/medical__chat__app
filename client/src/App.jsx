import { useState } from "react";
import {StreamChat} from "stream-chat";
import {Chat} from "stream-chat-react";
import Cookies from "universal-cookie";

// import 'stream-chat-react/dist/css/v2/index.css';
import "stream-chat-react/dist/css/index.css";
import "./App.css";

import {ChannelContainer, ChannelListContainer, Auth} from "./components";

const cookies = new Cookies();

const apiKey = 'bfaaghezzjre';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey)

if (authToken) {
  client.connectUser({
        id: cookies.get('userId'), 
        name: cookies.get('username'), 
        fullName: cookies.get('fullName'), 
        image: cookies.get('avatarURL'), 
        hashedPassword: cookies.get('hashedPassword'), 
        phoneNumber: cookies.get('phoneNumber'), 
  }, authToken)
}


const customStyles: CustomStyles = {
  '--primary-color': '#7731d8',
};
const App = () => {

  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  

  if (!authToken) return <Auth />
  return (
    <div className="app__wrapper">
        <Chat  client={client} customStyles={customStyles}>
          <ChannelListContainer 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing} 
          />
          <ChannelContainer 
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
        </Chat>
    </div>
  )
}
export default App
