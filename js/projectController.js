(function(module) {
  var projectController = {};

  Project.fetchAll();

  projectController.index = function() {
    $('main > section').hide();
    $('header p').css('opacity','1');
    $('#projects').fadeIn();
  };

  module.projectController = projectController;
})(window);
