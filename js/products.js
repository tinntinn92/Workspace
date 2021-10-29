var categoriesArray = [];
let filtrada= [];
var minCount = undefined;
var maxCount = undefined;

const buscador = () => {

    let input = document.getElementById('input').value;
    filtrada=categoriesArray.filter(function(producto){
        return (producto.name.toLowerCase().indexOf(input.toLowerCase())>-1) || (producto.description.toLowerCase().indexOf(input.toLowerCase())>-1);
    });

    showCategoriesList(filtrada);
}

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let category of array ) {
        

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {

            htmlContentToAppend += `

            <div class="col-md-4">
            
            <div class="card mb-4 shadow-sm">
                <div class="card-img">
                    <img src="${category.imgSrc}" class="img-fluid">
                </div>
                <div class="card-body">
                    <b>${category.name}</b>
                    <p class="card-text">${category.description}</p>
                    <p>${category.currency}$${category.cost}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <a  class="btn btn-sm btn-outline-secondary" href="product-info.html">Info</a>
                    <a class="btn btn-sm btn-outline-secondary">Agregar <i class="fas fa-cart-plus"></i></a>
                  </div>
                  <small class="text-muted">${category.soldCount} vendidos</small>
                </div>
              </div>
            </div>
          </div>
     
        `

            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        }
    }
}

const ordRel = () => {
    categoriesArray.sort(function (a, b) {
        return b.soldCount - a.soldCount;
    });

    showCategoriesList(categoriesArray);
}

const ordPrecio = () => {
    categoriesArray.sort(function (a, b) {
        return b.cost - a.cost;
    });

    showCategoriesList(categoriesArray)
}

const ordPrecioDes = () => {
    categoriesArray.sort(function (a, b) {
        return a.cost - b.cost;

    })
    showCategoriesList(categoriesArray)
}


document.getElementById("rangeFilterCount").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
        minCount = parseInt(minCount);
    }
    else {
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
        maxCount = parseInt(maxCount);
    }
    else {
        maxCount = undefined;
    }

    showCategoriesList(categoriesArray);
});

document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showCategoriesList(categoriesArray);
});






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
        }
    });

    document.getElementById('input').addEventListener('keyup',()=>{
        buscador()
    });
});

