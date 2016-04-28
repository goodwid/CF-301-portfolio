(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {

    var url = '/github/user/repos';
    var jqXHR = $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      success: function(data) {
        repos.all = data;
      }
    }).done(callback).error (function() {
      console.log('An error occured fetching data from '+url);
    });
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  repos.owned = function(owner) {
    return repos.all.filter(function (repo) {
      return repo.owner.login === owner;
    });
  };

  module.repos = repos;
})(window);
