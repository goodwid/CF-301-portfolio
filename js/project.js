/* globals projectView */

(function(module) {
  
  class Project {
    constructor (opts) {
      Object.keys(opts).forEach(e => this[e] = opts[e]);
    }
    toHtml(template) {
      return template(this);
    }
    loadAll(rawData) {
      
    }
  }

  Project.all = [];

  // sorts data and instantiates Project objects into Project.all array.
  Project.loadAll = function (rawData) {
    rawData.sort((a,b) => a.order - b.order);
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
