//This is the entrypoint for our React code
//React code needs to be compiled
import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Sidebar from './components/Sidebar'
import Note from './components/Note'
import Topbar from './components/Topbar'

//this is like creating a new tag named App that we can use as html
class App extends Component {
    
    render() {
        return (
            <div className="container-fluid">
                <div class="row content">
                    <Sidebar />
                    <Topbar />
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
