(function(module) {
  var projectView = {};

  // precompiles the Handlebars templates into an object so that the
  // .renderProjects method has a choice of which template to use.
  // Runs once at load.
  projectView.initTemplates = function() {
    var tileTemplate = $('#tile-template').html();
    var listTemplate = $('#list-template').html();
    projectView.template['tile'] = Handlebars.compile(tileTemplate);
    projectView.template['list'] = Handlebars.compile(listTemplate);
  };

  // popualates the filter based on available categories.
  // Runs once at load.
  projectView.populateFilter = function() {
    var optionTag = '';
    var template = Handlebars.compile($('#selector-template').html());
    projectView.categories.forEach(function (cat) {
      optionTag = template({data: cat});
      $('#category-filter').append(optionTag);
    });
  };

  // Handles the selector and radio button changes.
  projectView.handleFilter = function() {
    $('#selectors').on('change', function() {
      var category = $('#category-filter').val();
      var view = $('input[name=view]:checked').val();
      if (!category) {
        projectView.renderProjects(projectView.categories,projectView.template[view]);
      } else {
        projectView.renderProjects(category,projectView.template[view]);
      }
    });
  };

  // hides the menu after clicking on the menu icon.
  projectView.handleHamburgerClick = function () {
    $('.icon-menu').on('click', function () {
      $('nav ul').show();
    });
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

  // injects the total number of lines of code into the About section.
  projectView.displayLines = function() {
    $('#codelines').text(Project.getLinesOfCode());
  };

  // redraws #projects based on the category filter and formatting choices selected by user.
  projectView.renderProjects = function(categories, format) {
    $p = $('#projects');
    $p.off('click', 'a.read-on');   // avoids stacking of event handlers on subsequent renderings.
    $p.empty();
    Project.all.filter(function (proj) {
      return categories.indexOf(proj.category) > -1;
    })
    .forEach(function(proj) {
      $p.append(proj.toHtml(format));
    });
    projectView.setTeasers();
  };

  // Initializes the view
  projectView.initIndexPage = function() {
    projectView.template = {};
    projectView.initTemplates();
    projectView.categories = Project.initCategories();
    projectView.renderProjects(projectView.categories,projectView.template.tile);
    projectView.populateFilter();
    projectView.handleFilter();
    projectView.handleHamburgerClick();
    projectView.displayLines();
  };

  module.projectView = projectView;
}(window));
