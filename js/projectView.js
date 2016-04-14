// 100% hand-retyped from the blog project! w00t!

var projectView = {};

projectView.populateFilter = function() {
  var cats = [];
  var category;
  var optionTag = '';
  $('article').each(function () {
    if (!$(this).hasClass('template')) {
      category = $(this).attr('data-category');
      if (cats.indexOf(category) === -1) {  // Only add to categories array if it's not already in there.
        cats.push(category);
      }
    }
  });
  cats.forEach(function (val) {
    optionTag = '<option value="' + val + '">' + val + '</option>';
    $('#category-filter').append(optionTag);
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
      $('#projects article:not(.template)').each(function() {
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
