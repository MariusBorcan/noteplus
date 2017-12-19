import React, { Component } from 'react'

class Note extends Component{
    
    render() {
        
        return (
            this.props.currentNote ?
            <div className="col-sm-9">
                <span>{this.props.currentNote.title}</span>
            </div>
            : null
        )
    }
}

export default Note