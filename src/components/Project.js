import React, { Component } from 'react'
import NotePreview from './NotePreview'
import { Button } from 'react-bootstrap'
import { Collapse } from 'react-bootstrap'
var APIManager = require('../utils/APIManager')

class Project extends Component {
    
    constructor(...args) {
        super(...args)
        
        this.state = {
            list: [],
            open:false
        };
        this.displayNote = this.displayNote.bind(this);
    }
    
    displayNote(currentNote) {
        this.props.displayNote(currentNote);
    }
    
    render(){
        var listItems = [];
        if(this.props.currentProject.notes != undefined) {
            listItems = this.props.currentProject.notes.map((preview, i) => {
                    return(
                            <li key={i}><NotePreview currentPreview={ preview }  displayNote={this.displayNote}/></li>
                        )
                })
        }
        return(
                <div>
                    <Button bsStyle="" className="button-no-style" onClick={() => this.setState({open: !this.state.open })}>
                        {this.props.currentProject.title}
                    </Button>
                    
                    <Collapse in= {this.state.open}>
                        <div>
                            <ul style={{listStyleType:'none'}}>
                                { listItems }
                            </ul>
                        </div>
                    </Collapse>
                </div>
            )
    }
}

export default Project