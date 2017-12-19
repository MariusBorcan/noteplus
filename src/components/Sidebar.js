import React, { Component } from 'react'
import Project from './Project'

class Sidebar extends Component {
    
    constructor(){
        super();
        this.displayNote = this.displayNote.bind(this);
    }
    
    displayNote(currentNote) {
        this.props.displayNote(currentNote);
    }
    
    addProject(project) {
        console.log(project);
    }
    
    render() {
        const listItems = this.props.projectsList.map((project, i) => {
            return (
                    <li key={i}><Project currentProject={project} displayNote={this.displayNote}/></li>
                )
        })
        return(
                <div className="col-sm-3 sidebar">
                    <ul style={{listStyleType:'none'}}>
                        {listItems}
                    </ul>
                </div>
            )
    }
}
export default Sidebar