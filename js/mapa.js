document.addEventListener('DOMContentLoaded', function(){
    
    //CARGANDO MAPA PARA LA 
    var map = L.map('mapa').setView([19.406616, -98.93447], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([19.406616, -98.93447]).addTo(map)
      .bindPopup('LUGAR DEL EVENTO: DEPORTIVO BOTAFOGO')
      .openPopup();


});