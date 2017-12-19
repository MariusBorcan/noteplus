import React, { Component } from 'react'
import NotePreview from './NotePreview'
import { Button } from 'react-bootstrap'
import { Collapse } from 'react-bootstrap'
var APIManager = require('../utils/APIManager')

class Project extends Component {
    
    constructor(...args) {
        super(...args)
        
        this.state = {
            /*
            list: [
                {title:"Title 1", preview:"This is preview 1"},
                {title:"Title 2", preview:"This is preview 2"},
                {title:"Title 3", preview:"This is preview 3"},
                {title:"Title 4", preview:"This is preview 4"}
            ],
            */
            list: [],
            open:false
        };
    }
    /*
    componentDidUpdate(){
        APIManager.get('/api/projects/' + this.props.currentProject.id + '/notes', null, (error, response) => {
            if(error) {
                alert('ERROR: ' + error);
                console.log(error);
                return
            }else {
                this.setState({
                    list: response.notes
                });
            }
        }); 
    }
    */
    
    render(){
        
        const listItems = this.state.list.map((preview, i) => {
                    return(
                            <li key={i}><NotePreview currentPreview={ preview } /></li>
                        )
                })
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