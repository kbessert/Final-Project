function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
var currentId;
var customMusicObject={};
$(function() {
    var $events = $("#events");
    var randomNumber=Math.floor(Math.random()*10);
    var car = {type:"Fiat", model:500, color:"white"};
    var musicIdArray=[
     bluesMusicId={playListName:"Blues",playListId:"PLtBIO70rIs,9AB-B5aIxaQ,t5HEzK1XYvI,NJZlAFYN5qI,pvYuQNy4oVc,PYCfN6mJ-c8"},
     countryMusicId={playListName:"Country",playListId:"NHJKU_iVrtM,RS9gV_E9gzg,64DhqqnGd1U,3m7c1vRBCt4,dP3EX84x6iY,ZHhZO21SGI4"},
     punkMusicId={playListName:"Punk/Alt",playListId:"ZfvirxZMCr8,6zsIl_2U3KM,gfVpzQjE3Jg,NRQzySw22Pw,EAskUOgclf8,zNHTqikczLg"},
     gospelMusicId={playListName:"Gospel",playListId:"2Egepsyuzss,fbkJqzNU1iA,nzuz_7aq_DU,Bcz1VXSQcLw,B2BLClDPq2M,HXkMS3zRE0M"},
     rockMusicId={playListName:"Rock",playListId:"DIXlnn9V88s,p2llUCFxobg,Q488hH9EQRg,2SPURmllUsw,LPbAQJEX7pg,bqOjtXPglt0"},
     urbanMusicId={playListName:"Urban",playListId:"P-W_KBNFhwU,bcsgYLqMRjg,I5xZxQ4-LcQ,Pgur1DPm-8Y,ZzHI5N6vCAQ"},
     jazzMusicId={playListName:"Jazz",playListId:"hcHiala5Jq8,LkwTZDXScz8,Zz1HKIB1q9U,4M3LHiT8jfg,ISm3PZiAuRE"},
     elecDanMusicId={playListName:"Electronic",playListId:"njRkmj9l4Z0,h2uACz02oQU,Ij7MpQ_sJ1Y,6Wuzm15u9-s,gA9a0tl2J7Y"},
     rapMusicId={playListName:"Rap",playListId:"nQhbzs-zo_0,OANzHByk2dU,M7Hl6T2TX2g,P0ux7l1euAs,HoYXXFJAkXU"},
     classicalMusicId ={playListName:"Classical",playListId:"oyB8iO-BPgQ,ocdlHb9WJzY,2UGmTZF5XYw,ElZGZbz73jc,8MR1z24W8kc"}
    ];
    
    $.get('http://api.songkick.com/api/3.0/metro_areas/18073/calendar.json?apikey=CVym1urfpjSkA2ph', function(res) {
      if(res.resultsPage.results.event.length) {
        res.resultsPage.results.event.forEach(function (event) {
           var eventTime = moment(event.start.datetime).format('M/D/YYYY h:mm A');
          event.performance.forEach(function (perf){
            if(event.start.datetime!==null){
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
 function addToPlaylistIfExists(){
     for(var prop in customMusicObject) {
      if(customMusicObject.hasOwnProperty(prop)) {
        if(customMusicObject[prop] === document.getElementById("value").value) {
           console.log("playlist ran");
            currentId= ","+ currentId;
            customMusicObject.playListId+=currentId;
            console.log(customMusicObject);
            runCategoryApi(customMusicObject);
            return; 
          }
        }
      }
      createNewPlaylist();
}
function createNewPlaylist(){
      console.log("playlist ran");
      console.log(document.getElementById("value").value);
    //customMusicObject.customPlayListId.push(eval(document.getElementById("value").value)=[]);
    customMusicObject.playListName = document.getElementById("value").value;
    console.log(document.getElementById('value').value);
    customMusicObject.playListId = currentId;
    console.log(customMusicObject);
     $("#results").html("");
    $.get("partials/playlisttemplate.html", function(data) {
      $("#options").append(tplawesome(data, [{"option":customMusicObject.playListName}]));
    });
    runCategoryApi(customMusicObject);
}
    $("form").on("submit", function(e) {
       e.preventDefault();
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            videoCategoryId:10,
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 1 
       }); 
       // execute the request   
         request.execute(function(response) {
          //console.log(response.result.items);
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
              //console.log(index, item);
              $.get("partials/videotemplate.html", function(data) {
                currentId=item.id.videoId;
                  $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                  $('div[data-youtube-id]').ntzYoutubeEmbed();
              });
            });
            resetVideoHeight();
         });
       });
  $('button').on('click', function(e){
        e.preventDefault();
        $('div[data-youtube-id]').trigger('player-pause');         
        $('div[data-youtube-id]').trigger('player-' + this.className );
      });
    $(window).on("resize", resetVideoHeight);
function resetVideoHeight() {
    $(".video").css("height", $("#results").width() * 9/16);
}
function init() {
  $('#wrapper').tubular({videoId: 'cpYOYQ4k_GU'});
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
function runCategoryApi(currentPlaylistId){
      console.log("ran cat api");
      console.log(currentPlaylistId);      
            $("#results").html("");
              $.get("partials/videotemplate.html", function(data) {
                $('div.item').remove();
                currentId=(currentPlaylistId.playListId);
                  $("#results").append(tplawesome(data, [{"title":currentPlaylistId.playListName, "videoid":currentPlaylistId.playListId}]));
                    $('div[data-youtube-id]').ntzYoutubeEmbed();
      });
} 

