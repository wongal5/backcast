var AppView = Backbone.View.extend({

  el: '#app',

  initialize: function(videoData = window.exampleVideoData) {
    this.videos = new Videos(videoData);
    this.videos.search('kittens');
    this.render();

    this.videos.on('videoChange', function(id) {
      var selectedVideo;
      for (var i = 0; i < this.videos.models.length; i++) {
        if (this.videos.models[i].id === id) {
          selectedVideo = this.videos.models[i];
          break;
        }
      }
      new VideoPlayerView({
        el: this.$('.player'),
        model: selectedVideo,
        collection: this.videos
      }).render();
    }, this);

    appViewThis = this;
    
    $(function() {
      $('#search-btn').on('click', function() {
        appViewThis.videos.search($('.form-control').val());
      });
      $('.form-control').keypress(function(e) {
        if (e.keyCode === 13) {
          $('#search-btn').trigger('click');
        }
      });
    });
    
  },

  render: function() {
    this.$el.html(this.template());

    new VideoListView({
      el: this.$('.list'),
      collection: this.videos
    }).render();

    new VideoPlayerView({
      el: this.$('.player'),
      model: this.videos.models[0],
      collection: this.videos
    }).render();

    new SearchView({
      el: this.$('.search')
    }).render();

    return this;
  },
  
  template: templateURL('src/templates/app.html')

  // Listeners

  // Listen for search submit
  // Triggers api fetch of search term.
  // Updates video collection with 5 new video models
  // Updates videoListView based on updated video collection

  // Listen for click on video list title
  // Pass selected model into VideoPlayerView 

});
