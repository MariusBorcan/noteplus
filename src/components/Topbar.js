import React, { Component } from 'react'
import { DropdownButton } from 'react-bootstrap'
import { MenuItem } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'

class Topbar extends Component{
    
    render() {

        return (
            <div className="col-sm-9">
                <Dropdown>
                    <Dropdown.Toggle bsStyle="" className="button-no-style button-action">
                        <Glyphicon glyph="glyphicon glyphicon-plus" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem eventKey="1" bsStyle="" className="button-no-style button-action">New project</MenuItem>
                        <MenuItem eventKey="2" bsStyle="" className="button-no-style button-action">New note</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default Topbar