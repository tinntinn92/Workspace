//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

const datos = () => {

    let usuario = document.getElementById('user');
    let pass = document.getElementById('pass');
    let datos = {};

    if (usuario.value.trim() == '' || pass.value.trim() == '') {
        alert('Falta completar algun campo');
    } else {

        datos.usuario = usuario.value;
        datos.pass = pass.value;
        datos.estado = 'conectado';

        location.href = 'index.html';

        sessionStorage.setItem('datos', JSON.stringify(datos));


    }
}