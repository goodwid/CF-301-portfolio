/* globals repos repoView */

(function(module) {
  const aboutController = {};

  aboutController.index = function() {
    $('main > section').hide();
    $('#about').fadeIn();
    $('header p').css('opacity','0');
    if($('.icon-menu').is(':visible')) {
      $('nav ul').hide();
    }
    repos.requestRepos(repoView.index);
  };

  module.aboutController = aboutController;
})(window);
