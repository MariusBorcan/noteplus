import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { form } from 'react-bootstrap'
import { FormGroup } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { p } from 'react-bootstrap'
import axios from 'axios'

var APIManager = require('../utils/APIManager')

class Authentication extends Component{
    
    componentDidMount() {
        APIManager.get('/api/check', null, (error, response) => {
            if(error) {
                alert('ERROR: ' + error);
                console.log(error);
                return
            }else {
                //if cookie is already set, don't show the modal
                //otherwise, show the modal
                this.setState({
                    showAuthenticationModal: !response.token
                })
                if(response.token) {
                    this.props.userIsReady();    
                }
            }
        }); 
    }
    
    constructor(...args) {
        super(...args)
        this.state = {
            showAuthenticationModal: false,
            showLoginModal: false,
            showRegisterModal: false,
            enableRegisterButton: false,
            registerDisabled: true,
            loginSuccess: false,
            user: {
                name:"",
                password:"",
                githubUrl:"",
                imageUrl:"",
            },
        }
        this.closeAuthenticationModal = this.closeAuthenticationModal.bind(this);
        this.openAuthenticationModal = this.openAuthenticationModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeRegisterModal = this.closeRegisterModal.bind(this);
        this.openRegisterModal = this.openRegisterModal.bind(this);
        this.checkUsername = this.checkUsername.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.checkRegiser = this.checkRegister.bind(this);
        this.getUserInformationForRegister = this.getUserInformationForRegister.bind(this);
        this.getRegisterValidationState = this.getRegisterValidationState.bind(this);
        this.getLoginValidationState = this.getLoginValidationState.bind(this);
    }
    
    getRegisterValidationState() {
        const length = this.state.user.password.length;
        if (length >= 5){
            if(this.state.registerDisabled == true) {
                this.setState({
                    registerDisabled: false
                });    
            }
            return 'success';
        }
        if(this.state.registerDisabled == false) {
            this.setState({
                registerDisabled: true
            });    
        } 
        return 'error';
    }
    
    getLoginValidationState() {
        if(this.state.loginSuccess == true)
            return 'success';
        return 'error';
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
    
    closeLoginModal() {
        this.setState({
            showLoginModal: false
        });
    }
    
    openLoginModal() {
        this.setState({
            showLoginModal: true
        });
    }
    
    closeRegisterModal() {
        this.setState({
            showRegisterModal: false
        });
    }
    
    openRegisterModal() {
        this.setState({
            showRegisterModal: true
        });
    }
    
    updateUsername(event){
        const oldUser = this.state.user;
        oldUser.name = event.target.value;
        this.setState({
            user:oldUser
        })
    }
    
    updatePassword(event){
        const oldUser = this.state.user;
        oldUser.password = event.target.value;
        this.setState({
            user:oldUser
        })
    }
    
    updateGithubUrl(event){
        const oldUser = this.state.user;
        oldUser.githubUrl = event.target.value;
        this.setState({
            user:oldUser
        })
    }
    
    updateImageUrl(event){
        const oldUser = this.state.user;
        oldUser.imageUrl = event.target.value;
        this.setState({
            user:oldUser
        })
    }
    
    checkUsername() {
        APIManager.get('/api/users/find/' + this.state.user.name, null, (err, res) => {
            if(err) {
                alert('ERROR: ' +err)
                console.log(err)
                return
            }
            //do something with res
            if(res.status=="success") {
                if(res.found == true) {
                    //open login
                    this.closeAuthenticationModal();
                    this.openLoginModal();
                } else {
                    //open register
                    this.closeAuthenticationModal();
                    this.getUserInformationForRegister();
                    this.openRegisterModal();
                }

            } else {
    
            }
            
        }) 
    }
    
    checkLogin() {
        APIManager.post('/api/users/authenticate/', this.state.user, (err, res) => {
            if(err) {
                alert('ERROR: ' + err)
                console.log(err)
                return
            }
            if(res.found == true) {
                APIManager.get('/api/users/token/'+this.state.user.name, null, (error, response) => {
                    if(error) {
                        alert('ERROR: ' + error)
                        console.log(error)
                        return
                    }
                    else {
                        this.setState({
                            showLoginModal:false,
                            loginSuccess: true
                        });
                        this.props.userIsReady();
                    }
                });  
            } else {
                //TODO: Display validation message
            }
              
        });
    }
    
    getUserInformationForRegister(){
        var url = 'https://api.github.com/users/' + this.state.user.name;
        axios.get(url)
        .then(response => {
            this.setState({
                user: {
                    name: response.data.login,
                    githubUrl: url,
                    imageUrl: response.data.avatar_url,
                    password: ""
                }
            })
        })
        .catch(error => {
            console.log(error);
        });
    }
    
    checkRegister() {
        //paswword length is already verified
        //create user
        APIManager.post('/api/users/', this.state.user, (err, res) => {
            if(err) {
                alert('ERROR: ' + err)
                console.log(err)
                return
            }
           if(res.status=="success") {
               //set cookie
                APIManager.get('/api/users/token/'+this.state.user.name, null, (error, response) => {
                    if(error) {
                        alert('ERROR: ' + error)
                        console.log(error)
                        return
                    }
                    else {
                        this.setState({
                            showRegisterModal:false
                        });
                        this.props.userIsReady();
                    }
                }); 
           }
        });
    }
    
    render() {
        
        return (
            <div className="col-sm-12">
                <Modal show={this.state.showAuthenticationModal} onHide={this.closeAuthenticationModal} keyboard={false} backdrop="static">
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
                <Modal show={this.state.showLoginModal} onHide={this.closeLoginModal} keyboard={false} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <input readonly="readonly" className="form-control" value={this.state.user.name}/>  
                            </FormGroup>
                            <p value ={this.state.validationMessage}></p>
                            <FormGroup validationState={this.getLoginValidationState()}>
                                <input type="password" onChange={this.updatePassword.bind(this)} className="form-control" placeholder="Your password here..."/>  
                            </FormGroup>
                             <Button onClick={this.checkLogin} className="btn btn-success btn-block">Login</Button>
                        </form>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showRegisterModal} onHide={this.closeRegisterModal} keyboard={false} backdrop="static">
                    <Modal.Header>
                        <Modal.Title>Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <FormGroup>
                                <input readonly="readonly" value={this.state.user.name} onChange={this.updateUsername.bind(this)} className="form-control" placeholder="Your Github username..."/>  
                            </FormGroup>
                            <FormGroup>
                                <input readonly="readonly" value={this.state.user.githubUrl} onChange={this.updateGithubUrl.bind(this)} className="form-control" placeholder="Your Github profile URL..."/>  
                            </FormGroup>
                            <FormGroup>
                                <input readonly="readonly" value={this.state.user.imageUrl} onChange={this.updateImageUrl.bind(this)} className="form-control" placeholder="Your Github image URL..."/>  
                            </FormGroup>
                            <FormGroup validationState={this.getRegisterValidationState()}>
                                <input type="password" onChange={this.updatePassword.bind(this)} className="form-control" placeholder="Your password here..."/>  
                            </FormGroup>
                             <Button onClick={this.checkRegiser} disabled={this.state.registerDisabled} className="btn btn-primary btn-block">Register</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Authentication;