(function () {
  "use strict";

  var regalo = document.getElementById('regalo');

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{6,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
  }

  const validaciones = {

  }

  document.addEventListener('DOMContentLoaded', function () {


    //DATOS DEL USUARIO
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var email = document.getElementById('email');
    var datosUsuario = [nombre, apellido, email]




    //CAMPOS DE LOS PASES

    var pase_por_dia = document.getElementById('pase_por_dia');
    var pase_dos_dias = document.getElementById('pase_dos_dias');
    var pase_completo = document.getElementById('pase_completo');
    var dias = [pase_por_dia, pase_dos_dias, pase_completo];

    //BOTONES Y ERROR
    var errorDiv = document.getElementById('error');
    var calcular = document.getElementById('calcular');
    var btnRegistro = document.getElementById('btnRegistro');
    var resumen = document.getElementById('lista-productos');
    var total = document.getElementById('suma-total');

    //EXTRAS
    var camisa = document.getElementById('camisa');
    var etiquetas = document.getElementById('etiquetas');



    //  EVENTOS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    datosUsuario.forEach(datos => {
      datos.addEventListener('click', validarUsuario);
      datos.addEventListener('keyup', validarUsuario);
    });

    dias.forEach(dia => {
      dia.addEventListener('blur', diaSeleccionado);
      dia.addEventListener('change', diaSeleccionado);
    });

    calcular.addEventListener('click', calcularMonto);




    //  FUNCIONES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function calcularMonto(e) {
      e.preventDefault();

      if (regalo.value === "") {
        alert("Por favor, debe de seleccionar un regalo");

      } else {
        var paseDia = parseInt(pase_por_dia.value, 10) || 0;
        var pase2Dias = parseInt(pase_dos_dias.value, 10) || 0;
        var paseCompleto = parseInt(pase_completo.value, 10) || 0;
        var cantidadCamisas = parseInt(camisa.value, 10) || 0;
        var cantidadEtiquetas = parseInt(etiquetas.value, 10) || 0;

        var totalPagar = (paseDia * 30) + (pase2Dias * 40) + (paseCompleto * 50) + ((cantidadCamisas * 10) * .93) + (cantidadEtiquetas * 2);
        totalPagar.toFixed(2);

        var listado = [];

        if (paseDia >= 1) {
          listado.push(`Pase por día: ${paseDia}`);

        }
        if (pase2Dias >= 1) {
          listado.push(`Pase por 2 días: ${pase2Dias}`);
        }
        if (paseCompleto >= 1) {
          listado.push(`Pase completo: ${paseCompleto}`);
        }
        if (cantidadCamisas >= 1) {
          listado.push(`Camisas: ${cantidadCamisas}`);
        }
        if (cantidadEtiquetas >= 1) {
          listado.push(`Etiquetas: ${cantidadEtiquetas}`);
        }
        limpiarResumenHTML();
        for (let i = 0; i < listado.length; i++) {
          var p = document.createElement('p');
          p.textContent = listado[i];
          resumen.appendChild(p);
        }
        //  console.log(listado);

        limpiarTotalHTML();
        var pt = document.createElement('p');
        pt.textContent = totalPagar;
        total.appendChild(pt);
      }
    } //calcular monto

    function limpiarResumenHTML() {
      while (resumen.firstChild) {
        resumen.removeChild(resumen.firstChild);
      }
    } //limpiar HTML de resumen 

    function limpiarTotalHTML() {
      while (total.firstChild) {
        total.removeChild(total.firstChild);
      }
    } //limpiar HTML de resumen 


    function validarUsuario(e) {
      var dato = e.target.value;
      var input = e.target;
      const {
        nombre,
        correo
      } = expresiones;

      switch (e.target.id) {
        case "nombre":
          if (nombre.test(dato)) {
            if (input.classList.contains('no-borde')) {
              addClases(input);
            } //if contains
          } else {
            if (input.classList.contains('no-borde') || input.classList.contains('borde-success')) {
              removeClases(input);
            } //if else contains
          } //else if test
          break;

        case "apellido":
          if (nombre.test(dato)) {
            if (input.classList.contains('no-borde')) {
              addClases(input);
            } //if contains
          } else {
            if (input.classList.contains('no-borde') || input.classList.contains('borde-success')) {
              removeClases(input);
            } //if else contains
          } //else if test
          break;

        case "email":
          if (correo.test(dato)) {
            if (input.classList.contains('no-borde')) {
              addClases(input);
            } //if contains
          } else {
            if (input.classList.contains('no-borde') || input.classList.contains('borde-success')) {
              removeClases(input);
            } //if else contains
          } //else if test
          break;

        default:
          console.error("algo salió mal");
          break
      }

    } // validar formulario

    function addClases(input) {
      document.getElementById('error-usuario').style.display = 'none';
      input.classList.remove('borde-error');
      input.classList.add('borde-success');
    }

    function removeClases(input) {
      input.classList.remove('borde-success');
      input.classList.add('borde-error');
      document.getElementById('error-usuario').style.display = 'block';
    }


    function diaSeleccionado(e) {
      var dia = e.target.id;
      var valor = parseInt(e.target.value, 10) || 0;
      if (isNaN(valor)) {
        alert("debes de introducir solo números");
      } else {
        switch (dia) {
          case ("pase_por_dia"):
            if (valor >= 1) {
              document.getElementById('viernes').style.display = 'grid';
            } else {
              document.getElementById('viernes').style.display = 'none';
            }
            break;

          case ("pase_dos_dias"):
            if (valor >= 1) {
              document.getElementById('viernes').style.display = 'grid';
              document.getElementById('sabado').style.display = 'grid';
            } else {
              document.getElementById('viernes').style.display = 'none';
              document.getElementById('sabado').style.display = 'none';
            }
            break;
          case ("pase_completo"):
            if (valor >= 1) {
              document.getElementById('viernes').style.display = 'grid';
              document.getElementById('sabado').style.display = 'grid';
              document.getElementById('domingo').style.display = 'grid';
            } else {
              document.getElementById('viernes').style.display = 'none';
              document.getElementById('sabado').style.display = 'none';
              document.getElementById('domingo').style.display = 'none';
            }
            break;

          default:
            break;
        }

      } //else

    } // diaSeleccionado






  }); //DOMContentLoaded

})();



$(function(){

//BARRA
var pantallaHeight = $(window).height();
var barraHeight = $('.barra').innerHeight();

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  // console.log(scroll);
  if(scroll >= pantallaHeight){
    $('.barra').addClass('fixed');
    $('body').css({'margin-top': barraHeight+'px'});
  }else{
    $('.barra').removeClass('fixed');
    $('body').css({'margin-top':'0px'});
  }
});


$('.menu-responsive').on('click',  () =>{
  console.log("hola")
  // $('.responsive').css({'display':'block'}).fadeIn(1000);
  $('.navegacion-principal').slideToggle();
});



  //TITULO
  $('.letras').lettering();
  
//SECCION DEL PROGRAMA

  $('.ocultar').hide();
  $('.contenido-programa .info-evento:first').show();
  $('.navegacion-programas a:first').addClass('activado');

  $('.navegacion-programas a').on('click', function(){
    $('.navegacion-programas a').removeClass('activado');
    $(this).addClass('activado');
    $('.ocultar').hide();
    let enlace = $(this).attr('href');
    $(enlace).fadeIn(1000);
    // $(enlace).show();
    return false;
  });

  //CONTADOR DE INVITADOS
    $('.contador-invitados li:nth-child(1) p').animateNumber({number: 6}, 1500);
    $('.contador-invitados li:nth-child(2) p').animateNumber({number: 15}, 1500) 
    $('.contador-invitados li:nth-child(3) p').animateNumber({number: 3}, 1500);
    $('.contador-invitados li:nth-child(4) p').animateNumber({number: 9}, 1500);


    
  //CONTADOR DE TIEMPO
  // $('.contador-dias').countdown('2020/12/31 11:59:59', function(event) {
  //   $('#dias').html(event.strftime('%D'));
  //   $('#horas').html(event.strftime('%H'));
  //   $('#minutos').html(event.strftime('%M'));
  //   $('#segundos').html(event.strftime('%S'));
  // });


}); //JQUERY