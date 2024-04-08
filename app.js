// constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}


// realizar cotizacion con los datos

Seguro.prototype.cotizarSeguro = function(){

    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1': 
            cantidad = base * 1.15;
            break; 

        case '2': 
            cantidad = base * 1.05;
            break; 

        case '3': 
            cantidad = base * 1.35;
            break; 

    }

    // leer el año
    const diferencia = new Date().getFullYear() - this.year;

    // cada año que la diferencia es mayor el costo reduce un 3%
    cantidad -= ((diferencia *3) * cantidad / 100);



    /*
    si el seguro es basico se multiplica por el 30% más
    si el seguro es completo se multiplica por el 50% más
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
}

function UI(){}


//llena la sopciones de los años

UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear();
          min = max - 24;

    const selectYear = document.querySelector('#year');
        for(let i = max; i > min; i--){
            let option = document.createElement('option');
            option.value = i;
            option.textContent = i;

            selectYear.appendChild(option);
        }
}



//Muestra alerta de error

UI.prototype.mostrarMensaje = (mensaje, tipo) =>{
    const hijoError = document.querySelector('.tipo_seguro');
    const div = document.createElement('div');


    if(tipo === 'error'){
        div.classList.add('mensaje', 'error')
    }else{
        div.classList.add('mensaje', 'correcto')
    }

    div.textContent = mensaje;

    // insertar en el HTML
    const formulario = document.querySelector('#formulario');

    formulario.insertBefore(div, document.querySelector('.resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
    
}

UI.prototype.mostrarResultado = (seguro, total) =>{

    const { marca, year, tipo} = seguro;

    let textoMarca;
    switch(marca){
        case '1':
            textoMarca = 'Americano'
            break;

        case '2':
            textoMarca = 'Asiatico'
            break;

        case '3':
            textoMarca = 'Europeo'
            break;
        default:
            break;
    }
    // crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML =`
        <h1 clas="header">Tu resumen</h1>
        <p>Marca: <span> ${textoMarca} </span> </p>
        <p>Año: <span> ${year} </span> </p>
        <p>Tipo: <span> ${tipo} </span> </p>
        <p>Total: <span> ${total} </span> </p>
       
    `;

    const resultadoDiv = document.querySelector('.resultado')
        
    // mostrar spinner de cargando

    const spinner = document.querySelector('.spinner');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none'; // se borra el spinner 
        resultadoDiv.appendChild(div); // se muestra el resultado 
    }, 3000);

   
}




//instaciar UI
const ui = new UI();

document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones(); //llena el ui con los años
})

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#formulario')

    formulario.addEventListener('submit', cotizarSeguro);
}


function cotizarSeguro(e){
    e.preventDefault();
    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;



    // lleer el año seleccionado
    const year = document.querySelector('#year').value;



    // leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error')

        return;

    }

    ui.mostrarMensaje('Cotizando...', 'correcto')

    // ocultar las cotizaciones previas

    const resultados = document.querySelector('.resultado div');
    if(resultados != null){
        resultados.remove();
    }

    // instaciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // utilizar el prototype que va a cotizar
    ui.mostrarResultado(seguro, total);
}



