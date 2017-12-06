//This is the entrypoint for our React code
//React code needs to be compiled
import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Note from './components/Note'
import Topbar from './components/Topbar'
import Authentication from './components/Authentication'
import APIManager from './utils'

//this is like creating a new tag named App that we can use as html
class App extends Component {
    
    
    constructor() {
        super()
        this.state = {
            list: []
        }
        this.submitProject = this.submitProject.bind(this);
    }
    
    /*
    componentDidMount(){
        APIManager.get('/api/users/1/projects', null, (err, res) => {
            if(err) {
                alert('ERROR: ' +err)
                return
            }
            
       //     this.setState({
        //        list: res.projects
        //    });
        }) 
    }
    */
    
    submitProject(project) {
        let updatedList = Object.assign([], this.state.list)
        updatedList.push({name: project.name});
        console.log(updatedList)
        this.setState({
            list: updatedList
        })
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div class="row content">
                    <Authentication />
                    <Sidebar projectsList={this.state.list}/>
                    <Topbar submitProject={this.submitProject}/>
                    <Note />
                </div>
            </div>
        )
    }
    
}

//render the code now
//we are rendering our custom App tag
//find the div with id of root and take over it with our App tag
ReactDOM.render(<App />, document.getElementById('root'))
