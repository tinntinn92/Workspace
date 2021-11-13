let carrito = {};
let cartDes = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
let costo = 0;
let moneda = '';
let subTot = 0;
let envio = 0;
let radios = document.getElementsByClassName('envios');


const showCart = (array) => {


    let contenido = '';

    document.getElementById('producto').innerHTML = `
       
       <br>
       <div class="container">
        <div class="row justify-content-center align-item-center">
            <div class='col'>
            </div>
            <div class='col'>
                <b>Producto</b>
            </div>
            <div class='col'>
                <b>Cantidad</b>
            </div>
            <div class='col'>
                <b>Precio unitario</b>
            </div>
            <div class='col'>
            </div>
        </div>
        </div>
        <br>
        `

    for (let i = 0; i < array.articles.length; i++) {


        array.articles[i].id = i;




        if (array.articles[i].currency === 'UYU') {
            costo = parseInt(array.articles[i].unitCost) / 40;
            moneda = 'USD'


        } else {
            costo = parseInt(array.articles[i].unitCost);
            moneda = array.articles[i].currency;
        }

        subTot += costo * array.articles[i].count;

        contenido += `
        <div class=" row  ">
            <div class='col '>
                <img class="img-fluid img-thumbnail text-center " src="${array.articles[i].src}">
            </div>
            <div class='col'>
                <p>${array.articles[i].name}</p>
            </div>
            <div class='col'>
                <input class="cantidad" type="number" id="${array.articles[i].id}" value="${array.articles[i].count}" min="0" onclick="subTotal()">
                
            </div>
            <div class='col align-content-center'>
            <b>${moneda}$<span class="costo" >${costo}</span></b>
            </div>
            <div class='col '>
            <button class='btn eliminar' onclick='elminarArt(${array.articles[i].id})'><i class="fas fa-trash-alt"></i></button>
            </div>
        </div>
      
            `

    }



    document.getElementById('producto').innerHTML += contenido;
    document.getElementById('productCostText').innerHTML = `
        
        <b>${moneda}$<span id='subtotal'>${subTot}</span></b>
        `

    document.getElementById('envio').innerHTML = `<b>${moneda}$<span id='subTotEnvio'>${calcEnvio().toFixed(1)}</span></b>`

    document.getElementById('total').innerHTML = `<b>${moneda}$<span id='totalCompra'>${subTot + parseFloat(calcEnvio().toFixed(1))}</span></b>`


}

const showPrices = () => {
    document.getElementById('subtotal').innerHTML = subTot;



    document.getElementById('subTotEnvio').innerHTML = calcEnvio().toFixed(1);

    document.getElementById('totalCompra').innerHTML = subTot + parseFloat(calcEnvio().toFixed(1))
}

const subTotal = () => {

    let cantidad = document.getElementsByClassName('cantidad');


    let unidad = document.getElementsByClassName('costo');



    
    for (let i = 0; i < cantidad.length; i++) {

        carrito.articles[i].subTot = cantidad[i].value * parseFloat(unidad[i].innerHTML);


    }
    let arrSub = [];

    for (let i = 0; i < cantidad.length; i++) {

        arrSub.push(carrito.articles[i].subTot)

    }

    console.log(arrSub)

    const reducer = (acc, curr) => acc + curr;

    if (arrSub.length > 0) {
        subTot = arrSub.reduce(reducer);
    }else{
        subTot-=subTot
    }




    console.log(subTot);

    document.getElementById('subtotal').innerHTML = subTot;



    document.getElementById('subTotEnvio').innerHTML = calcEnvio().toFixed(1);

    document.getElementById('totalCompra').innerHTML = subTot + parseFloat(calcEnvio().toFixed(1))



}

const calcEnvio = () => {




    for (let i = 0; i <= radios.length - 1; i++) {
        if (document.getElementById('radio' + i).checked) {
            envio = parseFloat(document.getElementById('radio' + i).value);
            console.log(envio);
            console.log(radios.length)
        };
    };


    return envio * subTot


};

const seleccionBanco = () => {
    let camposTarjeta = document.getElementsByClassName('tarjeta');
    let camposBanco = document.getElementsByClassName('banco');

    for (let i = 0; i < camposTarjeta.length; i++) {
        camposTarjeta[i].disabled = true
    }
    for (let i = 0; i < camposBanco.length; i++) {
        camposBanco[i].disabled = false
    }
}

const seleccionTarjeta = () => {
    let camposTarjeta = document.getElementsByClassName('tarjeta');
    let camposBanco = document.getElementsByClassName('banco');

    for (let i = 0; i < camposBanco.length; i++) {
        camposBanco[i].disabled = true
    }
    for (let i = 0; i < camposTarjeta.length; i++) {
        camposTarjeta[i].disabled = false
    }
}

const seleccionAbitab = () => {
    let camposTarjeta = document.getElementsByClassName('tarjeta');
    let camposBanco = document.getElementsByClassName('banco');

    for (let i = 0; i < camposBanco.length; i++) {
        camposBanco[i].disabled = true
    }
    for (let i = 0; i < camposTarjeta.length; i++) {
        camposTarjeta[i].disabled = true
    }
}


const compreRealizada = () => {

    Swal.fire({
        title: 'Compra exitosa!',
        icon: 'success',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

const compraError = () => {

    Swal.fire({
        title: 'Hay errores en los campos!',
        icon: 'error',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

const elminarArt = (articulo) => {
    carrito.articles.splice(articulo, 1)



    showCart(carrito);

    subTotal()
    showPrices()
    console.log(subTot)


}

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(cartDes).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;

            showCart(carrito);
            calcEnvio();
            seleccionTarjeta();


        }
    });

    document.getElementById('radio0').addEventListener('change', () => {
        showPrices();
    });
    document.getElementById('radio1').addEventListener('change', () => {
        showPrices();
    });
    document.getElementById('radio2').addEventListener('change', () => {
        showPrices();

    });

});