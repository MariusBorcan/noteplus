import React, { Component } from 'react'
import { FormGroup } from 'react-bootstrap'
import { form } from 'react-bootstrap'

class Note extends Component{
    
    constructor(...args) {
        super(...args);
        
        this.state = {
            currentNote: undefined
        }
        this.updateCurrentNoteTitle = this.updateCurrentNoteTitle.bind(this);
        this.updateCurrentNoteText = this.updateCurrentNoteText.bind(this);
    }
    
    componentWillReceiveProps(nextProps) {
        
        if(this.state.currentNote == undefined) {
            this.setState({
                currentNote: nextProps.currentNote
            });
        } else {
            if(this.state.currentNote.title != nextProps.currentNote.title || this.state.currentNote.text != nextProps.currentNote.text) {
                this.setState({
                    currentNote: nextProps.currentNote
                });
            }
        }
    }
    
    updateCurrentNoteTitle(event) {
        var oldNote = this.state.currentNote;
        oldNote.title = event.target.value;
        this.setState({
            currentNote: oldNote
        });
    }
    
    updateCurrentNoteText(event) {
        var oldNote = this.state.currentNote;
        oldNote.text = event.target.value;
        this.setState({
            currentNote: oldNote
        });
    }    
    
    render() {
        
        return (
            this.state.currentNote ?
            <div className="col-sm-9 note-area">
                <FormGroup>
                    <input onChange={this.updateCurrentNoteTitle} value={this.state.currentNote.title} className="form-control note-input" placeholder="Your note title..."/>  
                </FormGroup>
                <FormGroup>
                    <textarea onChange={this.updateCurrentNoteText} value={this.state.currentNote.text} className="form-control note-textarea" placeholder="Your note text..."/>  
                </FormGroup>
            </div>
            :
            <div className="col-sm-9">
                <center><p className="placeholder-message">Start editing your notes from the sidebar or add a new note.</p></center>
            </div>
        )
    }
}

export default Note