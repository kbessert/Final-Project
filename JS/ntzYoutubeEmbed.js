;(function( $, document ){
  /*
    <div class="item-type-video" data-youtube-id="YOUTUBE-VIDEO-ID"></div>
   */
  if (!Object.create) { Object.create = function (o) { if (arguments.length > 1) { throw new Error('Object.create implementation only accepts the first parameter.'); } function F() {} F.prototype = o; return new F(); }; }

  var youtubeTag = document.createElement('script');
  youtubeTag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(youtubeTag, firstScriptTag);

  var ntzYoutubeEmbed = {
    init: function( el ){
      var $this = this;
      $this.el = $( el );

      var ytTimer = window.setInterval(function(){
        if( typeof YT == 'object' && typeof YT.Player == 'function' ){
          window.clearInterval( ytTimer );
          $this.YTApiReady();
        }
      }, 10);
    } // init


    ,YTApiReady: function(){
      var $this = this;
      this.movieContainerID = 'video-' + Math.round( Math.random() * 1000000 );

      $('<div class="youtube-iframe" />').attr({
        'id': this.movieContainerID
      }).appendTo( $this.el );

      $this.createPlayer();
      
      this.el.on('player-pause', function(){ $this.player.pauseVideo(); });
      this.el.on('player-stop', function(){$this.player.seekTo(0);$this.player.stopVideo();$this.player.clearVideo();});
      this.el.on('player-play', function(){ $this.player.playVideo(); });

      this.el.on('player-toggle-state', function(){
        var player = $this.player,
            state = player.getPlayerState();

        if( state == 1 ){
          player.pauseVideo();
        }

        if( state == 2 ){
          player.playVideo();
        }
      });
    }//YTApiReady


    ,createPlayer: function(){
      var $this = this;

      var playerVars = $.extend({
          listType:'playlist',
          playlist:  this.el.data('youtube-id'), 
          enablejsapi   : 1,
          autohide      : 2,
          iv_load_policy: 3,
          modestbranding: true,
          origin        : window.location.origin,
          rel           : 0,
          showinfo      : 1,
          theme         : 'dark',
          color         : 'black',
          controls      : 0,
          autoplay      : 1,
          poster        : ""
        }, $this.el.data() );

      if( playerVars.poster ){
        var poster = $('<img class="player-poster" />').attr('src', playerVars.poster );
        poster.appendTo( $this.el );
        $this.el.addClass('player-has-poster');
        poster.on('click', function(){
          $(this).addClass('is-playing');
          $this.el.trigger('player-play');
        });
      }
      //if (window.matchMedia("(min-width: 769px)").matches) {
      this.player = new YT.Player( this.movieContainerID, {
        height    : '100%',
        width     : '100%',
        //videoId   : this.el.data('youtube-id'),
        //playlist : this.el.data('youtube-id'),
        playerVars: playerVars,
        events    : {
          'onReady'      : $.proxy( $this.movieReady, $this ),
          'onStateChange': $.proxy( $this.stateChange, $this )

        }

      });
      console.log(this.el.data('youtube-playlist'));
    }//createPlayer


    ,movieReady: function( player ){
      this.el.data('youtubePlayer', player.target ).trigger( 'player-ready', player );
resize();
    }//movieReady


    ,stateChange: function( state ){
      this.el.data('video-state', state).trigger('player-state-change', state);
    }//stateChange
  };

function resize(){
       var margin= document.getElementById("margin");
   var item = document.getElementById("my-embed");
   var search = document.getElementById("search");
   if( $(window).width() < 1000){
  console.log("function ran event");
    var screenWidth=$(window).width();   
    item.style.width = screenWidth -25;
    search.style.width =screenWidth -25;
    search.style.marginLeft=margin.style.marginLeft;
}else if ( $(window).width() > 1000){
  console.log("function rerun event");
    item.style.width = 914;
    search.style.width =item.style.width;
    search.style.marginLeft=margin.style.marginLeft;
  }
}

  $.fn.ntzYoutubeEmbed = function() {
    return this.each(function(){
      var obj = Object.create( ntzYoutubeEmbed );
      obj.init( this );
    });

  };

})( jQuery, document );

