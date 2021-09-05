document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("off").addEventListener("click", function() {
        localStorage.clear();
    })
    var arreglar = JSON.parse(localStorage.getItem("login"));
    var nombre = arreglar[0].usuario;
     document.getElementById("nav").innerHTML += " " + nombre;
     
})