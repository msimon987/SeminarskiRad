import React from "react";
import {Route, Routes, Navigate} from 'react-router-dom'
import Chat from "./components/Chat"
import Login from "./components/Login"

class App extends React.Component{
  constructor(props){
    super(props);
      this.state={username:""};
    }
  handleLogin = (username) => {
    this.setState({username})
  }

  render(){
    return (<Routes>
        <Route path="/" element={ this.state.username ? <Chat username={this.state.username}/> : <Navigate to="/login"/>}/>
        <Route path="/login" element={<Login onLogin={this.handleLogin}/>}/>
      </Routes>)
  }
}

export default App;