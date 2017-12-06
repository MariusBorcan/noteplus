import React, { Component } from 'react'
import Project from './Project'

class Sidebar extends Component {
    
    constructor(){
        super();
    }
    
    addProject(project) {
        console.log("in child");
        console.log(project);
    }
    
    render() {
        
        const listItems = this.props.projectsList.map((project, i) => {
            return (
                    <li key={i}><Project currentProject={project} /></li>
                )
        })
        
        return(
                <div className="col-sm-3">
                    <ul style={{listStyleType:'none'}}>
                        {listItems}
                    </ul>
                </div>
            )
    }
}
export default Sidebar