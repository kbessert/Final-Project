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
    var bluesMusicId="PLcHnJ21xVEoE8JXUX3uyQkJdHmnk1g7SZ";
    var countryMusicId="PLcHnJ21xVEoGUUA0dO2MoW1Rr-f92HFEY";
    var punkMusicId="PLcHnJ21xVEoEnnqFQ6sDnjU9_QTmorXzj";
    var gospelMusicId="PLcHnJ21xVEoGuzZlm32m5n3JkjTH2Z1lX";
    var rockMusicId="PLcHnJ21xVEoF-XkPHSsP1p8Vkp_k1WeKn";
    var urbanMusicId="PLcHnJ21xVEoGh9gcKQ8eStTAcpPqq8CMg";
    var jazzMusicId="PLcHnJ21xVEoEpf0itQudCgBG_v4USuUtq";
    var elecDanMusicId="PLcHnJ21xVEoH7s6XHyAzkeKBN3-RF0Vq7";
    var rapMusicId="PLcHnJ21xVEoEHilkcfnWTZzZCCGkEYwns";
    var classicalMusicId = 'PLcHnJ21xVEoGtkxKWo5-g45245aC4MVFM';
    $.get('http://api.songkick.com/api/3.0/metro_areas/18073/calendar.json?apikey=CVym1urfpjSkA2ph', function(res) {
      //console.log(res.resultsPage.results.event);
      if(res.resultsPage.results.event.length) {
        var s = "<ul class='eventList'>";
        for(var i=0;i<res.resultsPage.results.event.length;i++) {
          var event = res.resultsPage.results.event[i];
          //console.log(event.displayName);
          //console.dir(event);
          console.log(event.performance[0], "performance");
          event.performance.forEach(function (perf){
            s += "<li><a href='" + event.uri + "'>" + event.displayName + "</a>" +"<img src='http://images.sk-static.com/images/media/profile_images/artists/"+perf.artist.id+"/huge_avatar'>"+ "</li>";
          });          
        }
        s += "</ul>";
        $events.html(s);
        //console.log(event);
      } else {
        $events.html("<p>Sorry, there are no upcoming events.</p>");
      }
    });
    function runCategoryApi(playlistId){    
      $.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C+id&playlistId='+playlistId+'&key=AIzaSyDc6CAlmMDlI4EH2YHeGnVVTW-RvU564QM', function(res) {
            var results = res;
            $("#results").html("");
            $.each(results.items, function(index, item) {
              $.get("partials/videotemplate.html", function(data) {
                  $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.snippet.resourceId.videoId}]));
              });
            });
      });
    } 
    $("form").on("submit", function(e) {
      runCategoryApi(classicalMusicId);
//        e.preventDefault();
//        // prepare the request
//        var request = gapi.client.youtube.search.list({
//             part: "snippet",
//             type: "video",
//             //videoSyndicated:"true",
//             videoCategoryId:10,
//             q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
//             maxResults: 3,
//             order: "viewCount",
//             //id:"UUILMnNgz2Npju29gheIcJGw",
//             //uploadId: "UUILMnNgz2Npju29gheIcJGw",
//             //channelId:"UCILMnNgz2Npju29gheIcJGw",
//             //playlistId:"PLcHnJ21xVEoGtkxKWo5-g45245aC4MVFM",
           
//        }); 
//        // execute the request
       
//          request.execute(function(response) {
//           console.log(response.result.items);
//             var results = response.result;
//             $("#results").html("");
//             $.each(results.items, function(index, item) {
//               console.log(index, item);
//               $.get("tpl/item.html", function(data) {
//                   $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
//               });
//             });
//             resetVideoHeight();
//          });
       });
        
//     $(window).on("resize", resetVideoHeight);
});

function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}

function init() {
    gapi.client.setApiKey("AIzaSyDc6CAlmMDlI4EH2YHeGnVVTW-RvU564QM");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
;
}]);