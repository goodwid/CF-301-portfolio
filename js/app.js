
var portfolioItems = [];

function Project (opts) {
    this.title = opts.title;
    this.projectURL = opts.projectURL;
    this.desc = opts.desc;
    this.repoURL = opts.repoURL;
    this.image = opts.image;
    this.completedOn = opts.completedOn;
    this.category = opts.category;
}

Project.prototype.toHtml = function() {
    var $newProject = $('article.template').clone();

    $newProject.find('h3').text(this.title);
    $newProject.attr('data-category', this.category);
    $newProject.find('img').attr('src',this.image);
    $newProject.find('p:last').html(this.desc);
    $newProject.find('a').attr('href',this.projectURL);
    $newProject.find('p a').attr('href',this.repoURL);
    $newProject.find('date').text(this.completedOn);

    $newProject.removeClass('template');

    return $newProject;
};

rawData.forEach(function(ele) {
    portfolioItems.push(new Project(ele));
});

portfolioItems.forEach(function(a) {
    $('#projects').append(a.toHtml());
});
