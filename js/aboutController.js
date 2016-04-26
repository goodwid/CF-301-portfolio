(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    $('#about').fadeIn();
    $('header p').css('opacity','0');
    if($('.icon-menu').is(':visible')) {
      $('nav ul').hide();
    }
  };

  module.aboutController = aboutController;
})(window);
