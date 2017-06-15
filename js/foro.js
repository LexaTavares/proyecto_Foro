var api = {
  url: "http://examen-laboratoria-sprint-5.herokuapp.com/topics"
}

var $seccionVacia = $("#topics-vacio");

var cargarTemas = function() {
  $.getJSON(api.url, function(temas) {
    temas.forEach(crearTema);

  });
};

// se crea tabla con datos obtenbidos de api
var crearTema = function(tema) {
  var nombre = tema.author_name;
  var contenido = tema.content;
  var id = tema._id;
  var $tr = $("<tr />", {
    "data-id": id
  });
  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);
  var $estadoTd = $("<td />");
  $estadoTd.text(contenido);

  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $seccionVacia.append($tr);
};

// se agrea tarea creada por usuario
var agregarTema = function(e) {
  e.preventDefault();
  var nombre = $('#nombreTema').val();
  var contenido = $('#valorTexto').val();
  $.post(api.url, {
    author_name: nombre,
    content: contenido
  }, function(tema) {
    crearTema(tema);
    $('#modal1').modal('close');
  });
};


var cargarPagina = function() {
  $('.modal').modal();
  cargarTemas();
  $('#formulario').submit(agregarTema);
};
$(document).ready(cargarPagina);
