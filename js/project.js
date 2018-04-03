/* globals projectView */

(function(module) {

  function Project (opts) {
    Object.keys(opts).forEach(e => this[e] = opts[e]);
    this.daysAgo = parseInt((new Date() - new Date(this.completedOn))/60/60/24/1000);
    this.completedStatus = this.completedOn ? `completed ${this.daysAgo} days ago` : '(incomplete)';
  }

  Project.all = [];

  Project.prototype.toHtml = function(template) {
    return template(this);
  };

  // sorts data and instantiates Project objects into Project.all array.
  Project.loadAll = function (rawData) {
    rawData.sort((a,b) => new Date(b.completedOn) - new Date(a.completedOn));
    Project.all = rawData.map(el => new Project(el));
  };

  // The very beginning of programmatic logic.
  // Reads data from local storage or an AJAX request, then passes control to projectView.
  Project.fetchAll = function (callback) {
    const url = 'data/projects.json';

    fetch(url)
      .then(result => result.json())
      .then(result => {
        Project.loadAll(result);
        callback();
      })
      .catch(err => console.log(`Error during transfer: ${err}`));
  };

  module.Project = Project;
}(window));
