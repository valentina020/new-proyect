let productosCarrito=[];


//Funcion que actualiza el subtotal cuando cambia la cantidad. 
function subtotalProduct(precio, cantidad, subtotalId, tipoMoneda){

    if (tipoMoneda == "USD")
    {
        document.getElementById(subtotalId).innerHTML = cantidad*precio * 43;
    }

    else
    {
        document.getElementById(subtotalId).innerHTML = cantidad*precio;
    }

    precioFinal();
    totalPrecio();
}

function total()
{
    let htmlToAppend = "";
    htmlToAppend += `
    <tr>    
    <td></td>
    <td class="align-middle"></td>
    <td class="align-middle"></td>
    <td class="align-middle"></td>
    <td class="align-middle tabletext"><b>Total</b> <p id="total"> </p></td>
    </tr>`


    document.getElementById("carrito").innerHTML += htmlToAppend;
}


function carrito(){ //Muestra el carrito cargando elemento por elemento desde el JSON
    let htmlToAppend = "";
    let id = 0;
    let subtotalPrice; 
    
    for(let article of productosCarrito){ //Carga elementos

        if (article.currency == "USD")
            subtotalPrice = parseInt(article.unitCost) * parseInt(article.count) * 43; //Funciona para hacer el calculo del subtotal inicial para dolares
        else 
            subtotalPrice = parseInt(article.unitCost) * parseInt(article.count); //Funciona para hacer el calculo del subtotal inicial para pesos
    
        document.getElementById("precioTotalSubtotal").innerHTML = subtotalPrice;

        htmlToAppend += `
        <tr>
        <td><img src="${article.src}" class = "img-fluid tabletext" style ="max-width:50px!important"></td>
        <td class="align-middle tabletext">${article.name}</td>
        <td class="align-middle tabletext">${article.currency} ${article.unitCost}</td>
        <td class="align-middle tabletext"><input type="number" style="width: 50px;" min ="1" onchange="subtotalProduct(this.value, ${article.unitCost}, ${id}, '${article.currency}');" value=${article.count}></td>
        <td class="subt align-middle tabletext" id="${id}">${subtotalPrice}</td>
        </tr>`
        id++;              
                       
       
    }
    document.getElementById("carrito").innerHTML += htmlToAppend;

    precioFinal();
    total(); //Muestra el total de los productos
    totalPrecio(); //actualiza el precio total

}

function precioFinal() //Funcion que actualiza el precio final al final de la pag
{
    const envios = document.querySelectorAll('input[name="shippingType"]'); 
            let selectedValue;
            for (const envio of envios) { 
                if (envio.checked) { //Se fija para cada tipo de envio si uno esta seleccionado y guarda su valor
                    selectedValue = envio.value;
                    break;
                }
            }

    document.getElementById("precioEnvio").innerHTML = parseInt(document.getElementById("precioTotalSubtotal").innerHTML) * parseFloat(selectedValue); //calcula el añadido del tipo de envio
    document.getElementById("precioTotalTotal").innerHTML = parseInt(document.getElementById("precioEnvio").innerHTML) + parseInt(document.getElementById("precioTotalSubtotal").innerHTML); //calcula el precio final

}



function getCarrito(url) {
    
    return fetch(url)
    .then(respuesta=>{
        return respuesta.json();
    })
    
}

function totalPrecio() {
    let sum = 0;
    let subtotals = document.getElementsByClassName("subt");

    for (let sub of subtotals)
    {
        sum += parseInt(sub.innerHTML);
    }

    document.getElementById("total").innerHTML = sum;
    document.getElementById("precioTotalSubtotal").innerHTML = sum;
}



document.addEventListener("DOMContentLoaded", function(e){
    getCarrito("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    .then(respuesta=>{
        productosCarrito = respuesta.articles; //Guarda los articulos del carrito en carrito
        precioFinal();
        carrito(); 
    })
})

$('input[type=radio][name="shippingType"]').change(function() { 
    precioFinal();
});

function validarFields() { //Funcion que sirve para saber si se puede hacer la compra
     
    let numberTarj = document.getElementById("tarjeta").value;
    let fechaVenc = document.getElementById("fechaVenc").value;
    let cvc = document.getElementById("cvc").value;
    let metodoDeEnvio = document.getElementById("form-check-input").value;

    if (numberTarj > 0 && fechaVenc > 0 && cvc > 0 && metodoDeEnvio > 0)
        return true;
    else {
        alert ("Error: Complete todos los campos")
          return false;
    }
}




