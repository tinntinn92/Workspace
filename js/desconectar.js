

const desconectar = () => {
    localStorage.clear();
    location.href = 'index.html';

    checkStatus();

}
