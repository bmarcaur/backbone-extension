_.extend(Backbone.Collection.prototype, {
  // Start streaming data at a set interval
  // Will stop all previous streams and start a new stream
  stream: function(options) {
    this.unstream();
    var _update = _.bind(function() {
      this.fetch(options);
      this._intervalFetch = window.setTimeout(_update, options.interval || 1000);
    }, this);
    _update();
  },

  // Stops the current stream if it is currently streaming
  unstream: function() {
    if (this.isStreaming()){
      window.clearTimeout(this._intervalFetch);
      delete this._intervalFetch;
    }
  },

  // Returns the current state of the stream  
  isStreaming : function() {
    return !_.isUndefined(this._intervalFetch);   
  }
});