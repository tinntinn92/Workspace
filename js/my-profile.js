let datos = JSON.parse(localStorage.getItem('datos'));




const showProfile = () => {
    document.getElementById('perfil').innerHTML = `
    <div class='row'>
        <div class= 'col-sm'>
            <img src="${datos.img}" alt="" class="img-fluid">
        </div>
        <div class='col-sm'>
            <ul>
                <li> Nombre: ${datos.usuario}</li>
                <li> Edad: ${datos.edad}</li>
                <li> E-mail: ${datos.email}</li>
                <li> Telefono: ${datos.telefono}</li>
            </ul>
        </div>
    </div>
    `


}

const enviarDatos = () => {



    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let nombreCompleto = nombre + ' ' + apellido

    datos.usuario = nombreCompleto;
    datos.edad = parseInt(document.getElementById('edad').value);
    datos.email = document.getElementById('email').value;
    datos.telefono = document.getElementById('telefono').value;

    localStorage.setItem('datos', JSON.stringify(datos));

    if (nombreCompleto.trim() == '' || datos.edad == '' || datos.email.trim() == '' || datos.telefono.trim() == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falta completar algun campo',

        })
    }
    else {
        showProfile();

    }




}

const changePic = () => {
    let newPic = document.getElementById('urlImg').value;

    datos.img = newPic;

    localStorage.setItem('datos', JSON.stringify(datos));

    showProfile();
    mostrarBarra()

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showProfile();
});