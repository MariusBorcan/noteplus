import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { User } from 'react-bootstrap';

class UserModal extends Component {
    
    constructor(...args) {
        super(...args);
        
        this.closeUserModal = this.closeUserModal.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    closeUserModal(){
        this.props.closeUserModal();
    }
    
    logout() {
        this.props.logout();
    }
    
    render(){
        if(this.props.user != undefined) {
            return(
                    <Modal show={this.props.showUserModal} onHide={this.closeUserModal}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <img src={this.props.user.imageUrl} className="thumbnail" thumbnail />
                            <br /><br />
                            <span class="user-info">Username: {this.props.user.name}</span><br /><br />
                            <span class="user-info">Github: {this.props.user.githubUrl.replace("api.", "")}</span>
                            <Button onClick={this.logout} className="btn btn-danger btn-block">Logout</Button>
                            <Button onClick={this.closeUserModal} className="btn btn-default btn-block">Close</Button>
                        </Modal.Body>
                    </Modal>
            );            
        } else {
            return null;
        }

    }
    
}

export default UserModal;