
const showUser = () => {

    let usuario = localStorage.datos.

        console.log(usuario);

    document.getElementById('usuario').innerHTML = 'Martin';


}


const onLoad = () => {
    gapi.load('auth2', function () {
        gapi.auth2.init()
    })

    

    let local = JSON.parse(localStorage.getItem('datos'));

    let innerHTML = `
    <a class="py-2 d-none d-md-inline-block" href="index.html">Inicio</a>
    <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
    <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
    <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
    <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
    
    <p><img src="${local.img}" id="userImg"><a href="#" class="py-2 d-none d-md-inline-block">${local.usuario} </a></p>
    
    <p><button type="button" class="btn btn-danger" id="desconectar" onclick="desconectar();">desconectar</button></p>
            
      
    
   
  `

    document.getElementById('barra').innerHTML = innerHTML;
};




function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    })
};

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    let datos = {};



    datos.usuario = profile.getName();
    datos.estado = 'Conectaado';
    datos.img = profile.getImageUrl();
    datos.google = 'ok';


    location.href = '../Workspace/index.html';

    localStorage.setItem('datos', JSON.stringify(datos));
}