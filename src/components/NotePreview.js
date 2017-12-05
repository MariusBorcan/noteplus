import React, { Component } from 'react'

class NotePreview extends Component{
    
    render() {
        
        return (
            <div className="note-preview-item">
                <span className="note-preview-title">{this.props.currentPreview.title}</span><br />
                <span className="note-preview-text">{this.props.currentPreview.preview}</span>
            </div>
        )
    }
}

export default NotePreview