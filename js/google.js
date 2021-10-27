
const showUser = () => {

    let usuario = localStorage.datos.

        console.log(usuario);

    document.getElementById('usuario').innerHTML = 'Martin';


}


const onLoad = () => {
    gapi.load('auth2', function () {
        gapi.auth2.init()
    })

    

    
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
    datos.email = profile.getEmail();
    datos.edad = 'No a ingresado su edad';
    datos.telefono = 'No a ingresado su numero de telefono';


    location.href = '../Workspace/index.html';

    localStorage.setItem('datos', JSON.stringify(datos));
}