
import Messages from './Messages';
import React from 'react';
import Input from "./Input";
import Sidebar from './Sidebar';
import "./Chat.css";

function randomName() {
 const adjectives = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
 const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
 const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
 const noun = nouns[Math.floor(Math.random() * nouns.length)];
 return adjective + noun;
}

function randomColor() {
 return '#' + Math.floor(Math.random() * 0xFFFFFA).toString(16);
}

function getDate() {
  const today = new Date();
  const date = " (" + today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ")";
  return date
}
class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.drone = new window.Scaledrone("Jix6dCZZ3mP2TLjW", {
      data: this.state.member
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
 // ---
    const room = this.drone.subscribe("observable-room");
 // ---
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data, time:getDate()});
      this.setState({messages});
    });
  }

  state = {
    messages: [],
    member: {
      username: this.props.username,
      color: randomColor(),
    }
  }
  onSendMessage = (message) => {
    // quick fix for sending empty message
    if (message.length===0) return;
    this.drone.publish({
      room: "observable-room",
      message
    });
  }
  toggleSidebar = () => {
    this.sidebar.toggleSidebar();
  }
  
  render(){
    return (
      <div className="App">
      <div className="App-header">
        <button className='sidebar-btn' onClick={this.toggleSidebar}>Sidebar</button>
        <h1>{this.props.username}'s Chat Room</h1>
        <div></div>
      </div>
      <Sidebar ref={(reference)=> this.sidebar = reference}/>
      <Messages
        messages={this.state.messages}
        currentMember={this.state.member}
        time={this.state.time}
      />
      <Input onSendMessage={this.onSendMessage}/>
    </div>
    );
  }
  


}

export default Chat;
