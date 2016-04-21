(function(module) {
  function Project (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
    this.daysAgo = parseInt((new Date() - new Date(this.completedOn))/60/60/24/1000);
    this.completedStatus = this.completedOn ? 'completed ' + this.daysAgo + ' days ago' : '(incomplete)';
  }

  Project.all = [];
  Project.categories = [];

  Project.initTemplates = function() {
    return Project.all.map(function (obj) {
      return obj.category;
    }).sort().reduce(function(prev,curr) {
      if (curr != prev[0]) prev.unshift(curr);
      return prev;
    }, []);
  };

  Project.prototype.toHtml = function(template) {

    return template(this);
  };

  Project.loadAll = function (rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.completedOn)) - (new Date(a.completedOn));
    });

    // replaced the commented out code below with:
    Project.all = rawData.map(function(ele) {
      return new Project(ele);
    });
    //
    // rawData.forEach(function(ele) {
    //   Project.all.push(new Project(ele));
    // });
  };

  Project.fetchAll = function () {
    var url = 'data/projects.json';

    var jqXHR = $.ajax({
      url: url,
      type: 'HEAD',
      dataType: 'json',
      success: function () {
        var eTag = jqXHR.getResponseHeader('ETag');
        if ((localStorage.eTag === eTag) && (localStorage.rawData)) {
          Project.loadAll(JSON.parse(localStorage.rawData));
          projectView.initIndexPage();
        } else {
          $.getJSON(url)
          .done(function(rawData) {
            Project.loadAll(rawData);
            localStorage.rawData = JSON.stringify(rawData);
            localStorage.eTag = eTag;
            projectView.initIndexPage();
          })
          .fail(function() {
            console.log('getJSON failed, ');
          });
        }
      }

    });
  };
  //
  // This function calculates the # of lines of code overall from each project
  //
  Project.getLinesOfCode = function () {
    return Project.all.map(function(proj) {
      return proj.codelines;
    })
    .reduce(function(prev,curr) {
      return prev+curr;
    });
  };

  module.Project = Project;
}(window));
