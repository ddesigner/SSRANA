$(document).ready(function(){
    var scrollPosition = parseInt($(window).scrollTop());
    if(scrollPosition>5){
        $(".nav").css("box-shadow","0 0 5px rgba(0,0,0,0.15)");
    } else {
        $(".nav").css("box-shadow","none");
    }
    //$(document).on("click", "#pagination a", function (e) {
        //$(document).on("click", "#loadmore",function(e){
    $("#loadmore").click(function(e){
        e.preventDefault();
        
        var link = $(this).attr('href');
        
        $.post( link, function( data ) {
            var articlelist = $(data).find('#articlelist');
            //var articlelist = $(data).find('#articlelist');
            var loadmore=null;
            if($(data).find('#loadmore').length)
                loadmore = $(data).find('#loadmore');
                noofarticle=$(data).find('#noofarticle').val();
            //$('#pagination').html(pagination.html());
            $('#articlelist').animate(
                {opacity: 1},
                500, 
                function(){
                    $(this).append(articlelist.html()).animate(
                        {opacity: 1},
                        0,function(){
                            if(loadmore!=null)
                            $('#loadmore').attr("href", loadmore.attr("href"));
                            else
                            $('#pagination').html("");
                            $("#noofarticle").val(parseInt($("#noofarticle").val())+parseInt(noofarticle));
                            $("#disptotalarticle").html($("#noofarticle").val()+ " Article");
                            
                        }
                    );
                }
            );
        });
    });

    $("#cat, #sub_cat, #orderby, #joblocation").change(function(){
        $("#searchform").submit();
    })
   
    $("#searchform").submit(function(e) {

        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        var url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                 // show response from the php script.
                 var articlelist = $(data).find('#articlelist');
                 //var articlelist = $(data).find('#articlelist');
                 var loadmore=null;
                 if($(data).find('#loadmore').length)
                     loadmore = $(data).find('#loadmore');
                     noofarticle=$(data).find('#noofarticle').val();
                 //$('#pagination').html(pagination.html());
                 $('#articlelist').animate(
                     {opacity: 1},
                     500, 
                     function(){
                         $(this).html(articlelist.html()!=undefined?articlelist.html():"").animate(
                             {opacity: 1},
                             0,function(){
                                 if(loadmore!=null)
                                 $('#loadmore').attr("href", loadmore.attr("href"));
                                 else
                                 $('#pagination').html("");
                                 $("#noofarticle").val(noofarticle);
                                 $("#disptotalarticle").html($("#noofarticle").val());
                                 
                             }
                         );
                     }
                 );
            }
          });
    });


$(".wp-block-gallery a").click(function(e){
    e.preventDefault();
    console.log("sdsdsa");
    $("#WPGalleryModal").show();
    $("#WPGalleryModalImage").attr("src",$(this).attr("href"));
    $("#WPGalleryModalCaption").html($(this).parent().find("figcaption").html());
});
$("#WPGalleryModal .close").click(function() { 
    $("#WPGalleryModal").hide();
  });
/*
    // Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById('myImg');
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}

*/


$(window).scroll(function(){
    var scrollPosition = parseInt($(window).scrollTop());
    if(scrollPosition>5){
        $(".nav").css("box-shadow","0 0 5px rgba(0,0,0,0.15)");
    } else {
        $(".nav").css("box-shadow","none");
    }
});


});

 