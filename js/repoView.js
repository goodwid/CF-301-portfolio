(function(module) {
  var repoView = {};

  var ui = function() {
    $('#gh-list').empty();
  };

  var render = Handlebars.compile($('#repo-template').html());

  repoView.index = function () {
    ui();
    $('#gh-list').append(
      repos.owned(repoOwner).map(render)
    );
  };

  module.repoView = repoView;
})(window);
