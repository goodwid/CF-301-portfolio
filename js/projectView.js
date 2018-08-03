(function(module) {
  const projectView = {};

  // precompiles the Handlebars templates into an object so that the
  // .renderProjects method has a choice of which template to use.
  // Runs once at load.
  projectView.initTemplate = function() {
    const template = $('#project-template').html();
    projectView.template = Handlebars.compile(template);
  };

  // hides the menu after clicking on the menu icon.
  projectView.handleHamburgerClick = function () {
    $('.icon-menu').on('click', () => $('nav ul').show());
  };

  // redraws #projects based on the category filter and formatting choices selected by user.
  projectView.renderProjects = function() {
    const $p = $('#projects');
    Project.all.forEach(proj => {
      $p.append(proj.toHtml(projectView.template));
    });
  };

  // Initializes the view
  projectView.initIndexPage = function() {
    projectView.initTemplate();
    projectView.renderProjects();
    projectView.handleHamburgerClick();
  };

  module.projectView = projectView;
}(window));
