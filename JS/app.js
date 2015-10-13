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
 var GOOGLE_PLUS_SCRIPT_URL = 'https://apis.google.com/js/client:plusone.js';
  var CHANNELS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/channels';
  var VIDEOS_UPLOAD_SERVICE_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet';
  var VIDEOS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/videos';
  var INITIAL_STATUS_POLLING_INTERVAL_MS = 15 * 1000;

  var accessToken;

  window.oauth2Callback = function(authResult) {
    if (authResult['access_token']) {
      accessToken = authResult['access_token'];

      $.ajax({
        url: CHANNELS_SERVICE_URL,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken
        },
        data: {
          part: 'snippet',
          mine: true
        }
      }).done(function(response) {
        $('#channel-name').text(response.items[0].snippet.title);
        $('#channel-thumbnail').attr('src', response.items[0].snippet.thumbnails.default.url);

        $('.pre-sign-in').hide();
        $('.post-sign-in').show();
      });
    }
  };

  function initiateUpload(e) {
    e.preventDefault();

    var file = $('#file').get(0).files[0];
    if (file) {
      $('#submit').attr('disabled', true);

      var metadata = {
        snippet: {
          title: $('#title').val(),
          description: $('#description').val(),
          categoryId: 22
        }
      };

      $.ajax({
        url: VIDEOS_UPLOAD_SERVICE_URL,
        method: 'POST',
        contentType: 'application/json',
        headers: {
          Authorization: 'Bearer ' + accessToken,
          'x-upload-content-length': file.size,
          'x-upload-content-type': file.type
        },
        data: JSON.stringify(metadata)
      }).done(function(data, textStatus, jqXHR) {
        resumableUpload({
          url: jqXHR.getResponseHeader('Location'),
          file: file,
          start: 0
        });
      });
    }
  }

  function resumableUpload(options) {
    var ajax = $.ajax({
      url: options.url,
      method: 'PUT',
      contentType: options.file.type,
      headers: {
        'Content-Range': 'bytes ' + options.start + '-' + (options.file.size - 1) + '/' + options.file.size
      },
      xhr: function() {
        // Thanks to http://stackoverflow.com/a/8758614/385997
        var xhr = $.ajaxSettings.xhr();

        if (xhr.upload) {
          xhr.upload.addEventListener(
            'progress',
            function(e) {
              if(e.lengthComputable) {
                var bytesTransferred = e.loaded;
                var totalBytes = e.total;
                var percentage = Math.round(100 * bytesTransferred / totalBytes);

                $('#upload-progress').attr({
                  value: bytesTransferred,
                  max: totalBytes
                });

                $('#percent-transferred').text(percentage);
                $('#bytes-transferred').text(bytesTransferred);
                $('#total-bytes').text(totalBytes);

                $('.during-upload').show();
              }
            },
            false
          );
        }

        return xhr;
      },
      processData: false,
      data: options.file
    });

    ajax.done(function(response) {
      var videoId = response.id;
      $('#video-id').text(videoId);
      $('.post-upload').show();
      checkVideoStatus(videoId, INITIAL_STATUS_POLLING_INTERVAL_MS);
    });

    ajax.fail(function() {
      $('#submit').click(function() {
        alert('Not yet implemented!');
      });
      $('#submit').val('Resume Upload');
      $('#submit').attr('disabled', false);
    });
  }

  function checkVideoStatus(videoId, waitForNextPoll) {
    $.ajax({
      url: VIDEOS_SERVICE_URL,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + accessToken
      },
      data: {
        part: 'status,processingDetails,player',
        id: videoId
      }
    }).done(function(response) {
      var processingStatus = response.items[0].processingDetails.processingStatus;
      var uploadStatus = response.items[0].status.uploadStatus;

      $('#post-upload-status').append('<li>Processing status: ' + processingStatus + ', upload status: ' + uploadStatus + '</li>');

      if (processingStatus == 'processing') {
        setTimeout(function() {
          checkVideoStatus(videoId, waitForNextPoll * 2);
        }, waitForNextPoll);
      } else {
        if (uploadStatus == 'processed') {
          $('#player').append(response.items[0].player.embedHtml);
        }

        $('#post-upload-status').append('<li>Final status.</li>');
      }
    });
  }

  $(function() {
    $.getScript(GOOGLE_PLUS_SCRIPT_URL);

    $('#upload-form').submit(initiateUpload);
  });
















