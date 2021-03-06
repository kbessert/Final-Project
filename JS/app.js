function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
var currentId;
var currentName;
var currentIdObject={};
var customMusicArray=[
 customMusicObjectUploads={playListName:"Uploads",playListId:""}
  ];
$(function() {
  var $events = $("#events");
  var randomNumber=Math.floor(Math.random()*10);
  var musicIdArray=[
    bluesMusicId={playListName:"Blues",playListId:"9AB-B5aIxaQ,t5HEzK1XYvI,NJZlAFYN5qI,pvYuQNy4oVc,PYCfN6mJ-c8"},
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
    $.getJSON('http://api.songkick.com/api/3.0/metro_areas/18073/calendar.json?apikey=CVym1urfpjSkA2ph&jsoncallback=?', function(res) {
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

      console.log(musicIdArray[randomNumber]);
   runCategoryApi(musicIdArray[randomNumber]); 
});
   $('nav').smoothScroll();
      $('li a').click(function(event) {
        console.log("smoothScroll");
        event.preventDefault();
        var link = this;
        $.smoothScroll({
          offset: -40,
          scrollTarget: link.hash

   });
        console.log(link.hash);
});
$('li.dropdown ul').find('a').on('click', function() {
  window.location = $(this).attr('href');
});

$(window).on("resize", resetVideoHeight);
$(function() {
  $.getScript(GOOGLE_PLUS_SCRIPT_URL);
  $('#upload-form').submit(initiateUpload);
});

function addToPlaylistIfExists(){
  console.log(customMusicArray);
  var valueHolder =  document.getElementById("value").value;
  var keyHolder = valueHolder.replace(/['"]+/g, '');
  var found = false;
  $.grep(customMusicArray, function(e){
    if(e.playListName === valueHolder){         
      e.playListId+=","+currentId;
      console.log(e);
      runCategoryApi(e);
      found = true;
      return;
  }
    });      
 if (!found){
  createNewPlaylist();
  }
}
function createNewPlaylist(){
  var newPlaylistObject = new Object;
  var valueHolder =  document.getElementById("value").value;
  var keyHolder = valueHolder.replace(/['"]+/g, '');
  console.log("playlist ran");
  console.log(document.getElementById("value").value);
  customMusicArray.push(newPlaylistObject);     
  var playListId = "playListId";
  newPlaylistObject.playListName = valueHolder;
  newPlaylistObject.playListId= currentId; 
  $.grep(customMusicArray, function(e){
    if(e.playListName === valueHolder){
      $("#results").html("");
      $.get("partials/playlisttemplate.html", function(data) {
        $("#options").append(tplawesome(data, [{"option":e.playListName}]));
      });
      runCategoryApi(e);
    }
  });
}
var oForm = document.getElementById('searchForm');
$(oForm).on("submit", function(e) {
  console.log(e);
  e.preventDefault();
  gapi.client.load('youtube', 'v3', function() {
    console.log('youtube API loaded...');  
    var request = gapi.client.youtube.search.list({
      part: "snippet",
      type: "video",
      videoCategoryId:10,
      q: encodeURIComponent($("#searchInput").val()).replace(/%20/g, "+"),
      maxResults: 1 
    });  
    console.log(request);
    request.execute(function(response) {
      var results = response.result;
      console.log(response);
      $("#results").html("");
      $.each(results.items, function(index, item) {
        $.get("partials/videotemplate.html", function(data) {
          currentName=item.snippet.title;
          currentId=item.id.videoId;
          $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
          $('div[data-youtube-id]').ntzYoutubeEmbed();
        });
      });
      resize();
    });
  });
});
$('button').on('click', function(e){
  e.preventDefault();
   console.log(this.className);
    if(this.className==="stop"){
      currentIdObject.playListName=currentName;
      currentIdObject.playListId=currentId;
    console.log(currentId);
      runCategoryApi(currentIdObject);

    }else{
  $('div[data-youtube-id]').trigger('player-' + this.className );
}
});
function resetVideoHeight() {
  $(".video").css("height", $("#results").width() * 9/16);
}
$("#wrapper").tubular({
  videoId: 'cpYOYQ4k_GU',
  mute: true,
  repeat: true
});

function initializeGapi() {
  document.cookie="VISITOR_INFO1_LIVE=oKckVSqvaGw; path=/; domain=.youtube.com";
  $.get("partials/playlisttemplate.html", function(data) {
    $("#options").append(tplawesome(data, [{"option":customMusicObjectUploads.playListName}]));
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
    console.log(currentPlaylistId.playListName,currentPlaylistId.playListId);
    currentName=(currentPlaylistId.playListName);
    currentId=(currentPlaylistId.playListId);
    $("#results").append(tplawesome(data, [{"title":currentPlaylistId.playListName, "videoid":currentPlaylistId.playListId}]));
    $('div[data-youtube-id]').ntzYoutubeEmbed();
  });
 resize();
}
window.addEventListener('resize', function(event){
resize();
});

function resize(){
    var margin= document.getElementById("margin");
   var item = document.getElementById("my-embed");
   var search = document.getElementById("search");
   if( $(window).width() < 1000){
  console.log("function ran");
    var screenWidth=$(window).width();   
    item.style.width = screenWidth -25;
    search.style.width =screenWidth -25;
    search.style.marginLeft=margin.style.marginLeft;
}else if ( $(window).width() > 1000){
  console.log("function rerun");
    item.style.width = 914;
    search.style.width =item.style.width;
    search.style.marginLeft=margin.style.marginLeft;
  }
}
var GOOGLE_PLUS_SCRIPT_URL = 'https://apis.google.com/js/client:plusone.js';
var CHANNELS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/channels';
var VIDEOS_UPLOAD_SERVICE_URL = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet';
var VIDEOS_SERVICE_URL = 'https://www.googleapis.com/youtube/v3/videos';
var INITIAL_STATUS_POLLING_INTERVAL_MS = 15 * 1000;
var accessToken;
$('.post-upload').hide();
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
        categoryId: 10
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
    if (processingStatus === 'processing') {
      setTimeout(function() {
        checkVideoStatus(videoId, waitForNextPoll * 2);
      }, waitForNextPoll);
    } else {
      if (uploadStatus === 'processed') {
        customMusicObjectUploads.playListId+=","+videoId;
        console.log(customMusicObjectUploads);
          $("#results").html("");
            $.get("partials/videotemplate.html", function(data) {
              $('div.item').remove();
              currentId=(customMusicObjectUploads.playListId);
                $("#results").append(tplawesome(data, [{"title":customMusicObjectUploads.playListName, "videoid":customMusicObjectUploads.playListId}]));
                  $('div[data-youtube-id]').ntzYoutubeEmbed();
                    $('#post-upload-status').empty();
                    $('#percent-transferred').text(null);
                    $('#bytes-transferred').text(null);
                    $('#total-bytes').text(null);
                    $('#upload-progress').attr({
                value: 0,
                max: 0
              });
                  $('#video-id').text("");
                  $('.post-upload').hide();
                  $('#submit').attr('disabled', false);
                });
        console.log(customMusicObjectUploads);
      }
      $('#post-upload-status').append('<li>Final status.</li>');
    }
  });
} 
resize();