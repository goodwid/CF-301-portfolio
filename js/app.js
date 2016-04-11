var portfolioItems = [];

function Project (opts) {
    this.title = opts.title;
    this.projectURL = opts.projectURL;
    this.desc = opts.desc;
    this.repoURL = opts.repoURL;
    this.image = opts.image;
    this.completedOn = opts.completedOn;

}

Project.prototype.toHtml = function () {
    var $newProject = $('article.template').clone();

    $newProject.find('h3').text(this.title);
    $newProject.find('img').attr('src',this.)
}
