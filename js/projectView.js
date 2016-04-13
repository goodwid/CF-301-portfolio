// 100% hand-retyped from the blog project! w00t!

var projectView = {};

projectView.populateFilter = function() {
    var cats = [];
    var category;
    optionTag = '';
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
            $('#projects article').each(function() {
                $(this).show();
            });
        }
    });
};

projectView.handleMainNav = function() {
    $('nav ul').on('click','li', function() {
        console.log($(this).find('a').attr('href'));




        // $('nav ul').find('a:first').click(function (){
        //     $('#about').hide();
        //     $('#projects').show();
        // });
        // $('nav ul').find('a:nth-child(2)').click(function (){
        //     $('#about').show();
        //     $('#projects').hide();
        // });
    });
};



$(document).ready(function() {
    projectView.populateFilter();
    projectView.handleFilter();
    projectView.handleMainNav();
});
