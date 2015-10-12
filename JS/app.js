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
     rapMusicId=["Rap","nQhbzs-zo_0,OANzHByk2dU,M7Hl6T2TX2g,P0ux7l1euAs,HoYXXFJAkXU"],
     classicalMusicId = ["Classical","videoseries&&autoplay=1?list=PLcHnJ21xVEoGtkxKWo5-g45245aC4MVFM"]
    ];
    customMusicArray=[];
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
   runCategoryApi(rapMusicId); 
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
function runCategoryApi(playlistId){
      console.log(playlistId);

            $("#results").html("");
              $.get("partials/videotemplate.html", function(data) {
                $('div.item').remove();
                  $("#results").append(tplawesome(data, [{"title":playlistId[0], "videoid":playlistId[1]}]));
                    $('div[data-youtube-id]').ntzYoutubeEmbed();
      });
} 













var signinCallback = function (result){
  if(result.access_token) {
    var uploadVideo = new UploadVideo();
    uploadVideo.ready(result.access_token);
  }
};

var STATUS_POLLING_INTERVAL_MILLIS = 60 * 1000; // One minute.


/**
 * YouTube video uploader class
 *
 * @constructor
 */
var UploadVideo = function() {
  /**
   * The array of tags for the new YouTube video.
   *
   * @attribute tags
   * @type Array.<string>
   * @default ['google-cors-upload']
   */
  this.tags = ['youtube-cors-upload'];

  /**
   * The numeric YouTube
   * [category id](https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.videoCategories.list?part=snippet®ionCode=us).
   *
   * @attribute categoryId
   * @type number
   * @default 22
   */
  this.categoryId = 22;

  /**
   * The id of the new video.
   *
   * @attribute videoId
   * @type string
   * @default ''
   */
  this.videoId = '';

  this.uploadStartTime = 0;
};


UploadVideo.prototype.ready = function(accessToken) {
  this.accessToken = accessToken;
  this.gapi = gapi;
  this.authenticated = true;
  this.gapi.client.request({
    path: '/youtube/v3/channels',
    params: {
      part: 'snippet',
      mine: true
    },
    callback: function(response) {
      if (response.error) {
        console.log(response.error.message);
      } else {
        $('#channel-name').text(response.items[0].snippet.title);
        $('#channel-thumbnail').attr('src', response.items[0].snippet.thumbnails.default.url);

        $('.pre-sign-in').hide();
        $('.post-sign-in').show();
      }
    }.bind(this)
  });
  $('#button').on("click", this.handleUploadClicked.bind(this));
};

/**
 * Uploads a video file to YouTube.
 *
 * @method uploadFile
 * @param {object} file File object corresponding to the video to upload.
 */
UploadVideo.prototype.uploadFile = function(file) {
  var metadata = {
    snippet: {
      title: $('#title').val(),
      description: $('#description').text(),
      tags: this.tags,
      categoryId: this.categoryId
    },
    status: {
      privacyStatus: $('#privacy-status option:selected').text()
    }
  };
  var uploader = new MediaUploader({
    baseUrl: 'https://www.googleapis.com/upload/youtube/v3/videos',
    file: file,
    token: this.accessToken,
    metadata: metadata,
    params: {
      part: Object.keys(metadata).join(',')
    },
    onError: function(data) {
      var message = data;
      // Assuming the error is raised by the YouTube API, data will be
      // a JSON string with error.message set. That may not be the
      // only time onError will be raised, though.
      try {
        var errorResponse = JSON.parse(data);
        message = errorResponse.error.message;
      } finally {
        alert(message);
      }
    }.bind(this),
    onProgress: function(data) {
      var currentTime = Date.now();
      var bytesUploaded = data.loaded;
      var totalBytes = data.total;
      // The times are in millis, so we need to divide by 1000 to get seconds.
      var bytesPerSecond = bytesUploaded / ((currentTime - this.uploadStartTime) / 1000);
      var estimatedSecondsRemaining = (totalBytes - bytesUploaded) / bytesPerSecond;
      var percentageComplete = (bytesUploaded * 100) / totalBytes;

      $('#upload-progress').attr({
        value: bytesUploaded,
        max: totalBytes
      });

      $('#percent-transferred').text(percentageComplete);
      $('#bytes-transferred').text(bytesUploaded);
      $('#total-bytes').text(totalBytes);

      $('.during-upload').show();
    }.bind(this),
    onComplete: function(data) {
      var uploadResponse = JSON.parse(data);
      this.videoId = uploadResponse.id;
      $('#video-id').text(this.videoId);
      $('.post-upload').show();
      this.pollForVideoStatus();
    }.bind(this)
  });
  // This won't correspond to the *exact* start of the upload, but it should be close enough.
  this.uploadStartTime = Date.now();
  uploader.upload();
};

UploadVideo.prototype.handleUploadClicked = function() {
  $('#button').attr('disabled', true);
  this.uploadFile($('#file').get(0).files[0]);
};

UploadVideo.prototype.pollForVideoStatus = function() {
  this.gapi.client.request({
    path: '/youtube/v3/videos',
    params: {
      part: 'status,player',
      id: this.videoId
    },
    callback: function(response) {
      if (response.error) {
        // The status polling failed.
        console.log(response.error.message);
        setTimeout(this.pollForVideoStatus.bind(this), STATUS_POLLING_INTERVAL_MILLIS);
      } else {
        var uploadStatus = response.items[0].status.uploadStatus;
        switch (uploadStatus) {
          // This is a non-final status, so we need to poll again.
          case 'uploaded':
            $('#post-upload-status').append('<li>Upload status: ' + uploadStatus + '</li>');
            setTimeout(this.pollForVideoStatus.bind(this), STATUS_POLLING_INTERVAL_MILLIS);
            break;
          // The video was successfully transcoded and is available.
          case 'processed':
            $('#player').append(response.items[0].player.embedHtml);
            $('#post-upload-status').append('<li>Final status.</li>');
            break;
          // All other statuses indicate a permanent transcoding failure.
          default:
            $('#post-upload-status').append('<li>Transcoding failed.</li>');
            break;
        }
      }
    }.bind(this)
  });
};
