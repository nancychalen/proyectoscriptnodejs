

function traducirvideo(btnV){
    var valor=btnV.getAttribute("id");
    var ruta = $('#linkvideo'+valor).val();
    //alert(ruta);
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = ruta.match(regExp);
    var result;
    if (match && match[2].length == 11) {
        result=match[2];
    } else {
        result='error';
    }
    //alert(result);
    //var myId = getId('http://www.youtube.com/watch?v=zbYf5_S7oJo');

    $("#divVideoYT"+valor).html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + result + '" frameborder="0" allowfullscreen></iframe>');
    
};

function validarextensionaudio(extension) {
    switch (extension.toLowerCase()) {
        case 'mp3':
            return true;
            break;
        case 'wav':
            return true;
            break;
        case 'ogg':
            return true;
            break;
        case 'm4a':
            return true;
            break;
        default:
            return false;
            break;
    }
}
function validarextensionimagen(extension) {
    switch (extension.toLowerCase()) {
        case 'jpg':
            return true;
            break;
        case 'gif':
            return true;
            break;
        case 'png':
            return true;
            break;
        case 'jpeg':
            return true;
            break;
        default:
            return false;
            break;
    }
}

function subirAudio(btnA){
    var valor= btnA.getAttribute("id");
    var formData = new FormData($(".formularioAudio"+valor)[0]);
    var nombrearchivo=$(".formularioAudio"+valor)[0].firstElementChild.files[0].name;
    var ext=nombrearchivo.substring(nombrearchivo.lastIndexOf('.') + 1);
    console.log(ext);
    if(validarextensionaudio(ext)){
        $.ajax({
            url: '/subir',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                    $("#divAudio"+valor).html("<audio class='styleAudio' controls><source src='../excursiones/"+data+"' type='audio/mp3' ></audio>")
            }
        });
    }else{
        alert("Formato incorrecto");
    }
    
};
function subirImagen(btnI){
    var valor= btnI.getAttribute("id");
    var formData = new FormData($(".formularioImagenes"+valor)[0]);
    var nombrearchivo=$(".formularioImagenes"+valor)[0].firstElementChild.files[0].name;
    var ext=nombrearchivo.substring(nombrearchivo.lastIndexOf('.') + 1);
    console.log(ext);
    if(validarextensionimagen(ext)){
        $.ajax({
            url: '/subir',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                    $("#div"+valor).html("<img class='imgPregunta' src='../excursiones/"+data+"'></img>")
            }
        });
    }else{
        alert("Formato incorrecto");
    }
};

$('.añadirPortada').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioPortada")[0]);
    var message = "";
    //alert(formData);
    //hacemos la petición ajax
    var nombrearchivo=$(".formularioPortada")[0].firstElementChild.files[0].name;
    var ext=nombrearchivo.substring(nombrearchivo.lastIndexOf('.') + 1);
    console.log(ext);
    if(validarextensionimagen(ext)){
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
             //   alert("error");
                console.log(data);
            }
        });
    }else{
        alert("Formato incorrecto");
    }
});
$('.añadirAvatar').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAvatar")[0]);
    var message = "";
    //alert(formData);
    //hacemos la petición ajax
    var nombrearchivo=$(".formularioAvatar")[0].firstElementChild.files[0].name;
    var ext=nombrearchivo.substring(nombrearchivo.lastIndexOf('.') + 1);
    console.log(ext);
    if(validarextensionimagen(ext)){
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
               // alert("error");
                console.log(data);
            }
        });
    }else{
        alert("Formato incorrecto");
    }
});
function listarExcursion(){
    $("#poneraudios").append("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='../audios/Excursion.mp3'></audio>");
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
           // alert("error");
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
           // alert("error");
            console.log(data);
        }
    });
    
};

function listarExcursionUsuario(){
    //alert(localStorage.getItem("varidAlumno"));
    var idusers=localStorage.getItem("usuariologeado");
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
          //  alert("error");
            console.log(data);
        }
    });
};

function cargarIndex(){
    $("#poneraudios").html("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='../audios/Bienvenidos.mp3'></audio>");
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
            $("#listaralumnos").append("<div class='col-md-4 col-sm-4'><div><button onclick='pasarAlumno("+result.id+")'><img width='200px' height='200px' padding='10px' src='"+result.avatar+"'/></button><h1 class='textoalumnos'>"+result.nombre+"</h1><p class='textoalumnos'>"+result.puntaje+"</p></button></div></div>");
        });
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
};

function listarAlumnos(){
    var idusuario=localStorage.getItem("usuariologeado");
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
            //alert("error");
            console.log(data);
        }
    });
    var idusuario=localStorage.getItem("usuariologeado");
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
            //alert("error");
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
            //alert("error");
            console.log(data);
        }
    });
};

function listarUsuarios(){
    var idusuario=localStorage.getItem("usuariologeado");
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
            //alert("error");
            console.log(data);
        }
    });
    $.ajax({
        url: '/flistarusuarios',
        type: 'GET',
        //data solo usas si vas a enviar algo con post
        //data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            $.each(data, function(i, resultusuario){
            $("#listarusuarios").append("<div class='col-md-4 col-sm-4'><div><h1>"+resultusuario.id+"</h1><h1>"+resultusuario.nombre+"</h1><h1>"+resultusuario.usuario+"</h1><h1>"+resultusuario.pass+"</h1><button onclick='pasareditarusuario("+resultusuario.id+")'>Editar</button><button onclick='eliminarUsuario("+resultusuario.id+")'>Eliminar</button></div></div>");
        });
        },
        error: function (data) {
            //alert("error");
            console.log(data);
        }
    });
};

function validarsesion(){
    var usuario=$("#usuario").val();
    var pass=$("#pass").val();
    $.ajax({
        url: '/flistarusuarios',
        type: 'GET',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            var flag=0;
            $.each(data, function(i, resultusuario){
                
                if(usuario==resultusuario.usuario && pass==resultusuario.pass){
                    flag=1;
                    $.ajax({
                        url: '/validarlogin',
                        type: 'POST',
                        data:{
                            idusuariologeado:resultusuario.id
                        },
                        cache: false,
                        success: function (data) {
                           
                            localStorage.setItem("usuariologeado",resultusuario.id);
                            window.location = "/menu";
                            
                        },
                        error: function (data) {
                           // alert("error");
                            console.log(data);
                        }
                    });
                    
                }
            });
            if(flag==0){
                alert("USUARIO O CONTRASEÑA INCORRECTA");
            }
        },
        error: function (data) {
          // alert("error");
            console.log(data);
        }
    });
};

function cargarMenu(){
    var idusuario=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
};

function cargarLogeado(){
    var idusuario=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
};
function cargarMenuExcursiones(){
    var idusuario=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
    //localStorage.getItem("varPasar");
    var idusuario=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
    
};

function cargarAlumno(){
     var idusuario=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
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
          //  alert("error");
            console.log(data);
        }
    });
};

function cargarUsuario(){
    //localStorage.getItem("varPasar");
     var idusuario=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusuario
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
    var id=localStorage.getItem("editaridUsuario");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:id
        },
        cache: false,
        success: function (data) {
            $("#nombre").attr("value",data[0].nombre);
            $("#usuario").attr("value",data[0].usuario);
            $("#pass").attr("value",data[0].pass);
        },
        error: function (data) {
          // alert("error");
            console.log(data);
        }
    });
};

function guardareditarAlumno(){
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
        //    alert("error");
            console.log(data);
        }
    });
};
function guardareditarUsuario(){
    var id=localStorage.getItem("editaridUsuario");
    $.ajax({
        url: '/feditarusuarioporid',
        type: 'POST',
        data: {
            idusuario:id,
            nombre:$("#nombre").val(),
            usuario:$("#usuario").val(),
            pass:$("#pass").val(),
        },
        cache: false,
        success: function (data) {
            window.location = "/menuusuarios";
        },
        error: function (data) {
          //  alert("error");
            console.log(data);
        }
    });
    
};

function cargarexcursionalumno(){
    $("#poneraudios").append("<audio autoplay id='audioP' controls><source  type='audio/mp3' src='../audios/Pasos.mp3'></audio>");
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
            var nuevopuntaje=data[0].puntaje+1;
            $("#puntaje").html(nuevopuntaje);
            $.ajax({
                url: '/fguardarpuntajealumno',
                type: 'POST',
                data: {
                    nvpuntaje:nuevopuntaje,
                    idalumno:localStorage.getItem("varidAlumno")
                    
                },
                cache: false,
                success: function (data) {
                    //var myiframe = $('#framevideo1').onrea;
                    //console.log(myiframe);
                   //console.log("m "+myiframe.readyState);
//                    myiframe.onreadystatechange = function() {
//                            alert('testing 2'); // this fires for IE
//                            if (myiframe.readyState == 'complete') {
//                                alert('testing 3'); // this never fires
//                                iframeIsLoaded();
//                            }
//                    }
                    
                },
                error: function (data) {
                 //   alert("error");
                    console.log(data);
                }
            });
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
    
    
    recibirExcursion();
    };

function cargarexcursionusuario(){
    var idusers=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusers
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        }
    });
    recibirExcursion();
    };
 var player;
var idfinal;
var contVideo=0;
function recibirExcursion(){
    var posExcursion=localStorage.getItem("varPasar");
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
                $("#recibirPasos").append("<div class='col-md-12 col-sm-12 videoSolo row' id='divPr"+contVideo+"'><div class='col-md-12 col-sm-12' id='player"+contVideo+"'><iframe style='display:none' id='framevideor"+contVideo+"' onload='pls(this)' src='"+resPaso.video+"?showinfo=0&controls=1&showinfo=0&iv_load_policy=2&rel=0' frameborder='0' allowfullscreen></iframe></div></div><div class='col-md-12 col-sm-12 preguntaSolo row' id='divPre"+contVideo+"'><div class='col-md-3 col-sm-3'><button onclick='reproducirPregunta(this)' class='botonPregunta bounce'><audio style='display:none' controls><source src='"+resPaso.pregunta+"' type='audio/mp3' ></audio><img id='imgPregunta' src='../images/play.jpg'></button></div><div class='col-md-3 col-sm-3'><button class='btnOpcion' onclick='validarRespuesta(this,"+resPaso.respuesta+")'><img id='img1' src='"+resPaso.opciona+"' class='listaimg'></button></div><div class='col-md-3 col-sm-3'><button class='btnOpcion' onclick='validarRespuesta(this,"+resPaso.respuesta+")'><img id='img2' src='"+resPaso.opcionb+"' class='listaimg'></button></div><div class='col-md-3 col-sm-3'><button class='btnOpcion' onclick='validarRespuesta(this,"+resPaso.respuesta+")'><img id='img3' class='listaimg'src='"+resPaso.opcionc+"'></button></div></div></div></div>");
                contVideo++;
                    });
                   
//                    var txt=$('#framevideo1').attr('src');
//                    var varios=txt.split('/');
//                    console.log(varios);
//                    idvideo=varios[4];
//                    console.log('id: '+idvideo);
                    // create youtube player
                   
                },
                error: function (data) {
                  //  alert("error");
                    console.log(data);
                }
            });
        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
}


//function onYouTubePlayerAPIReady() {
//        player = new YT.Player('player', {
//          width: '100%',
//          videoId: idfinal,
//          events: {
//            'onReady': onPlayerReady,
//            'onStateChange': onPlayerStateChange
//          }
//        });
//    }


    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {            
            console.log(event.target.a.parentNode.nextSibling.firstChild.firstChild);
            var divName=event.target.a.parentNode.nextSibling;
           event.target.a.parentNode.nextSibling.firstChild.firstChild.click();
            var idName=divName.getAttribute('id');
        console.log('miau: '+idName);
            var target_offset = $('#'+idName).offset();
            var target_top = target_offset.top;
        $('html,body').animate({scrollTop:target_top},{duration:"slow"});
        }
    }

function pls(btn){
    //alert("pls vale");
//    console.log(btn);
//    console.log("m "+btn.onreadystatechange);
//    //console.log(document.readyState);
//    btn.onreadystatechange = function() {
//        alert('testing 2'); // this fires for IE
////                            if (myiframe.readyState == 'complete') {
////                                alert('testing 3'); // this never fires
////                                iframeIsLoaded();
////                            }
//                    }
    var tener=btn.getAttribute('id').split('o');
    var numero=tener[1];
    //alert(numero);
    var divParaVideo=$('#playe'+numero);
    //console.log(divParaVideo);
      var txt=btn.getAttribute('src');
                    var varios=txt.split('/');
                    //console.log(varios);
                    var idvideo=varios[4];
                    var idvideovarios=idvideo.split('?');
                    idfinal=idvideovarios[0];
                    //console.log('id: '+idfinal);
    
            player = new YT.Player('playe'+numero, {
                  width: '100%',
                  videoId: idfinal,
                  events: {
                    'onStateChange': onPlayerStateChange
                  }
                });

}

 

function reproducirPregunta(btn){
    console.log(btn.firstChild);
    btn.firstChild.play();
}

function validarRespuesta(btn, respuesta){
    var padre=btn.parentNode.parentNode;
    console.log(padre.childNodes);
    if(btn.firstChild.getAttribute("id")=="img"+respuesta){
       $("#divAudiosEx").html("<audio id='correcta' controls autoplay><source src='../audios/bien.mpeg' type='audio/mpeg'></audio>");
        console.log(respuesta);
        window.setTimeout(continuar,3000,padre.nextSibling);
        padre.childNodes[respuesta].firstChild.setAttribute("style","background-color:red");
        //console.log(padre.childNodes[2]);
        padre.childNodes[1].firstChild.disabled=true;
        padre.childNodes[2].firstChild.disabled=true;
        padre.childNodes[3].firstChild.disabled=true;
    }else{
       //alert("Respuesta incorrecta, elije la numero "+respuesta);
        $("#divAudiosEx").html("<audio id='incorrecta' controls autoplay><source src='../audios/maleligebien.mpeg' type='audio/mpeg' ></audio>");
        padre.childNodes[respuesta].firstChild.setAttribute("style","background-color:red");
    }
}
function continuar(divName){
    console.log(divName);
    if(divName!=null){
        var idName=divName.getAttribute('id');
        console.log('miau: '+idName);
        $("#divAudiosEx").html("<audio id='correcta' controls autoplay><source src='../audios/continuaravideo.mpeg' type='audio/mpeg'></audio>");
        var target_offset = $('#'+idName).offset();
        var target_top = target_offset.top;
        $('html,body').animate({scrollTop:target_top},{duration:"slow"});
    }
    
}
function pasarusuarioexcursion(pos){
    localStorage.setItem("varPasar",pos);
    window.location = "/leerexcursionUsuario";
}
function pasaralumnoexcursion(pos){
    localStorage.setItem("varPasar",pos);
    window.location = "/leerexcursionAlumno";
}
function pasarAlumno(idalumno){
    localStorage.setItem("varidAlumno",idalumno);
    window.location = "/listarexcursionesAlumno";
}
function pasareditarAlumno(idalumno){
    localStorage.setItem("editaridAlumno",idalumno);
    window.location = "/editaralumno";
}
function pasareditarusuario(idusuario){
    localStorage.setItem("editaridUsuario",idusuario);
    window.location = "/editarusuario";
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
                  //  alert("error");
                    console.log(data);
                }
            });
        },
        error: function (data) {
         //   alert("error");
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
           // alert("error");
            console.log(data);
        }
    });
     
}
function eliminarUsuario(posusuario){
    var usuariologeado=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/flistarexcursionesporusuario',
        type: 'POST',
        data: {
            idusuario:posusuario
        },
        cache: false,
        success: function (data) {
            //alert(1);
            var flag=0;
            $.each(data, function(i, result){
                flag++;
                $.ajax({
                    url: '/feliminarpasos',
                    method: 'POST',
                    data: {
                        "idExcursion": result.id
                    },
                    success: function (data) {
                        $.ajax({
                            url: '/feliminarexcursion',
                            method: 'POST',
                            data: {
                                "idExcursion": result.id
                            },
                            success: function (data) {
                                $.ajax({
                                    url: '/feliminarusuario',
                                    method: 'POST',
                                    data: {
                                        "idusuario": posusuario
                                    },
                                    success: function (data) {
                                       //alert(3);
                                       if(usuariologeado==posusuario){
                                           window.location.href="/";
                                       }else{
                                           window.location.href="/menuusuarios";
                                       }
                                       
                                    },
                                    error: function (data) {
                                      //  alert("error");
                                        console.log(data);
                                    }
                                });
                                
                            },
                            error: function (data) {
                                //alert("error");
                                console.log(data);
                            }
                        });
                    },
                    error: function (data) {
                        //alert("error");
                        console.log(data);
                    }
                });
            });
            //alert("2");
            if(flag==0){
                $.ajax({
                    url: '/feliminarusuario',
                    method: 'POST',
                    data: {
                        "idusuario": posusuario
                    },
                    success: function (data) {
                       if(usuariologeado==posusuario){
                           window.location.href="/";
                       }else{
                           window.location.href="/menuusuarios";
                       }
                    },
                    error: function (data) {
                      //  alert("error");
                        console.log(data);
                    }
                });
            }
            
        },
        error: function (data) {
          //  alert("error");
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
                idUsuario:localStorage.getItem("usuariologeado")
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
                            //alert("ui: "+idExc);
                            
                            $.each($('.contPaso'), function(i, resAudio){
                             //alert("paso");

                              var audio=resAudio.firstElementChild.firstChild.firstChild.getAttribute("src");
                              var img1=$('.contPrg').children()[cantOpciones].firstElementChild.firstChild.getAttribute("src");
                              var img2=$('.contPrg').children()[cantOpciones+1].firstElementChild.firstChild.getAttribute("src");
                              var img3=$('.contPrg').children()[cantOpciones+2].firstElementChild.firstChild.getAttribute("src");
                              cantOpciones=cantOpciones+3;
                              var res= $('.respuesta')[i].value;
                              var video=$("#divVideoYTv"+(i+1)).children().attr("src");
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
                                        //alert("guardopaso");
                                    },
                                      error: function (data) {
                                       //alert("errorPaso");
                                        console.log(data);
                                    }
                                });
                              });
                            window.location.href="/listarexcursionesUsuario";
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

$('#guardarUsuario').click(function () {
            formData={
                nombre:$("#nombre").val(),
                usuario:$("#usuario").val(),
                pass:$("#pass").val()
            }
            console.log(formData);
            $.ajax({
                url: '/fguardarUsuario',
                method: 'POST',
                data:formData,
                success: function (data) {
                   window.location.href="/menuusuarios";
                }
            });
});

$('#nuevoVideo').click(function () {
    var errores=validarDatos();
    //alert("nv"+errores);
    if(errores==0){
        if(cantVideos!=5){
            cantVideos++;
            $('#escenas').append("<div class='row crearVI'><div class='col-md-12 col-sm-12'><h2 class='txtportada'>AÑADIR VIDEO</h2></div>\
                                 <div class='col-md-6 col-sm-6'>\
                            <input name='linkvideo' type='text' id='linkvideov"+cantVideos+"' placeholder='Inserte link de Youtube'/>\
                            <button id='v"+cantVideos+"' onclick='traducirvideo(this)'>AÑADIR</button></div>\
                        <div class='col-md-4 col-sm-4 paso' id='divVideoYTv"+cantVideos+"'></div>\
                            <div class='col-md-12 col-md-offset-12'><br><br>\
                        <h2 class='txtportada'>PLANEA TU ACTIVIDAD</h2>\
                        <div class='row'>\
                          <div class='col-md-8 col-sm-8'>\
                           <h3>PREGUNTA</h3><br>\
                           <div class='row contPaso'>\
                            <div class='col-md-4 col-sm-4' id='divAudioa"+cantVideos+"'></div>\
                           <div class='col-md-4 col-sm-4'>\
                                <form enctype='multipart/form-data' class='formularioAudioa"+cantVideos+"'>\
                                    <input name='archivo' type='file' accept='.mp3,.wav,.ogg,.m4a' id='audio' />\
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
                                            <input name='archivo' type='file' accept='.png,.jpg,.jpeg,.gif' id='imagen' />\
                                            <br/><br/>\
                                            <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+1)+"' onclick='subirImagen(this)'/>\
                                            <br/>\
                                        </form>\
                                    </div>\
                                    <div class='col-md-4 col-sm-4' id='divPrg'>\
                                        <div class='fondoImg' id='divi"+(cantOpciones+2)+"'></div>\
                                        <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+2)+"'>\
                                            <input name='archivo' type='file' accept='.png,.jpg,.jpeg,.gif' id='imagen' />\
                                            <br/><br/>\
                                            <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+2)+"' onclick='subirImagen(this)'/>\
                                            <br/>\
                                        </form>\
                                    </div>\
                                    <div class='col-md-4 col-sm-4' id='divPrg'>\
                                        <div class='fondoImg' id='divi"+(cantOpciones+3)+"'></div>\
                                        <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+3)+"'>\
                                            <input name='archivo' type='file' accept='.png,.jpg,.jpeg,.gif' id='imagen' />\
                                            <br/><br/>\
                                            <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+3)+"' onclick='subirImagen(this)'/>\
                                            <br/>\
                                        </form>\
                                    </div>\
                                    </div>\
                                </div>\
                            </div>\
                            </div><div class='col-md-12 col-sm-12'><button style='width:90%' onclick='eliminarPasoVacio(this)'>Borrar Paso</button></div></div></div>");
        }
        cantOpciones=cantOpciones+3;
    }else{
        alert("Llena todos los campos!");
    }
});
function eliminarPasoVacio(btn) {
    console.log(btn.parentNode.parentNode);
    btn.parentNode.parentNode.remove();
    cantOpciones=cantOpciones-3;
    cantVideos--;
}
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
function eliminarPaso(posPaso){
     $.ajax({
        url: '/feliminarpasoporid',
        method: 'POST',
        data: {
            "idPaso": posPaso
        },
        success: function (data) {
                      window.location.href="/editarexcursion";

        },
        error: function (data) {
           // alert("error");
            console.log(data);
        }
    });
     
}

function cargarEditar(){
var idusers=localStorage.getItem("usuariologeado");
    $.ajax({
        url: '/fcargarusuarioporid',
        type: 'POST',
        data: {
            iduser:idusers
        },
        cache: false,
        success: function (data) {
            $("#nombreUsuarioLogeado").html(data[0].nombre);
        }
    });
    
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
                                $('#escenas').append("<div class='row crearVI'><div class='col-md-12 col-sm-12'><h2 class='txtportada'>AÑADIR   VIDEO</h2></div>\
                                    <div class='col-md-6 col-sm-6'>\
                            <input name='linkvideo' type='text' id='linkvideov"+cantVideos+"' placeholder='Inserte link de Youtube'/>\
                            <button id='v"+cantVideos+"' onclick='traducirvideo(this)'>AÑADIR</button></div>\
                            <div class='col-md-4 col-sm-4 paso' id='divVideoYTv"+cantVideos+"'><iframe width='360' src='" + resultpaso.video + "' frameborder='0' allowfullscreen></iframe></div>\
                                        <div class='col-md-12 col-md-offset-12'><br><br><br><br><br><br><br><br>\
                                    <h2 class='txtportada'>PLANEA TU ACTIVIDAD</h2>\
                                    <div class='row'>\
                                      <div class='col-md-8 col-sm-8'>\
                                       <h3>PREGUNTA</h3><br>\
                                       <div class='row contPaso'>\
                                        <div class='col-md-4 col-sm-4' id='divAudioa"+cantVideos+"'><audio controls><source src='"+resultpaso.pregunta+"' type='audio/wav'></audio></div>\
                                       <div class='col-md-4 col-sm-4'>\
                                            <form enctype='multipart/form-data' class='formularioAudioa"+cantVideos+"'>\
                                                <input name='archivo' type='file' accept='.mp3,.wav,.ogg,.m4a' id='audio' />\
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
                                                        <input name='archivo' type='file' accept='.png,.jpg,.jpeg,.gif' id='imagen' />\
                                                        <br/><br/>\
                                                        <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+1)+"' onclick='subirImagen(this)'/>\
                                                        <br/>\
                                                    </form>\
                                                </div>\
                                                <div class='col-md-4 col-sm-4' id='divPrg'>\
                                                    <div class='fondoImg' id='divi"+(cantOpciones+2)+"'><img class='imgPregunta' src='"+resultpaso.opcionb+"'></img></div>\
                                                    <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+2)+"'>\
                                                        <input name='archivo' type='file' accept='.png,.jpg,.jpeg,.gif' id='imagen' />\
                                                        <br/><br/>\
                                                        <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+2)+"' onclick='subirImagen(this)'/>\
                                                        <br/>\
                                                    </form>\
                                                </div>\
                                                <div class='col-md-4 col-sm-4' id='divPrg'>\
                                                    <div class='fondoImg' id='divi"+(cantOpciones+3)+"'><img class='imgPregunta' src='"+resultpaso.opcionc+"'></img></div>\
                                                    <form enctype='multipart/form-data' class='formularioImagenesi"+(cantOpciones+3)+"'>\
                                                        <input name='archivo' type='file' accept='.png,.jpg,.jpeg,.gif' id='imagen' />\
                                                        <br/><br/>\
                                                        <input type='button' class='añadirvideo' value='añadir' id='i"+(cantOpciones+3)+"' onclick='subirImagen(this)'/>\
                                                        <br/>\
                                                    </form>\
                                                </div>\
                                                </div>\
                                            </div>\
                                        </div></div><div class='col-md-12 col-sm-12'><button style='width:90%' onclick='eliminarPaso("+resultpaso.id+")'>Borrar Paso</button>\
                                        </div><h2 class='idpaso' style='display:none'>"+resultpaso.id+"</h2></div>");
                                cantVideos++;
                                cantOpciones=cantOpciones+3;
                            });
                            cantVideos--;
                        },
                        error: function (data) {
                         //   alert("error");
                            console.log(data);
                        }
                    });
                    
                },
                error: function (data) {
                  //  alert("error");
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
                  var video=$("#divVideoYTv"+(i+1)).children().attr("src");
                  //console.log($('.idpaso')[i].innerHTML);
                  if($('.idpaso')[i]==undefined){
                      //alert("nuevo");
                      formData={
                          pregunta:audio,
                          respuesta:res,
                          pasovideo:video,
                          opciona:img1,
                          opcionb:img2,
                          opcionc:img3,
                          idexcursion:posEditar
                      }
                      //console.log(formData);
                      $.ajax({
                            url: '/fguardarPaso',
                            type: 'POST',
                            data: formData,
                            cache: false,
                            success: function (datapasos) {
                                //alert("guardopaso");
                            },
                              error: function (data) {
                               // alert("errorPaso");
                                console.log(data);
                            }
                        });
                  }else{
                      var idpaso= $('.idpaso')[i].innerHTML;
                      //alert(idpaso);
                      formData={
                          pregunta:audio,
                          respuesta:res,
                          pasovideo:video,
                          opciona:img1,
                          opcionb:img2,
                          opcionc:img3,
                          id:idpaso
                      }
                      //console.log(formData);
                      $.ajax({
                            url: '/feditarPaso',
                            type: 'POST',
                            data: formData,
                            cache: false,
                            success: function (datapasos) {
                                //alert("guardopaso");
                            },
                              error: function (data) {
                               // alert("errorPaso");
                                console.log(data);
                            }
                        });
                  }
                  
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
                    window.location.href="/listarexcursionesUsuario";
                },
                error: function (data) {
                         //   alert("errorEx");
                            console.log(data);
                    }
            });
        }else{
            alert("Llene todos los campos!");
        }
        //window.location.href
});
