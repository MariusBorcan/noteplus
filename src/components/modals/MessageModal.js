import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class MessageModal extends Component {
    
    constructor(...args) {
        super(...args);
        
        this.closeMessageModal = this.closeMessageModal.bind(this);
    }
    
    closeMessageModal(){
        this.props.closeMessageModal();
    }
    
    render(){
        return(
            
                <Modal show={this.props.showMessageModal} onHide={this.closeMessageModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.messageModalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.props.messageModalBody}</p><br />
                        <Button onClick={this.closeMessageModal} className="btn btn-default btn-block">Close</Button>
                    </Modal.Body>
                </Modal>
            
            );
    }
    
}

export default MessageModal;