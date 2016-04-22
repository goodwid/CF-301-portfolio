Mon Apr 11 15:29:02 PDT 2016

## User Stories
1. As a developer, I want my site to use valid and semantic markup, so that employers will love me.
- As the creator, I want the page to link to my social and GitHub pages, so that visitors can follow me, and I can build my audience.
- As a developer, I want portfolio items displayed with a repeatable template, so that I can reuse it, and abstract out the details for individual project


### high order refactoring

I plan to create a 2nd view format, tile vs. list, and allow users to select the category and view format.  The high order function will pre-compile the categories from the dataset vs. querying the DOM each run, and return a function that shows/hides the appropriate DOM elements.  This function will then be called by the selector event handler, which will re-render the DOM based on categories and view selected.

This will require refactoring of the toHtml method, as well as creating an init method to precompile lists of categories for the function generator.
