function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$(function() {
    var $events = $("#events");
    var randomNumber=Math.floor(Math.random()*10);
     musicIdArray=[
     bluesMusicId=["Blues","videoseries?list=PLcHnJ21xVEoE8JXUX3uyQkJdHmnk1g7SZ"],
     countryMusicId=["Country","videoseries?list=PLcHnJ21xVEoGUUA0dO2MoW1Rr-f92HFEY"],
     punkMusicId=["Punk/Alt","videoseries?list=PLcHnJ21xVEoEnnqFQ6sDnjU9_QTmorXzj"],
     gospelMusicId=["Gospel","videoseries?list=PLcHnJ21xVEoGuzZlm32m5n3JkjTH2Z1lX"],
     rockMusicId=["Rock","videoseries?list=PLcHnJ21xVEoF-XkPHSsP1p8Vkp_k1WeKn"],
     urbanMusicId=["Urban","videoseries?list=PLcHnJ21xVEoGh9gcKQ8eStTAcpPqq8CMg"],
     jazzMusicId=["Jazz","videoseries?list=PLcHnJ21xVEoEpf0itQudCgBG_v4USuUtq"],
     elecDanMusicId=["Electronic","videoseries?list=PLcHnJ21xVEoH7s6XHyAzkeKBN3-RF0Vq7"],
     rapMusicId=["Rap","videoseries?list=PLcHnJ21xVEoEHilkcfnWTZzZCCGkEYwns"],
     classicalMusicId = ["Classical","videoseries&&autoplay=1?list=PLcHnJ21xVEoGtkxKWo5-g45245aC4MVFM"]
    ];
    $.get('http://api.songkick.com/api/3.0/metro_areas/18073/calendar.json?apikey=CVym1urfpjSkA2ph', function(res) {
      if(res.resultsPage.results.event.length) {
        res.resultsPage.results.event.forEach(function (event) {
           var eventTime = moment(event.start.datetime).format('M/D/YYYY h:mm A');
          event.performance.forEach(function (perf){
            //console.log(perf.artist.id);
            //console.log('http://images.sk-static.com/images/media/profile_images/artists/'+perf.artist.id+'/huge_avatar');
            if(event.start.datetime!==null){
           // console.log(event.start);
            $("#events").html("");                      
              $.get("partials/event-view.html", function(data) {
                  $("#events").append(tplawesome(data, [{
                    "link": event.uri, 
                    "displayName":perf.displayName, 
                    "venueName": event.venue.displayName,
                    "artistPicture": perf.artist.id,
                    "date": eventTime
                  }]));
            });
              }else{
                //console.log(event.start.date);
                $("#events").html("");                      
              $.get("partials/event-view.html", function(data) {
                  $("#events").append(tplawesome(data, [{
                    "link": event.uri, 
                    "displayName":perf.displayName, 
                    "venueName": event.venue.displayName,
                    "artistPicture": perf.artist.id,
                    "date": event.start.date
                 }]));
             });
           }
         });          
       });        
     }
   });
   $('ul.nav navbar-nav a').smoothScroll();
      $('li a').click(function(event) {
        console.log("smoothScroll");
        event.preventDefault();
        var link = this;
        $.smoothScroll({
          offset: -40,
          scrollTarget: link.hash
        });
      });
   runCategoryApi(musicIdArray[randomNumber]); 
  });
    $("form").on("submit", function(e) {
      //runCategoryApi(classicalMusicId);
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            //videoSyndicated:"true",
            videoCategoryId:10,
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 1,
            order: "viewCount",
            player : new YT.Player('video', {
    })
       }); 
       // execute the request   
         request.execute(function(response) {
          //console.log(response.result.items);
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
              //console.log(index, item);
              $.get("partials/videotemplate.html", function(data) {
                console.log(item.id.videoId);
                  $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId+"?autoplay=1"}]));
              });
            });
            resetVideoHeight();
         });
       });
var player;
function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#video)
  
}
    $(window).on("resize", resetVideoHeight);
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}
function play() {
    player.playVideo();
  }
  function pause() {
    player.pauseVideo();
  }
function init() {
    gapi.client.setApiKey("AIzaSyDc6CAlmMDlI4EH2YHeGnVVTW-RvU564QM");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
};
  $( "#categories" )
    .mouseenter(function() {
      $("#categories h3").fadeTo(200, 1);
      $("#categories img").fadeTo(200, 0.3);
    })
    .mouseleave(function() {
      $("#categories h3").fadeTo(200, 1);
      $("#categories img").fadeTo(200, 1);
    });

  $( "#categories" )
    .mouseleave(function() {
      $("#categories h3").fadeTo(200, 0);
    });
function runCategoryApi(playlistId){
      console.log(playlistId);

            $("#results").html("");
              $.get("partials/videotemplate.html", function(data) {
                $('div.item').remove();
                  $("#results").append(tplawesome(data, [{"title":playlistId[0], "videoid":playlistId[1]}])); 
      });
} 
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
$().ready(function() {
    $('#wrapper').tubular({videoId: 'cpYOYQ4k_GU'});
});