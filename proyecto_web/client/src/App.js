import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/layout/navbar'

import './styles/styles.css'

/*
* Esto es basicamente programacion orientada a objetos.
*
* Este boton solo es para darles una idea de como funciona recordando lo que debieron de haber aprendido con Javascript
*
* Recuerden una cosa, solo trabajamos con este archivo App. El archivo index y app.test NO SE TOCAN.
* Cuando vayamos a crear mas componentes, se hace en la carpeta componentes, la cual se divide por topicos
* */


class App extends Component {
    constructor() {
        super();
        this.state = { count: 0 };
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/"/>
                    <button onClick={ () => this.setState({ count: this.state.count + 1 }) }> Count: {this.state.count} </button>
                </div>
            </Router>
        );
    }
}

export default App;
