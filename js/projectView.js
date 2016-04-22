  // 100% hand-retyped from the blog project! w00t!
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
    var val = {
      data: ''
    };
    var optionTag = '';
    var appTemplate = $('#selector-template').html();
    var compileTemplate = Handlebars.compile(appTemplate);

    projectView.categories.forEach(function (cat) {
      val.data = cat;
      optionTag = compileTemplate(val);
      if ($('#category-filter option[value="' + val.data + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
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

  // Handles the internal page navigation from the nav bar.
  projectView.handleMainNav = function() {
    $('nav ul').on('click','.tab', function(event) {
      event.preventDefault();
      $('main > section').each(function() {
        $(this).hide();
      });
      $($(this).find('a').attr('href')).fadeIn();

      if ($(this).find('a').attr('href') === '#about') {
        $('header p').css('opacity','0');   // using opacity becuase hide/show would alter the size of the header, making it jumpy.
      } else {
        $('header p').css('opacity','1');
      }
      if($('.icon-menu').is(':visible')) {
        $('nav ul').hide();
      }
    });
  };

  // hides the menu after clickking on the menu icon.
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
    projectView.handleMainNav();
    projectView.handleHamburgerClick();
    projectView.displayLines();
  };

  module.projectView = projectView;
}(window));
