function Project (opts) {
  this.title = opts.title;
  this.projectURL = opts.projectURL;
  this.desc = opts.desc;
  this.repoURL = opts.repoURL;
  this.image = opts.image;
  this.completedOn = opts.completedOn;
  this.category = opts.category;
}

Project.all = [];

Project.prototype.toHtml = function() {
  var appTemplate = $('#project-template').html();
  var compileTemplate = Handlebars.compile(appTemplate);
  this.daysAgo = parseInt((new Date() - new Date(this.completedOn))/60/60/24/1000);
  this.completedStatus = this.completedOn ? 'completed ' + this.daysAgo + ' days ago' : '(incomplete)';
  return compileTemplate(this);
};

Project.loadAll = function (rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.completedOn)) - (new Date(a.completedOn));
  });

  rawData.forEach(function(ele) {
    Project.all.push(new Project(ele));
  });
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
        $.getJSON(url, function(rawData) {
          Project.loadAll(rawData);
          localStorage.rawData = JSON.stringify(rawData);
          localStorage.eTag = eTag;
          projectView.initIndexPage();
        });
      }
    }
  });
};
