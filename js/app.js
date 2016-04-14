
var portfolioItems = [];

function Project (opts) {
  this.title = opts.title;
  this.projectURL = opts.projectURL;
  this.desc = opts.desc;
  this.repoURL = opts.repoURL;
  this.image = opts.image;
  this.completedOn = opts.completedOn;
  this.category = opts.category;
}

Project.prototype.toHtml = function() {
  var appTemplate = $('#project-template').html();
  var compileTemplate = Handlebars.compile(appTemplate);
  var html = compileTemplate(this);
  this.daysAgo = parseInt((new Date() - new Date(this.completedOn))/60/60/24/1000);
  this.completedStatus = this.completedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return html;
};

rawData.forEach(function(ele) {
  portfolioItems.push(new Project(ele));
});

portfolioItems.forEach(function(a) {
  $('#projects').append(a.toHtml());
});
