document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("off").addEventListener("click", function() {
        localStorage.clear();
    });
    var arreglo = JSON.parse(localStorage.getItem("login"));
    var nombre = arreglo[0].usuariovalue;
     document.getElementById("navDropdown").innerHTML += " " + nombre;
});