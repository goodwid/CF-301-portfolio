(function(module) {
  const projectView = {};

  // precompiles the Handlebars templates into an object so that the
  // .renderProjects method has a choice of which template to use.
  // Runs once at load.
  projectView.initTemplate = function() {
    const tileTemplate = $('#tile-template').html();
    projectView.template = Handlebars.compile(tileTemplate);
  };

  // hides the menu after clicking on the menu icon.
  projectView.handleHamburgerClick = function () {
    $('.icon-menu').on('click', () => $('nav ul').show());
  };

  // hides the bulk of the description and handles a link to reveal the remainder.
  projectView.setTeasers = function() {
    $('.desc *:nth-of-type(n+2)').hide();
    $('#projects').on('click', 'a.read-on', function(e) {
      e.preventDefault();
      $(this).parent().find('*').fadeIn();
      $(this).hide();
    });
  };

  // redraws #projects based on the category filter and formatting choices selected by user.
  projectView.renderProjects = function() {
    const $p = $('#projects');
    // $p.off('click', 'a.read-on');   // avoids stacking of event handlers on subsequent renderings.
    // $p.empty();
    Project.all.forEach(proj => {
      $p.append(proj.toHtml(projectView.template));
    });
    projectView.setTeasers();
  };

  // Initializes the view
  projectView.initIndexPage = function() {
    projectView.initTemplate();
    projectView.renderProjects();
    projectView.handleHamburgerClick();
  };

  module.projectView = projectView;
}(window));
