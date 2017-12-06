import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { form } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
var APIManager = require('../utils/APIManager')

class Authentication extends Component{
    
    constructor(...args) {
        super(...args)
        this.state = {
            showAuthenticationModal: true,
            user: {
                name:"",
                password:"",
                githubUrl:"",
                imageUrl:"",
            },
        }
        this.closeAuthenticationModal = this.closeAuthenticationModal.bind(this);
        this.openAuthenticationModal = this.openAuthenticationModal.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
    }
    
    closeAuthenticationModal() {
        this.setState({
            showAuthenticationModal: false
        });
    }
    
    openAuthenticationModal() {
        this.setState({
            showAuthenticationModal: true
        });
    }
    
    updateUsername(event){
        this.setState({
            user:{
                name: event.target.value
            }
        })
    }
    
    checkUsername() {
        APIManager.get('/api/users/find/' + this.state.user.name, null, (err, res) => {
            if(err) {
                alert('ERROR: ' +err)
                return
            }
            //do something with res
            console.log(res);
            
        }) 
    }
    
    render() {
        
        return (
            <div className="col-sm-12">
                <Modal show={this.state.showAuthenticationModal} onHide={this.closeAuthenticationModal} keyboard="false" backdrop="static">
                    <Modal.Header>
                        <Modal.Title>You need to authenticate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <input onChange={this.updateUsername.bind(this)} className="form-control" placeholder="Your Github username..."/>  
                            </FormGroup>
                             <Button onClick={this.checkUsername} className="btn btn-primary btn-block">Check</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Authentication;