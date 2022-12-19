//variables
const formulario = document.querySelector('#nueva-cita');
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const citasContenedor = document.querySelector('#citas');
const btnSubmit = document.querySelector('button[type="submit"]');
let citas = [];

//eventos
formulario.addEventListener('submit', agregarCita);
document.addEventListener('DOMContentLoaded', () => {
    citas = JSON.parse(localStorage.getItem('citas')) || [];
    imprimirCitas();
});


//funciones
function agregarCita(e) {
    e.preventDefault();

    //objeto cita
    const citaObj = {
        mascota: mascotaInput.value,
        propietario: propietarioInput.value,
        telefono: telefonoInput.value,
        fecha: fechaInput.value,
        hora: horaInput.value,
        sintomas: sintomasInput.value,
        id: Date.now()
    }

    citas .push(citaObj);
    imprimirCitas();
    sincronizarStorage();
    formulario.reset();
    
}


function imprimirCitas() {
    limpiarHTML();
    citas.forEach(element => {
        const div = document.createElement('div');
        const btnBorrar = document.createElement('button');
        const btnEditar = document.createElement('button');
        btnEditar.textContent = "Editar";
        btnBorrar.innerHTML = "Borrar&times";
        div.innerHTML = `
        <li>Mascota: ${element.mascota}</li>
        <li>Propietario: ${element.propietario}</li>
        <li>Telefono: ${element.telefono}</li>
        <li>Fecha: ${element.fecha}</li>
        <li>Hora: ${element.hora}</li>
        <li>Sintomas: ${element.sintomas}</li>`;
        div.appendChild(btnBorrar);
        div.appendChild(btnEditar);
        citasContenedor.appendChild(div);

        //eliminar citas
        btnBorrar.addEventListener('click', () => {
            eliminarCita(element.id);
        });

        btnEditar.addEventListener('click', () => {
            editarCita(element, element.id);
        });
    });
}

function eliminarCita(id) {
    citas = citas.filter(element => element.id !== id);
    imprimirCitas();
    sincronizarStorage();
}

function editarCita(cita, id) {
    btnSubmit.textContent = "Editar";
    mascotaInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    telefonoInput.value = cita.telefono;
    fechaInput.value = cita.fecha;
    horaInput.value = cita.hora;
    sintomasInput.value = cita.sintomas;

    formulario.addEventListener('submit', () => {
        enviarEdicion(id);
    });

}

function enviarEdicion(id) {
    citas = citas.filter(element => element.id !== id);
    imprimirCitas();
    btnSubmit.textContent = "Crear Cita";
    sincronizarStorage();
}

function limpiarHTML() {
    citasContenedor.innerHTML = "";
}


function sincronizarStorage() {
    localStorage.setItem("citas", JSON.stringify(citas));
}