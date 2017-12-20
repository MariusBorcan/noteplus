import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class ErrorModal extends Component {
    
    constructor(...args) {
        super(...args);
        
        this.closeErrorModal = this.closeErrorModal.bind(this);
    }
    
    closeErrorModal(){
        this.props.closeErrorModal();
    }
    
    render(){
        return(
            
                <Modal show={this.props.showErrorModal} onHide={this.closeErrorModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.errorModalMessage}</p><br />
                        <Button onClick={this.closeErrorModal} className="btn btn-default btn-block">Close</Button>
                    </Modal.Body>
                </Modal>
            
            );
    }
    
}

export default ErrorModal