/**
 * Creado por Adib el 7/15/16.
 */
$(function () {
    var actividadOriginal = $("#main").html();

    init();

    function init(){
        var lstSetsPreguntas = $(".set");
        var total = lstSetsPreguntas.length;
        lstSetsPreguntas.each(function(idx, elm){
            $(elm).find("button").click(function(evt){
                var elmPadre = $(evt.currentTarget).parent();//Obtiene el nodo padre
                var abuelo = elmPadre.parent();
                abuelo.find("button").removeClass("btn-default").addClass("btn-disabled").prop('disabled', true);//Desactiva todos los botones del set (abuelo)
                elmPadre.addClass("contestado");//Marca la opción como contestada (no el set)
                abuelo.addClass("contestado");//Marca el set como contestado

                //Si ya ha terminado de contestar todas las preguntas
                if(total === $(".set.contestado").length){
                    var buenas = $('div.contestado > .retro[data-correcta="true"]').length;//Obtiene el número de buenas
                    uiDialogo.text("Obtuviste " + buenas + " de " + total + ".").dialog( "option", "title", "Mensaje" ).dialog("open");
                }
            });
        });
    }
    function reiniciar(){
        $("#main").html(actividadOriginal);
        init();
    }

    //Configuración de diálogo jQuery UI (Se usa para mensaje de calificacion e informativos)
    var uiDialogo = $("#dialog");
    uiDialogo.dialog({
        title:"Mensaje",
        modal:true,
        show:"slideDown",
        hide:"slideUp",
        autoOpen:false,
        buttons: [
            {
                text: "Otra vez",
                icons: {
                    primary: "ui-icon-arrowrefresh-1-e"
                },
                click: function() {
                    $("button").prop('disabled', false);//Por alguna razón firefox deja desactivado los botones
                    //window.location.reload(false);
                    $(this).dialog( "close" );
                    reiniciar();
                }
            },
            {
                text: "Aceptar",
                icons: {
                    primary: "ui-icon-check"
                },
                click: function() {
                    $(this).dialog( "close" );
                }
            }
        ]
    });

});