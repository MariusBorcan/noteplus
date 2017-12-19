import React, { Component } from 'react'

class NotePreview extends Component{
    
    constructor(){
        super();
        
        this.displayNote = this.displayNote.bind(this);
    }
    
    displayNote(){
        this.props.displayNote(this.props.currentPreview);
    }
    
    render() {
        
        return (
            <div className="note-preview-item" onClick={this.displayNote}>
                <span className="note-preview-title">{this.props.currentPreview.title}</span><br />
                <span className="note-preview-text">{this.props.currentPreview.text}</span>
            </div>
        )
    }
}

export default NotePreview