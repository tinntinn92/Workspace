//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});




const login = () => {

    let usuario = document.getElementById('user');
    let pass = document.getElementById('pass');


    if (usuario.value.trim() == '' || pass.value.trim() == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falta completar algun campo',

        })


    } else {
        let datos = {};

        datos.usuario = usuario.value;
        datos.pass = pass.value;
        datos.estado = 'conectado';
        datos.img = 'img/perfil.jpeg'
        datos.email = 'No a ingresado un mail';
        datos.edad = 'No a ingresado su edad';
        datos.telefono = 'No a ingresado su numero de telefono';



        location.href = '../Workspace/index.html';

        localStorage.setItem('datos', JSON.stringify(datos));




    }
}

