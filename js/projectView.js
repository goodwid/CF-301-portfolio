  // 100% hand-retyped from the blog project! w00t!
(function(module) {
  var projectView = {};

  projectView.initTemplates = function() {
    var tileTemplate = $('#tile-template').html();
    var listTemplate = $('#list-template').html();
    projectView.filters['tile'] = Handlebars.compile(tileTemplate);
    projectView.filters['list'] = Handlebars.compile(listTemplate);
  };

  projectView.populateFilter = function() {
    var val = {
      data: ''
    };
    var optionTag = '';
    var appTemplate = $('#selector-template').html();
    var compileTemplate = Handlebars.compile(appTemplate);

    $('article').each(function () {
      val.data = $(this).attr('data-category');
      optionTag = compileTemplate(val);
      if ($('#category-filter option[value="' + val.data + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    });
  };

  projectView.handleFilter = function() {

    $('#category-filter').on('change', function() {
      if ($(this).val()) {
        $('#projects article').each(function() {
          $(this).hide();
        });

        $('#projects article').filter(function() {
          return $(this).attr('data-category') == $('#category-filter').val();
        }).show();
      } else {
        $('#projects article').each(function() {
          $(this).show();
        });
      }
    });
  };

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

  projectView.handleHamburgerClick = function () {
    $('.icon-menu').on('click', function () {
      $('nav ul').show();
    });
  };

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

  projectView.renderProjects = function(format) {
    Project.all.forEach(function(proj) {
      $('#projects').append(proj.toHtml(format));
    });
  };

  projectView.initIndexPage = function() {
    projectView.filters = {};
    projectView.initTemplates();
    projectView.renderProjects(projectView.filters.list);
    projectView.populateFilter();
    projectView.handleFilter();
    projectView.handleMainNav();
    projectView.setTeasers();
    projectView.handleHamburgerClick();
    projectView.displayLines();
    $('#about').hide();
  };


  module.projectView = projectView;
}(window));
