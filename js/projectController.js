(function(module) {
  var projectController = {};

  Project.fetchAll();

  projectController.index = function() {
    $('main > section').hide();
    $('header p').css('opacity','1');
    $('#projects').fadeIn();
    if($('.icon-menu').is(':visible')) {
      $('nav ul').hide();
    }
  };

  module.projectController = projectController;
})(window);
