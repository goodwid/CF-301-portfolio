(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    $('#about').fadeIn();
    $('header p').css('opacity','0');
  };

  module.aboutController = aboutController;
})(window);
