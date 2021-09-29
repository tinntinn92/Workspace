let productInfo = {};
let productComent = [];
let categoriesArray= [];

const showProduct = (producto) => {


    document.getElementById('producto').innerHTML = `
    
        <section class="text center">
            <div class="row">
                <div class="container text-center">
                    <h1 class="jumbotron-heading">`+ producto.name + `</h1>
                        <p class="lead text-muted">
                        `+ producto.description + `
                        </p>
                    <h4> Por solo `+ producto.currency +`$` +producto.cost + `</h4>
                </div>
            </div>
        </section>


        
        <div class='row justify-content-center'>
            <a href='`+ producto.images[0] + `' target='_blank'><img src='` + producto.images[0] + `' class='img-thumbnail'> </a>
        </div>
    
   `

}


const showGaleria = (producto) => {
let galeria= `<br><h3 class="text-center">Galeria</h3><br>
<div class="tz-gallery">
<div class="row"> `;

for(let i=1; i<producto.images.length; i++){

    galeria+=`<div class="col-sm-3 col-md-3">
    <a href="`+ producto.images[i] + `" target="_blank"><img src="` + producto.images[i] + `" class="img-thumbnail"></a>
</div>`
};

    document.getElementById('galeria').innerHTML = galeria + `
       
    
        
    
    </div>
</div>
`
};

const showRel = (producto, relacionados) =>{
   
    

    let autoRel = `
    <br>
    <h3 class='text-center'>Productos Relacionados</h3> 

    <div class='container'>
        <div class='row justify-content-center'>
        
    ` 

    for(let i=0; i<producto.relatedProducts.length; i++){

        let auto=producto.relatedProducts[i];

        autoRel+=`
            <div class='col-4'>
                <img src='${relacionados[auto].imgSrc}' class='img-thumbnail'>
                <p>${relacionados[auto].name} ${relacionados[auto].currency}$${relacionados[auto].cost} </p>

                
            
            
        </div>      
        `



        };

        document.getElementById('relacionados').innerHTML= autoRel + `
            </div>
    </div>
        `
    }





const califica = (num) => {

    let estrellas = ``;

    for (let i = 1; i <= 5; i++) {

        if (i <= num) {
            estrellas += `<i class="fas fa-star coment"></i>`
        }
        else {

            estrellas += `<i class="far fa-star coment"></i>`
        }
    }

    return estrellas

}

const showComents = (comentario) => {



    let coment = '<br><h3 class="text-center">Comentarios</h3><br>';

    for (let prop of comentario) {
        coment += `
        <div class="list-group-item ">
            <div class="row">
                <div class="col-3 ">
                    <img src="`+ imgComent(prop) + `" id="perfilComent" class="rounded mx-auto d-block"><h5 class="text-center">` + prop.user + `</h5>
                </div>
                <div class="col-5 ">
                    <p> `+ prop.description + ` </p>
                </div>
                <div class='col-3'>
                    <small class='text-muted'> `+ prop.dateTime + ` </small>
                    <p> ` + califica(prop.score) + ` </p>
                </div>
            </div>
        </div>
        
        `

        document.getElementById("comentarios").innerHTML = coment;
    }


};

const imgComent = (objeto) => {
    if (typeof objeto.imagen === 'undefined') {
        return "img/perfilUsuario.jpg";
    } else {
        return objeto.imagen;
    }

}

const newComent = () => {

    let comentario = {};
    let local = JSON.parse(localStorage.getItem('datos'));
    const fecha= new Date;

    comentario.description = document.getElementById('comentario').value;
    comentario.user = local.usuario;
    comentario.imagen = local.img;
    comentario.dateTime = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`
    
    for(let i=1; i<=5; i++){
        if(document.getElementById('radio'+i).checked){
            comentario.score= document.getElementById('radio'+i).value;
        };
    };

    productComent.unshift(comentario);

    console.log(comentario);

    showComents(productComent);
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;

            showProduct(productInfo);
            showGaleria(productInfo);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComent = resultObj.data;

            showComents(productComent);
        }
    })

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;

           showRel(productInfo,categoriesArray);
        }
    });

});