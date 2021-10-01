function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    })
};




const desconectar = () => {
    
    localStorage.clear();
    checkStatus();
    signOut();
    
    

    



};
