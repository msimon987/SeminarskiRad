import React from "react";
import "./Sidebar.css"

class Sidebar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isOpen: false,
        }
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar(){
        const {isOpen} = this.state;
        this.setState({isOpen: !isOpen});
    }

    render(){

        const {isOpen} = this.state;
        return(<div className="container-fluid mt-3">
            <div className={`sidebar ${isOpen === true ? "active" : ""}`}>
                <div className="sd-header">
                    <h4>SIdebar header</h4>
                    <div className="btn btn-primary" onClick={this.toggleSidebar}> Close Sidebar</div>
                </div>
                <div className="sd-body">
                    <ul>
                        <li><a href="#" className="sd-link">Menu Item 1</a></li>
                        <li><a href="#" className="sd-link">Menu Item 2</a></li>
                    </ul>
                </div>
            </div>
            <div className={`sidebar-overlay ${isOpen === true ? "active" : ""}`} onClick={this.toggleSidebar}></div>
        </div>)
    }

}

export default Sidebar;