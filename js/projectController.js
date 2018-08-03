/* globals Project projectView */

(function(module) {
  var projectController = {};

  Project.fetchAll(projectView.initIndexPage);

  projectController.index = function() {
    $('main > section').hide();
    $('header p').css('opacity','1');
    $('#projects').fadeIn();
  };

  module.projectController = projectController;
})(window);
