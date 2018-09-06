class Usuario{
    constructor(objres){
        this.user = objres.user;
        this.pass = objres.pass;
        this.nombre = objres.nombre;
        var excursiones = [];
        $.each(objres.excursion, function(i, resultado){
            var objexcursion = new Excursion();    
                objexcursion.llenarobj(resultado);       
            excursiones.push(objexcursion);  
        })
        
        this.excursion = excursiones;
    }
}


class Excursion{

    llenarobj(resultado){
        
        this.titulo = resultado.titulo;
        this.descripcion = resultado.descripcion;
        this.portada = resultado.portada;
        this.creditos = resultado.creditos;
         var pasos = [];
        $.each(resultado.pasos, function(i, respasos){
            var objpasos = new Pasos();    
                objpasos.llenarobjpasos(respasos);       
            pasos.push(objpasos);  
        })
        
        this.pasos = pasos; 
        
        
    }
    llenarattr(titulo,descripcion,creditos,portada,pasos){
        
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.portada = portada;
        this.creditos = creditos;
        this.pasos = pasos; 
        
        
    }
}

class Pasos{
    
    llenarobjpasos(respasos){
        this.video = respasos.video;
        
        var objactividad = new Actividad();    
        objactividad.llenarobjactividad(respasos.actividad);       
          
        this.actividad = objactividad; 
    }
    
    llenarattrpasos(video,actividad){
        this.video = video;
        this.actividad = actividad; 
    }
    
}

class Actividad{
    
    
      
    llenarobjactividad(objactividad){
        this.audio = objactividad.audio;
        this.imagen1 = objactividad.imagen1;
        this.imagen2 = objactividad.imagen2;
        this.imagen3 = objactividad.imagen3;
        this.respuesta = objactividad.respuesta;
    }
    llenarattractividad(audio,imagen1,imagen2,imagen3,respuesta){
        this.audio = audio;
        this.imagen1 = imagen1;
        this.imagen2 = imagen2;
        this.imagen3 = imagen3;
        this.respuesta = respuesta;
    }
  
}
//var fileExtensionV;
//$('#video').change(function () {
//    alert(fileExtensionV);
//    //obtenemos un array con los datos del archivo
//    var file = $("#video")[0].files[0];
//    //obtenemos el nombre del archivo
//    var fileName = file.name;
//    //obtenemos la extensión del archivo
//    fileExtensionV = fileName.substring(fileName.lastIndexOf('.') + 1);
//    //obtenemos el tamaño del archivo
//    var fileSize = file.size;
//    //obtenemos el tipo de archivo image/png ejemplo
//    var fileType = file.type;
//    //mensaje con la información del archivo
//    //showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
//    
//});
// var fileExtensionP;
//$('#imgPortada').change(function () {
//    //obtenemos un array con los datos del archivo
//    var file = $("#imgPortada")[0].files[0];
//    //obtenemos el nombre del archivo
//    var fileName = file.name;
//    //obtenemos la extensión del archivo
//    fileExtensionP = fileName.substring(fileName.lastIndexOf('.') + 1);
//    //obtenemos el tamaño del archivo
//    var fileSize = file.size;
//    //obtenemos el tipo de archivo image/png ejemplo
//    var fileType = file.type;
//});
//var fileExtensionA;
//$('#audio').change(function () {
//    //obtenemos un array con los datos del archivo
//    var file = $("#audio")[0].files[0];
//    //obtenemos el nombre del archivo
//    var fileName = file.name;
//    //obtenemos la extensión del archivo
//    fileExtensionA = fileName.substring(fileName.lastIndexOf('.') + 1);
//    //obtenemos el tamaño del archivo
//    var fileSize = file.size;
//    //obtenemos el tipo de archivo image/png ejemplo
//    var fileType = file.type;
//});
//var fileExtensionI;
//$('#imagen').change(function () {
//    //obtenemos un array con los datos del archivo
//    var file = $("#imagen")[0].files[0];
//    //obtenemos el nombre del archivo
//    var fileName = file.name;
//    //obtenemos la extensión del archivo
//    fileExtensionI = fileName.substring(fileName.lastIndexOf('.') + 1);
//    //obtenemos el tamaño del archivo
//    var fileSize = file.size;
//    //obtenemos el tipo de archivo image/png ejemplo
//    var fileType = file.type;
//});
//var arrVideos=[];
function subirVideo(btnV){
    var valor= btnV.getAttribute("id");
    var formData = new FormData($(".formularioVideo"+valor)[0]);
    
    $.ajax({
        url: '/subir',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            //if (isImage(fileExtensionV)) {
                //$("#di"+valor).html("<img  class='imgPregunta' id='videoExcursion' src='../excursiones/"+data+"'></img>")}
                $("#di"+valor).html("<video id='videoExcursion' class='styleVideo' control><source src='../excursiones/"+data+"' type='video/mp4'></video>")
        }
      //  }
    });
};

function subirAudio(btnA){
    var valor= btnA.getAttribute("id");
    var formData = new FormData($(".formularioAudio"+valor)[0]);
    
    $.ajax({
        url: '/subir',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            //alert(data);
            //if (isImage(fileExtensionA)) {
                //alert(valor);
                //arrVideos.push();
                $("#divAudio"+valor).html("<audio class='styleAudio' controls><source src='../excursiones/"+data+"' type='audio/mp3' ></audio>")
            //}
        }
    });
};
function subirImagen(btnI){
    var valor= btnI.getAttribute("id");
    var formData = new FormData($(".formularioImagenes"+valor)[0]);
    
    $.ajax({
        url: '/subir',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            //alert(data);
         //   if (isImage(fileExtensionI)) {
                //alert(valor);
                //arrVideos.push();
                $("#div"+valor).html("<img class='imgPregunta' src='../excursiones/"+data+"'></img>")
            //}
        }
    });
};

$('.añadirPortada').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioPortada")[0]);
    var message = "";
    //alert(formData);
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            
                $("#divPortada").html("<img id='portada' src='../excursiones/"+data+"'></img>")
        },
        //si ha ocurrido un error
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
});
$('.añadirAvatar').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAvatar")[0]);
    var message = "";
    //alert(formData);
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            
                $("#divAvatar").html("<img id='avatar' src='../excursiones/"+data+"' width='150px'></img>")
        },
        //si ha ocurrido un error
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
});
//function isImage(extension) {
//    switch (extension.toLowerCase()) {
//        case 'jpg':
//        case 'gif':
//        case 'png':
//        case 'jpeg':
//            return true;
//            break;
//        case 'mp3':
//        case 'wav':
//        case 'mp4':
//        case 'm4a':
//        case 'ogg':
//            return true;
//            break;
//        default:
//            return false;
//            break;
//    }
//};

function listarExcursion(){
    //alert(localStorage.getItem("varidAlumno"));
    formData={
        idalumno:localStorage.getItem("varidAlumno")
    }
    $.ajax({
        url: '/fcargaralumnoporid',
        type: 'POST',
        data: formData,
        cache: false,
        success: function (data) {
            console.log(data);
            $("#avatar").attr("src",data[0].avatar);
            $("#nombre").html(data[0].nombre);
            $("#puntaje").html(data[0].puntaje);
     
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    $.ajax({
        url: '/flistarexcursiones',
        type: 'GET',
        //data solo usas si vas a enviar algo con post
        //data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            $("#datosalumno").html("<img src='"+data.avatar+"' alt='Logo'><h1>"+data.nombre+"</h1>");
            $("#puntaje").html(data.puntaje);
            $("#avatar").attr("src",data.avatar);
            $.each(data, function(i, result){
            $("#listexcursion").append("<div class='col-md-4 col-sm-4'><div><button onclick='pasaralumnoexcursion("+result.id+")'><img class='listaimg' src='"+result.portada+"'/><h1>"+result.titulo+"</h1></button></div></div>");
        });
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    
};

function listarExcursionUsuario(){
    //alert(localStorage.getItem("varidAlumno"));
    var idusers=1;
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusers
        },
        cache: false,
        success: function (data) {
            $("#nombre").html(data[0].nombre);
     
        }
    });
    $.ajax({
        url: '/flistarexcursionesporusuario',
        type: 'POST',
        data: {
            idusuario:idusers
        },
        cache: false,
        success: function (data) {
            $.each(data, function(i, result){
            $("#listexcursion").append("<div class='col-md-4 col-sm-4'><div><button onclick='pasarusuarioexcursion("+result.id+")'><img class='listaimg' src='"+result.portada+"'/></button><h1>"+result.titulo+"</h1><p>"+result.descripcion+"</p><button onclick='pasarEditar("+result.id+")'>Editar</button><button onclick='pasarEliminar("+result.id+")'>Eliminar</button></div></div>");
        });
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    
};

function cargarIndex(){
    $.ajax({
        url: '/flistaralumnos',
        type: 'GET',
        //data solo usas si vas a enviar algo con post
        //data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            $.each(data, function(i, result){
            $("#listaralumnos").append("<div class='col-md-4 col-sm-4'><div><button onclick='pasarAlumno("+result.id+")'><img class='listaimg' src='"+result.avatar+"'/></button><h1>"+result.nombre+"</h1><p>"+result.puntaje+"</p></button></div></div>");
        });
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    
};

function listarAlumnos(){
    var idusuario="1";
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombre").html(data[0].nombre);
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    $.ajax({
        url: '/flistaralumnos',
        type: 'GET',
        //data solo usas si vas a enviar algo con post
        //data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            $.each(data, function(i, result){
            $("#listaralumnos").append("<div class='col-md-4 col-sm-4'><div><img class='listaimg' src='"+result.avatar+"'/><h1>"+result.nombre+"</h1><p>"+result.puntaje+"</p><button onclick='pasareditarAlumno("+result.id+")'>Editar</button><button onclick='eliminarAlumno("+result.id+")'>Eliminar</button></div></div>");
        });
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    
};
function cargarMenu(){
    //localStorage.getItem("varPasar");
    var idusuario="1";
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombre").html(data[0].nombre);
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
};

function cargarMenuExcursiones(){
    //localStorage.getItem("varPasar");
    var idusuario="1";
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombre").html(data[0].nombre);
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    
};
function cargarAlumno(){
    //localStorage.getItem("varPasar");
    var id=localStorage.getItem("editaridAlumno");
    $.ajax({
        url: '/fcargaralumnoporid',
        type: 'POST',
        data: {
            idalumno:id
        },
        cache: false,
        success: function (data) {
            $("#nombre").attr("value",data[0].nombre);
            $("#puntaje").attr("value",data[0].puntaje);
            $("#divAvatar").html("<img id='avatar' src='"+data[0].avatar+"' width='250px'></img>");
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    
};

function guardareditarAlumno(){
    //localStorage.getItem("varPasar");
    var id=localStorage.getItem("editaridAlumno");
    $.ajax({
        url: '/feditaralumnoporid',
        type: 'POST',
        data: {
            idalumno:id,
            nombre:$("#nombre").val(),
            avatar:$("#avatar").attr("src"),
            puntaje:$("#puntaje").val(),
        },
        cache: false,
        success: function (data) {
            window.location = "/menualumnos";
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
    
};
function recibirExcursion(){
    var posExcursion=localStorage.getItem("varPasar");
    var rol=localStorage.getItem("rol");
    //alert("r: "+rol);
    if(rol==0){
        $("#regresar").attr("href","/listarexcursionesAlumno");
    }else{
        $("#regresar").attr("href","/listarexcursionesUsuario");
    }
    //alert(posExcursion);
    formData={
        idExcursion:posExcursion
    }
   $.ajax({
        url: '/frecibirexcursion',
        type: 'POST',
        //data solo usas si vas a enviar algo con post
        data: formData,
        cache: false,
        success: function (data) {
            $("#tituloLeer").html(data[0].titulo);
            $("#descripcionLeer").html(data[0].descripcion);
            $("#creditosLeer").html(data[0].creditos);
            $("#portadaLeer").attr("src",data[0].portada);
            $.ajax({
                url: '/flistarpasos',
                type: 'POST',
                data: formData,
                cache: false,
                success: function (datapasos) {
                    $.each(datapasos, function(i, resPaso){
                $("#recibirPasos").append("<div class='col-md-12 col-sm-12 videoSolo row'>\
                                            <div class='col-md-4 col-sm-4'><video controls class='listaimg'><source src='"+resPaso.video+"'></video></div>\
                                            <div class='col-md-8 col-sm-8 row'><div class='col-md-12 col-sm-12'><audio controls><source src='"+resPaso.pregunta+"' type='audio/mp3' ></audio></div><br/><div class='col-md-4 col-sm-4'><button class='btnOpcion' onclick='validarRespuesta(this,"+resPaso.respuesta+")'><img id='img1' src='"+resPaso.opciona+"' class='listaimg'></button></div><div class='col-md-4 col-sm-4'><button class='btnOpcion' onclick='validarRespuesta(this,"+resPaso.respuesta+")'><img id='img2' src='"+resPaso.opcionb+"' class='listaimg'></button></div><div class='col-md-4 col-sm-4'><button class='btnOpcion' onclick='validarRespuesta(this,"+resPaso.respuesta+")'><img id='img3' class='listaimg'src='"+resPaso.opcionc+"'></button></div></div>");

                    });
                    
                },
                error: function (data) {
                    alert("error");
                    console.log(data);
                }
            });
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
}

function validarRespuesta(btn, respuesta){
    var padre=btn.parentNode.parentNode;
    if(btn.firstChild.getAttribute("id")=="img"+respuesta){
       $("#divAudiosEx").html("<audio id='correcta' controls autoplay><source src='../audios/bien.wav' type='audio/wav'></audio>");
        
        //console.log(padre.childNodes[2]);
        padre.childNodes[2].firstChild.disabled=true;
        padre.childNodes[3].firstChild.disabled=true;
        padre.childNodes[4].firstChild.disabled=true;
    }else{
       //alert("Respuesta incorrecta, elije la numero "+respuesta);
        $("#divAudiosEx").html("<audio id='incorrecta' controls autoplay><source src='../audios/mal.wav' type='audio/wav' ></audio>");
        padre.childNodes[respuesta+1].firstChild.setAttribute("style","background-color:red");
    }
}
function pasarusuarioexcursion(pos){
    localStorage.setItem("varPasar",pos);
    localStorage.setItem("rol",1);
    window.location = "/excursion";
}
function pasaralumnoexcursion(pos){
    localStorage.setItem("varPasar",pos);
    localStorage.setItem("rol",0);
    window.location = "/excursion";
}
function pasarAlumno(idalumno){
    localStorage.setItem("varidAlumno",idalumno);
    window.location = "/listarexcursionesAlumno";
}
function pasareditarAlumno(idalumno){
    localStorage.setItem("editaridAlumno",idalumno);
    window.location = "/editaralumno";
}
function pasarEditar(pos){
    localStorage.setItem("varPasarEditar",pos);
    window.location = "/editarexcursion";
}
function pasarEliminar(pos){
     $.ajax({
        url: '/feliminarpasos',
        method: 'POST',
        data: {
            "idExcursion": pos
        },
        success: function (data) {
            $.ajax({
                url: '/feliminarexcursion',
                method: 'POST',
                data: {
                    "idExcursion": pos
                },
                success: function (data) {
                    window.location.href="/listarexcursionesUsuario";
                },
                error: function (data) {
                    alert("error");
                    console.log(data);
                }
            });
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
     
}

function eliminarAlumno(posalumno){
     $.ajax({
        url: '/feliminaralumno',
        method: 'POST',
        data: {
            "idalumno": posalumno
        },
        success: function (data) {
            window.location.href="/menualumnos";
        },
        error: function (data) {
            alert("error");
            console.log(data);
        }
    });
     
}
var cantVideos=1;
var cantOpciones=3;
$('#guardarExcursion').click(function () {
    
        var errores=validarDatos();
        if(errores==0){
            var pasos=[];
            var cantOpciones=0;
            formDataEx={
                titulo:$("#titulo").val(),
                creditos:$("#creditos").val(),
                descripcion:$("#descripcion").val(),
                portada:$("#portada").attr('src'),
                idUsuario:1
            }
            
            $.ajax({
                url: '/fguardarExcursion',
                method: 'POST',
                data:formDataEx,
                success: function (data) {
                    $.ajax({
                        url: '/ultimoidEx',
                        method: 'GET',
                        success: function (data) {
                            var idExc=data[0].id;
                            console.log($('.contPaso'));
                            alert("ui: "+idExc);
                            
                            $.each($('.contPaso'), function(i, resAudio){
                             alert("paso");

                              var audio=resAudio.firstElementChild.firstChild.firstChild.getAttribute("src");
                              var img1=$('.contPrg').children()[cantOpciones].firstElementChild.firstChild.getAttribute("src");
                              var img2=$('.contPrg').children()[cantOpciones+1].firstElementChild.firstChild.getAttribute("src");
                              var img3=$('.contPrg').children()[cantOpciones+2].firstElementChild.firstChild.getAttribute("src");
                              cantOpciones=cantOpciones+3;
                              var res= $('.respuesta')[i].value;
                              var video=$('#escenas').children()[i].children[1].firstChild.firstChild.getAttribute("src");
                              formData={
                                  pregunta:audio,
                                  respuesta:res,
                                  pasovideo:video,
                                  opciona:img1,
                                  opcionb:img2,
                                  opcionc:img3,
                                  idexcursion:idExc
                              }
                              console.log(formData);
                              $.ajax({
                                    url: '/fguardarPaso',
                                    type: 'POST',
                                    data: formData,
                                    cache: false,
                                    success: function (datapasos) {
                                        alert("guardopaso");
                                    },
                                      error: function (data) {
                                        alert("errorPaso");
                                        console.log(data);
                                    }
                                });
                              });
                            //window.location.href="/listarexcursiones";
                        }
                    });
                }
            });
            
            
            
        }else{
            alert("Llene todos los campos!");
        }
});

$('#guardarAlumno').click(function () {
            formData={
                nombre:$("#nombre").val(),
                puntaje:$("#puntaje").val(),
                avatar:$("#avatar").attr('src')
            }
            console.log(formData);
            $.ajax({
                url: '/fguardarAlumno',
                method: 'POST',
                data:formData,
                success: function (data) {
                   window.location.href="/menualumnos";
                }
            });
       
});

$('#nuevoVideo').click(function () {
    var errores=validarDatos();
    //alert("nv"+errores);
    if(errores==0){
        if(cantVideos!=5){
            cantVideos++;
            $('#escenas').append("<div class='row crearVI'><div class='col-md-12 col-sm-12'><h2 class='txtportada'>AÑADIR VIDEO</h2></div><div class='col-md-4 col-sm-4 paso' id='div"+cantVideos+"'></div>\
                            <div class='col-md-4 col-sm-4'>\
                            <form enctype='multipart/form-data' class='formularioVideov"+cantVideos+"'>\
                                <input name='archivo' type='file' id='video'/>\
                                <br/><br/>\
                                <input type='button' class='añadirvideo' value='añadir'  id='v"+cantVideos+"' onclick='subirVideo(this)'/><br/>\
                            </form>\
                            </div>\
                            <div class='col-md-12 col-md-offset-12'><br><br>\
                        <h2 class='txtportada'>PLANEA TU ACTIVIDAD</h2>\
                        <div class='row'>\
                          <div class='col-md-8 col-sm-8'>\
                           <h3>PREGUNTA</h3><br>\
                           <div class='row contPaso'>\
                            <div class='col-md-4 col-sm-4' id='divAudioa"+cantVideos+"'></div>\
                           <div class='col-md-4 col-sm-4'>\
                                <form enctype='multipart/form-data' class='formularioAudioa"+cantVideos+"'>\
                                    <input name='archivo' type='file' id='audio' />\
                                    <br/><br/>\
                                    <input type='button' class='añadirvideo' value='añadir' id='a"+cantVideos+"' onclick='subirAudio(this)'/>\
                                    <br />\
                                </form>\
                           </div>\
                           </div></div>\
                            <div class='col-md-4 col-sm-4' id='divRespuesta'>\
                                <h3>RESPUESTA</h3>\
                                <input class='respuesta' type='text' placeholder='1-3'>\
                            </div>\
                            <div class='col-md-12'>\
                               <h3>OPCIONES</h3>\
                                <div class='row contPrg'>\
                                    <div class='col-md-4 col-sm-4' id='divPrg'>\
                                        <div class='fondoImg' id='divi"+(cantOpciones+1)+"'></div>\
                                        <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+1)+"'>\
                                            <input name='archivo' type='file' id='imagen' />\
                                            <br/><br/>\
                                            <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+1)+"' onclick='subirImagen(this)'/>\
                                            <br/>\
                                        </form>\
                                    </div>\
                                    <div class='col-md-4 col-sm-4' id='divPrg'>\
                                        <div class='fondoImg' id='divi"+(cantOpciones+2)+"'></div>\
                                        <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+2)+"'>\
                                            <input name='archivo' type='file' id='imagen' />\
                                            <br/><br/>\
                                            <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+2)+"' onclick='subirImagen(this)'/>\
                                            <br/>\
                                        </form>\
                                    </div>\
                                    <div class='col-md-4 col-sm-4' id='divPrg'>\
                                        <div class='fondoImg' id='divi"+(cantOpciones+3)+"'></div>\
                                        <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+3)+"'>\
                                            <input name='archivo' type='file' id='imagen' />\
                                            <br/><br/>\
                                            <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+3)+"' onclick='subirImagen(this)'/>\
                                            <br/>\
                                        </form>\
                                    </div>\
                                    </div>\
                                </div>\
                            </div>\
                            </div></div>");
        }
        cantOpciones=cantOpciones+3;
    }else{
        alert("Llena todos los campos!");
    }
});
function validarDatos() {
    //alert($('#escenas').children().length);
    var errores=0;
    if($('#titulo').val()==""){
            errores++;
        //alert("no hay titulo");
    }
    $.each($('#escenas').children(), function(i, resultado){
        //alert(resultado.firstElementChild.childNodes);
          //console.log(resultado.firstElementChild.childNodes);
          if(resultado.firstElementChild.childNodes.length>=1){
             //console.log(resultado.childNodes.find(item));
          }else{
              errores++;
              //alert("No has agregado un video!");
          }
    });
    $.each($('.contPaso'), function(i, resAudio){
          if(resAudio.firstElementChild.childNodes.length>=1){
             console.log("lleno");
          }else{
              errores++;
              //alert("No has agregado un audio de pregunta!");
          }
    });
    $.each($('.contPrg').children(), function(i, resPrg){
          if(resPrg.firstElementChild.childNodes.length>=1){
             console.log("lleno");
          }else{
              errores++;
              //alert("No has agregado una opcion de la actividad!");
          }
    });
    $.each($('.respuesta'), function(i, respuesta){
        if(respuesta.value!=""){
            
            if(respuesta.value>=1 && respuesta.value<=3){
                //alert("Respuesta correcta!");
            }else{
              errores++;
              //alert("Respuesta incorrecta!");
            }
             //console.log("lleno");
        }else{
              errores++;
              //alert("No has agregado una respuesta!");
        }
          
    });
    return errores;
};



function cargarEditar(){
    var posEditar= localStorage.getItem("varPasarEditar");
    formData={
        idExcursion:posEditar
    }
    $.ajax({
                url: '/frecibirexcursion',
                method: 'POST',
                data: formData,
                success: function (data) {
                    $("#titulo").attr("value",data[0].titulo);
                    $("#descripcion").attr("value",data[0].descripcion);
                    $("#creditos").attr("value",data[0].creditos);
                    $("#divPortada").html("<img id='portada' src='"+data[0].portada+"'></img>");
                    $.ajax({
                        url: '/flistarpasos',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        success: function (datapasos) {
                            $.each(datapasos, function(i, resultpaso){
                                console.log("llenar");
                                $('#escenas').append("<div class='row crearVI'><div class='col-md-12 col-sm-12'><h2 class='txtportada'>AÑADIR   VIDEO</h2></div><div class='col-md-4 col-sm-4 paso' id='div"+cantVideos+"'><video controls class='listaimg' ><source src='"+resultpaso.video+"' width='50px'></video></div>\
                                        <div class='col-md-4 col-sm-4'>\
                                        <form enctype='multipart/form-data' class='formularioVideov"+cantVideos+"'>\
                                            <input name='archivo' type='file' id='video'/>\
                                            <br/><br/>\
                                            <input type='button' class='añadirvideo' value='añadir'  id='v"+cantVideos+"' onclick='subirVideo(this)'/><br/>\
                                        </form>\
                                        </div>\
                                        <div class='col-md-12 col-md-offset-12'><br><br><br><br><br><br><br><br>\
                                    <h2 class='txtportada'>PLANEA TU ACTIVIDAD</h2>\
                                    <div class='row'>\
                                      <div class='col-md-8 col-sm-8'>\
                                       <h3>PREGUNTA</h3><br>\
                                       <div class='row contPaso'>\
                                        <div class='col-md-4 col-sm-4' id='divAudioa"+cantVideos+"'><audio controls><source src='"+resultpaso.pregunta+"' type='audio/wav'></audio></div>\
                                       <div class='col-md-4 col-sm-4'>\
                                            <form enctype='multipart/form-data' class='formularioAudioa"+cantVideos+"'>\
                                                <input name='archivo' type='file' id='audio' />\
                                                <br/><br/>\
                                                <input type='button' class='añadirvideo' value='añadir' id='a"+cantVideos+"' onclick='subirAudio(this)'/>\
                                                <br />\
                                            </form>\
                                       </div>\
                                       </div></div>\
                                        <div class='col-md-4 col-sm-4' id='divRespuesta'>\
                                            <h3>RESPUESTA</h3>\
                                            <input class='respuesta' type='text' placeholder='1-3' value='"+resultpaso.respuesta+"'>\
                                        </div>\
                                        <div class='col-md-12'>\
                                           <h3>OPCIONES</h3>\
                                            <div class='row contPrg'>\
                                                <div class='col-md-4 col-sm-4' id='divPrg'>\
                                                    <div class='fondoImg' id='divi"+(cantOpciones+1)+"'><img class='imgPregunta' src='"+resultpaso.opciona+"'></img></div>\
                                                    <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+1)+"'>\
                                                        <input name='archivo' type='file' id='imagen' />\
                                                        <br/><br/>\
                                                        <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+1)+"' onclick='subirImagen(this)'/>\
                                                        <br/>\
                                                    </form>\
                                                </div>\
                                                <div class='col-md-4 col-sm-4' id='divPrg'>\
                                                    <div class='fondoImg' id='divi"+(cantOpciones+2)+"'><img class='imgPregunta' src='"+resultpaso.opcionb+"'></img></div>\
                                                    <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+2)+"'>\
                                                        <input name='archivo' type='file' id='imagen' />\
                                                        <br/><br/>\
                                                        <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+2)+"' onclick='subirImagen(this)'/>\
                                                        <br/>\
                                                    </form>\
                                                </div>\
                                                <div class='col-md-4 col-sm-4' id='divPrg'>\
                                                    <div class='fondoImg' id='divi"+(cantOpciones+3)+"'><img class='imgPregunta' src='"+resultpaso.opcionc+"'></img></div>\
                                                    <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+3)+"'>\
                                                        <input name='archivo' type='file' id='imagen' />\
                                                        <br/><br/>\
                                                        <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+3)+"' onclick='subirImagen(this)'/>\
                                                        <br/>\
                                                    </form>\
                                                </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                                        </div><h2 id='idpaso' style='display:none'>"+resultpaso.id+"</h2></div>");
                                cantVideos++;
                            });
                        },
                        error: function (data) {
                            alert("error");
                            console.log(data);
                        }
                    });
                    
                },
                error: function (data) {
                    alert("error");
                    console.log(data);
                }
            });
    
}

$('#guardareditar').click(function () {
    var posEditar= localStorage.getItem("varPasarEditar");
    
        var errores=validarDatos();
        if(errores==0){
            var pasos=[];
            var cantOpciones=0;
            $.each($('.contPaso'), function(i, resAudio){
                
                  var audio=resAudio.firstElementChild.firstChild.firstChild.getAttribute("src");
                  var img1=$('.contPrg').children()[cantOpciones].firstElementChild.firstChild.getAttribute("src");
                  var img2=$('.contPrg').children()[cantOpciones+1].firstElementChild.firstChild.getAttribute("src");
                  var img3=$('.contPrg').children()[cantOpciones+2].firstElementChild.firstChild.getAttribute("src");
                  cantOpciones=cantOpciones+3;
                  var res= $('.respuesta')[i].value;
                  var idpaso= $('#idpaso').html();  
                  //console.log($('#escenas').childNodes);
                  //console.log($('#escenas').children());
                  var video=$('#escenas').children()[i].children[1].firstChild.firstChild.getAttribute("src");
                
                  formData={
                      pregunta:audio,
                      respuesta:res,
                      pasovideo:video,
                      opciona:img1,
                      opcionb:img2,
                      opcionc:img3,
                      id:idpaso
                  }
                  console.log(formData);
                  $.ajax({
                        url: '/feditarPaso',
                        type: 'POST',
                        data: formData,
                        cache: false,
                        success: function (datapasos) {
                            alert("guardopaso");
                        },
                          error: function (data) {
                            alert("errorPaso");
                            console.log(data);
                        }
                    });
            });
            formDataEx={
                 id:posEditar,
                 titulo:$("#titulo").val(),
                creditos:$("#creditos").val(),
                descripcion:$("#descripcion").val(),
                portada:$("#portada").attr('src'),
            } 
            
            console.log(formDataEx);
            $.ajax({
                url: '/fguardarEditarExcursion',
                method: 'POST',
                data: formDataEx,
                success: function (data) {
                    alert("Se editó correctamente la excursion");
                    window.location.href="/listarexcursiones";
                },
                error: function (data) {
                            alert("errorEx");
                            console.log(data);
                    }
            });
        }else{
            alert("Llene todos los campos!");
        }
        //window.location.href
});