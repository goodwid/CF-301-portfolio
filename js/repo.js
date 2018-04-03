(function(module) {
  const repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    const url = '/github/user/repos';
    fetch(url)
    .then(result => result.json())
    .then(data => {
      console.log('repo data: ', data);
      repos.all = data;
      callback();
    })
    .catch(err => console.log(`An error occured: ${err}`));
  };

  repos.owned = function(owner) {
    return repos.all.filter(function (repo) {
      return repo.owner.login === owner;
    });
  };

  module.repos = repos;
})(window);
