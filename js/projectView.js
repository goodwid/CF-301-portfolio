// 100% hand-retyped from the blog project! w00t!

var projectView = {};

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
  $('nav ul').on('click','.tab', function(event) {   // Class needed here to differentiate li elements from other links in the nav bar.
    event.preventDefault();
    $('main > section').each(function() {
      $(this).hide();
    });
    $($(this).find('a').attr('href')).show();
  });
};

$(document).ready(function() {
  projectView.populateFilter();
  projectView.handleFilter();
  projectView.handleMainNav();
  $('#about').hide();
});
