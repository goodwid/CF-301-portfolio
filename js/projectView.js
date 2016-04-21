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

    projectView.categories.forEach(function (cat) {
      val.data = cat;
      optionTag = compileTemplate(val);
      if ($('#category-filter option[value="' + val.data + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    });
  };

  // projectView.generateFilterProcessor = function(category) {
  //
  //   return {
  //     show: function () {
  //
  //     },
  //     hide: function () {
  //       projectView.categories().filter(function()
  //     }
  //   };
  // };

  projectView.handleFilter = function() {
    $('#category-filter').on('change', function() {
      var category = $('#category-filter').val();
      var view = $('input[name=view]:checked').val();
      if (!category) {
        projectView.renderProjects(projectView.categories,projectView.filters[view]);
      } else {
        projectView.renderProjects(category,projectView.filters[view]);
      }
    });
  };

  // projectView.handleFilter = function() {
  //   $pa = $('#projects article');
  //
  //   $('#category-filter').on('change', function() {
  //     console.log($('input[name=view]:checked').val());
  //     if ($(this).val()) {
  //       $pa.each(function() {
  //         $(this).hide();
  //       });
  //
  //       $pa.filter(function() {
  //         return $(this).attr('data-category') == $('#category-filter').val();
  //       }).show();
  //     } else {
  //       $pa.each(function() {
  //         $(this).show();
  //       });
  //     }
  //   });
  // };

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



  projectView.initIndexPage = function() {
    projectView.filters = {};
    projectView.initTemplates();
    projectView.categories = Project.initCategories();
    projectView.renderProjects(['completed'],projectView.filters.tile);
    projectView.populateFilter();
    projectView.handleFilter();
    projectView.handleMainNav();
    projectView.handleHamburgerClick();
    projectView.displayLines();

    $('#about').hide();
  };


  module.projectView = projectView;
}(window));
