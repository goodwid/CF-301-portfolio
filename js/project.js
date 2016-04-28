(function(module) {

  function Project (opts) {
    Object.keys(opts).forEach(function(e, index, keys) {
      this[e] = opts[e];
    },this);
    this.daysAgo = parseInt((new Date() - new Date(this.completedOn))/60/60/24/1000);
    this.completedStatus = this.completedOn ? 'completed ' + this.daysAgo + ' days ago' : '(incomplete)';
  }

  Project.all = [];

  // feeds all categories into an array, projectView.categories
  Project.initCategories = function() {
    return Project.all.map(function (obj) {
      return obj.category;
    }).sort().reduce(function(result,el) {
      if (el != result[0]) result.unshift(el);
      return result;
    }, []);
  };

  Project.prototype.toHtml = function(template) {
    return template(this);
  };

  // sorts data and instantiates Project objects into Project.all array.
  Project.loadAll = function (rawData) {
    rawData.sort(function(a,b) {
      return (new Date(b.completedOn)) - (new Date(a.completedOn));
    });
    Project.all = rawData.map(function (ele) {
      return new Project(ele);
    });
  };

  // The very beginning of programmatic logic.
  // Reads data from local storage or an AJAX request, then passes control to projectView.
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
            console.log('getJSON failed, check JSON format or file presence.');
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
