(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {

    var url = 'https://api.github.com/user/repos';
    var authString = 'token '+githubToken;
    var jqXHR = $.ajax({
      url: url,
      type: 'GET',
      dataType: 'JSON',
      headers: {
        "Authorization": authString
      },
    }).done(function(data) {
      repos.all = data;
    }).error (function() {
      console.log('An error occured fetching data from '+url);
    });
    if (callback) callback();
  };

  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  repos.owned = function(owner) {
    return repos.all.filter(repo => repo.owner.login === owner);
  };

  module.repos = repos;
})(window);
