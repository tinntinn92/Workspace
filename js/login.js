//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});




const login = () => {

    let usuario = document.getElementById('user');
    let pass = document.getElementById('pass');


    if (usuario.value.trim() == '' || pass.value.trim() == '') {
        alert('Falta completar algun campo');
    } else {
        let datos = {};

        datos.usuario = usuario.value;
        datos.pass = pass.value;
        datos.estado = 'conectado';
        datos.img = 'img/perfil.jpeg'



        location.href = '../Workspace/index.html';

        localStorage.setItem('datos', JSON.stringify(datos));




    }
}

