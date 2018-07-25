# Proyecto_final
---
Proyecto final colaborativo para la materia "Integradora" del noveno cuatrimestre. 

Comandos
---
Instalar. Este comando sirve para instalar todas las dependencias. Es recomendable checar primero la version de NPM que tiene instalado el cliente
```
npm install
npm client-install
``` 
Este comando inicializará el servidor de desarrollo. Inicializará tanto el servidor API como el cliente de ReactJS.
```
npm run dev
```
La direccion de los servidores de desarollo y cliente son las siguientes
```
servidor: "http://localhost:5000/"

cliente: "http://localhost:3000/"
```

# Guias de estilo y tipografia
## JavaScript / React.JS
Las reglas de escritura del lenguaje JavaScript que fueron utilizadas durante el proyecto son las siguientes:

 1. Cada instruccion debe de finalizarse con un ";"
 2. Las variables deben de ser declaradas en camelCase
 ```javascript
//correcto
let myVar = 1; 
//incorrecto
let mybar = 1
 ```
 3. Tiene que existir un espaciado y tabulacion por niveles de codigo
 ```javascript
//correcto
router.get("/",(req,res) => {
    Post.find()
        .sort({date: -1})
        .then(post => res.json(post))
        .catch(err => res.status(404).json({nopostsfound: "No posts found"}))
});

//incorrecto
router.get("/",(req,res) => {
           Post.find()
    .sort({date: -1})
.then(post => res.json(post))
             .catch(err => res.status(404).json({
     nopostsfound: "No posts found"
     }))
               });
 ```
 5. Tos objetos son nombrados con camelCase mientras que las clases son nombradas con CapitalCase
```javascript
//correcto
const MySchema = new Schema(); //clase

const myObject = { //objeto
}
```
 6. Todos los modulos importados dentro del servidor de Node.JS deben de ser declarados con el tipo de variable "const"
```javascript
//correcto
const Express = require('express');
const Mongoose = require("mongoose");
```
 7. Todos los componentes de ReactJS deben de estar separados, ya que la filosofia del lenguaje es mantener la programacion separada por componentes.
 ```javascript
/*
* Tal y como se muestra, solo se está renderizando el componente.
* La declaracion del componente, sus objetos y propiedades 
* va dentro de su propio archivo de tipo JavaScript,
* mientras que en el archivo padre solo es declarado su uso 
*/
 render() {
        return (
            <Router>
                <div className="App">
                    <Navbar/>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Footer/>
                </div>
            </Router>
        );
     }
}
```
