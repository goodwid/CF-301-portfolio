
var portfolioItems = [];

function Project (opts) {
    this.title = opts.title;
    this.projectURL = opts.projectURL;
    this.desc = opts.desc;
    this.repoURL = opts.repoURL;
    this.image = opts.image;
    this.completedOn = opts.completedOn;
}

Project.prototype.toHtml = function() {
    var $newProject = $('article.template').clone();

    $newProject.find('.project-title').text(this.title);
    $newProject.find('.project-image').attr('src',this.image);
    $newProject.find('.project-desc').html(this.desc);
    $newProject.find('.repo-url').attr('href',this.repoURL);
    $newProject.find('.project-url').attr('href',this.projectURL);
    $newProject.find('.project-date').text(this.completedOn);

    $newProject.removeClass('template');
    $newProject.draggable();

    return $newProject;
};

rawData.forEach(function(ele) {
    portfolioItems.push(new Project(ele));
});

portfolioItems.forEach(function(a) {
    $('#projects').append(a.toHtml());
});
