const isEmpty = require("./is-empty");
const Validator = require("validator");

//Modulo para validar las criticas

module.exports = validateCriticInput = (data) =>{
    let errors = { };

    data.title = !isEmpty(data.title) ? data.name: "";
    data.text = !isEmpty(data.text) ? data.text: "" ;


    if (!Validator.isLength(data.title), {min: 2, max:20}) errors.title = "El titulo debe tener entre 2 y 20 caracteres";
    if (Validator.isEmpty(data.title)) errors.title = "Campo requerido";
    
    if (Validator.isEmpty(data.text)) errors.text = "Campo requerido";
    if (!Validator.isLength(data.critic), {min: 2, max:20}) errors.critic = "El titulo debe tener entre 2 y 20 caracteres";

    return{
        errors,
        isValid: isEmpty(errors)
    }
};