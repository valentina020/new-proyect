//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

  let desafiate = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
  let valor = document.getElementsByClassName("cantidad");
  let subtotalInd = document.getElementsByClassName("subtotal");
  let subtotalCart = document.getElementsByClassName("subtotalCart");
  let totalCart = document.getElementsByClassName("totalCart");
  let tbody = document.getElementById("table-body");
  let metodoDeEnvio = document.getElementsByClassName("form-check-input");
  let metodoDePago = document.getElementsByClassName("pagoInput");
  //Funcion principal
  carrito(desafiate);


  //Con esta funcion cambiamos los valores del carrito en tiempo real.
  function cambiarValores(info) {
    let array = [200, 500000]; 
    let total = 0;
    for (let i = 0; i < valor.length; i++) {
      valor[i].addEventListener("keyup", (evento) => {
        if (evento.key == "Backspace" || evento.key == "-" || evento.key == "+" || evento.key == "." || evento.key == ",") { 
          subtotalInd[i].innerHTML = "$0";
          valor[i].value = "";
          array[i] = 0;
        }
        else {
          if (info[i].currency == "USD") { 
            subtotalInd[i].innerHTML = `$${valor[i].value * info[i].unitCost * 40}`;
            array[i] = valor[i].value * info[i].unitCost * 40;
          }
          else { 
            subtotalInd[i].innerHTML = `$${valor[i].value * info[i].unitCost}`;
            array[i] = valor[i].value * info[i].unitCost;
          }
        }
        total = array[0] + array[1];
        subtotalCart[0].innerHTML = `$${total}`
        totalCart[0].innerHTML = `$${total}`
        //Actualizo subtotal y total.
      })
    }
  }

  //Mostrar carrito inicial con desafiate.
  async function carrito(url) {
    tbody.innerHTML = "";
    let info = await getJSONData(url); //Hago una peticion a un JSON
    info = info.data.articles; //Arreglo de objetos
    let total = 0;
    for (let i = 0; i < info.length; i++) {//Muestro todos los elementos.
      let precioUnitario = info[i].unitCost;
      let moneda = info[i].currency;
      let cantidad = info[i].count;
      let subtotal = precioUnitario * cantidad;
      if (moneda == "USD") {
        subtotal *= 40;
        precioUnitario *= 40;
      }
      total += subtotal;
      tbody.innerHTML += `<tr class= "product-row">
        <td class="col-sm-8 col-md-6">
          <div class="media">
            <a class="thumbnail pull-left" href="#"> <img class="media-object"
                src="${info[i].src}"
                style="width: 72px; height: 72px; margin-right:10px;"> </a>
            <div class="media-body">
              <h4 class="media-heading"><a href="#">${info[i].name}</a></h4>
              <h5 class="media-heading"> by <a href="#">Jap Ecommerce</a></h5>
              <span>Estado: </span><span class="text-success"><strong>En Stock</strong></span>
            </div>
          </div>
        </td>
        <td class="col-sm-1 col-md-1" style="text-align: center">
          <input type="number" min="0" class="form-control cantidad" value="${cantidad}">
        </td>
        <td class="col-sm-1 col-md-1 text-center"><strong>$${precioUnitario}</strong></td>
        <td class="col-sm-1 col-md-1 text-center"><strong class="subtotal">$${subtotal}</strong></td>
      </tr>`;
    }
    tbody.innerHTML += `
    <tr>
      <td> <h5> Tipo de envio: </h5>  </td>
      <td> <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked>
      <label class="form-check-label" for="inlineRadio1"> <strong> Gold (13%) </strong></label>
    </div>  </td>
      <td> <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
      <label class="form-check-label" for="inlineRadio2"> <strong>Premium (7%) </strong></label>
    </div> </td>
      <td> <div class="form-check form-check-inline">
      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" >
      <label class="form-check-label" for="inlineRadio3"> <strong>Estandar (3%)</strong> </label>
    </div></td>
    </tr>

    <tr>
      <td> <h5> Metodo de pago: </h5>  </td>
      <td> <div class="form-check form-check-inline">
      <input class="pagoInput" type="radio" name="opcionPago" id="pagoInput1" value="option1" checked>
      <label class="form-check-label" for="pagoInput1"> <strong> Paypal </strong></label>
    </div>  </td>
      <td> <div class="form-check form-check-inline">
      <input class="pagoInput" type="radio" name="opcionPago" id="pagoInput2" value="option2">
      <label class="form-check-label" for="pagoInput2"> <strong>Mastercard </strong></label>
    </div> </td>
      <td> <div class="form-check form-check-inline">
      <input class="pagoInput" type="radio" name="opcionPago" id="pagoInput3" value="option3" >
      <label class="form-check-label" for="pagoInput3"> <strong>Visa</strong> </label>
    </div></td>
    </tr>
    
    
      <tr>
        <td>   </td>
        <td>   </td>
        <td>   </td>
        <td>
          <h5>Subtotal</h5>
        </td>
        <td class="text-right">
          <h5><strong class="subtotalCart"> $${total}</strong></h5>
        </td>
      </tr>
      <tr>
        <td>   </td>
        <td>   </td>
        <td>   </td>
        <td>
          <h3>Total</h3>
        </td>
        <td class="text-right">
          <h3 ><strong class="totalCart">$${total}</strong></h3>
        </td>
      </tr>
      <tr>
        <td>   </td>
        <td>   </td>
        <td>   </td>
        <td>   </td>
        <td>
          <button onclick="location.href='sell.html'" type="button" id="comprar" class="btn btn-success">
            Comprar <span class="glyphicon glyphicon-play"></span>
          </button>
        </td>
      </tr>`;
    cambiarValores(info); //invoco a la funcion de cambiar valores en tiempo real
  }
});



