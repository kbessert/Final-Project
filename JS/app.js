function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
var app = angular.module("detroitMusicApp", ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/main-view',
		{
			templateUrl: 'partials/main-view.html',
			controller: 'mainCtrl', 
			
		});
	$routeProvider.when('/event-view',
		{
			templateUrl: 'partials/event-view.html',
			controller: 'eventCtrl'
		});
	$routeProvider.otherwise('/partials/404.html');
});

app.controller('mainCtrl', ['$scope', function($scope) {
 

$(function() {
    var token = 'DIUFAQ7JQZVPW5NIIWJ5';
    var $events = $("#events");
    var bluesMusicId=["Blues","PLtBIO70rIs?list=PLcHnJ21xVEoE8JXUX3uyQkJdHmnk1g7SZ"];
    var countryMusicId=["Country","NHJKU_iVrtM?list=PLcHnJ21xVEoGUUA0dO2MoW1Rr-f92HFEY"];
    var punkMusicId=["Punk/Alt","ZfvirxZMCr8?list=PLcHnJ21xVEoEnnqFQ6sDnjU9_QTmorXzj"];
    var gospelMusicId=["Gospel","2Egepsyuzss?list=PLcHnJ21xVEoGuzZlm32m5n3JkjTH2Z1lX"];
    var rockMusicId=["Rock","DIXlnn9V88s?list=PLcHnJ21xVEoF-XkPHSsP1p8Vkp_k1WeKn"];
    var urbanMusicId=["Urban","P-W_KBNFhwU?list=PLcHnJ21xVEoGh9gcKQ8eStTAcpPqq8CMg"];
    var jazzMusicId=["Jazz","hcHiala5Jq8?list=PLcHnJ21xVEoEpf0itQudCgBG_v4USuUtq"];
    var elecDanMusicId=["Electronic","njRkmj9l4Z0?list=PLcHnJ21xVEoH7s6XHyAzkeKBN3-RF0Vq7"];
    var rapMusicId=["Rap","nQhbzs-zo_0?list=PLcHnJ21xVEoEHilkcfnWTZzZCCGkEYwns"];
    var classicalMusicId = ["Classical","oyB8iO-BPgQ?list=PLcHnJ21xVEoGtkxKWo5-g45245aC4MVFM"];
    $.get('http://api.songkick.com/api/3.0/metro_areas/18073/calendar.json?apikey=CVym1urfpjSkA2ph', function(res) {
      if(res.resultsPage.results.event.length) {
        var s = "<ul class='eventList'>";
        res.resultsPage.results.event.forEach(function (event) {
           var eventTime = moment(event.start.datetime).format('M/D/YYYY h:mm A');
          event.performance.forEach(function (perf){
            //console.log(event.start);
            if(event.start.time!==null){
            s += "<li><a href='" + event.uri + "'>" + perf.displayName + " at " + event.venue.displayName + "<br></a>" + "Date/Time: " + eventTime
            +"<img src='http://images.sk-static.com/images/media/profile_images/artists/"+perf.artist.id+"/huge_avatar'>" 
           + "</p>"+"</li>";
              }else{
            s += "<li><a href='" + event.uri + "'>" + perf.displayName + " at " + event.venue.displayName  + "<br></a>" + "Date: " + event.start.date +
            +"<img src='http://images.sk-static.com/images/media/profile_images/artists/"+perf.artist.id+"/huge_avatar'>"
            + "</p>"+"</li>"
              }
          });          
        });
        s += "</ul>";
        $events.html(s);
        //console.log(event);
      } else {
        $events.html("<p>Sorry, there are no upcoming events.</p>");
      }
    });
    function runCategoryApi(playlistId){    
            $("#results").html("");
              $.get("partials/videotemplate.html", function(data) {
                  $("#results").append(tplawesome(data, [{"title":playlistId[0], "videoid":playlistId[1]}])); 
      });
    } 
});
}]);
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
            order: "viewCount"
       }); 
       // execute the request   
         request.execute(function(response) {
          //console.log(response.result.items);
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
              //console.log(index, item);
              $.get("partials/videotemplate.html", function(data) {
                  $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
              });
            });
            resetVideoHeight();
         });
       });
    $(window).on("resize", resetVideoHeight);


function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDc6CAlmMDlI4EH2YHeGnVVTW-RvU564QM");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}


  $( "#categories" )
    .mouseenter(function() {
      $("h3").fadeTo(200, 1);
      $("img").fadeTo(200, 0.3);
    })
    .mouseleave(function() {
      $("h3").fadeTo(200, 1);
      $("img").fadeTo(200, 1);
    });

  $( "#categories" )
    .mouseleave(function() {
      $("h3").fadeTo(200, 0);
    });









;