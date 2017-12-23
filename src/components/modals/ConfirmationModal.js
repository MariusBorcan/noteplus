import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ErrorModal extends Component {
    
    constructor(...args) {
        super(...args);
        
        this.closeConfirmationModal = this.closeConfirmationModal.bind(this);
        this.deleteConfirmed = this.deleteConfirmed.bind(this);
        this.deleteCancelled = this.deleteCancelled.bind(this);
    }
    
    closeConfirmationModal(){
        this.props.closeConfirmationModal();
    }
    
    deleteConfirmed() {
        this.props.deleteConfirmed();
    }
    
    deleteCancelled () {
        this.props.deleteCancelled();
    }
    
    render(){
        return(
            
                <Modal show={this.props.showConfirmationModal} onHide={this.closeConfirmationModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.confirmationModalMessage}</p><br />
                        <Button onClick={this.deleteConfirmed} className="btn btn-danger btn-block">Delete</Button>
                        <Button onClick={this.deleteCancelled} className="btn btn-default btn-block">Cancel</Button>
                    </Modal.Body>
                </Modal>
            
            );
    }
    
}

export default ErrorModal