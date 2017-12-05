import React, { Component } from 'react'
import Project from './Project'

class Sidebar extends Component {
    constructor() {
        super()
        this.state = {
            list: [
                    {name:"Project 1"},
                    {name:"Project 2"},
                    {name:"Project 3"},
                    {name:"Project 4"}
                ]
        }
    }
    render() {
        
        const listItems = this.state.list.map((project, i) => {
            return (
                    <li><Project currentProject={project} /></li>
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