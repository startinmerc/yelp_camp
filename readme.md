#Add Mongoose
*Install & configure Mongoose
*Setup campground model
*Use campground model inside of our routes


#Show Page
*Review RESTful routes we've seen so far

    *name   url             verb    desc.
    *INDEX  /campgrounds    GET     Display list of campgrounds
    *NEW    /cg/new         GET     Displays form to make new CG
    *CREATE /campgrounds    POST    Add new CG to DB
    *SHOW   /cg/:id         GET     Shows info about 1 CG

    *Consistent routing across most apps
    
*Add description to our campground model
*Show db.collectiondrop()
*Add a show route/template

#Refactor Mongoose Code
*Create a models directory
*Use module.exports
*Require geverything correctly!

##Add Comment Model!
*Make errors go away!
*Display comments on campground show page

#Comment New/Create
*Discuss nested routes
    NEW     campgrounds/:id/comments/new    GET
    CREATE  campgrounds/:id/comments        POST
*Add the comment new and create routes
*Add the new comment form

#Style Show Page
*Add sidebar to show page
*Display comments nicely

#Finish styling show page
*Add public directory
*Add custom stylesheet

#Add user model
*install all packages needed fpr auth
*define user model

#Register
*configure passport
*add register routes
*add register template

#Login
*add login routes
*add login template

#logout/navbar
*add logout route
*prevent user adding comments if not signed in
*add links to navbar
*show/hide auth links correctly

#Refactoring!

#Users & comments
*Assocate isers & comments
*save author's name to a comment automatically

/users + campgrounds
*prevent unauth isers from creating a campground
*save username & id to newlyCreated campground

#CRUDABILITY!

#editing campgrounds
*add method-override
*add edit route for campground
*add link to edit page
*add update route

#deleting campgrounds
*add destroy route
*add delete button

#Authorization
*user can only edit their own campgrounds
*user can only delete their own campgrounds
*hide/show these buttons as appropriate

#editing comments
*add edit route for comments
*add edit button
*add update route

#deleting comments
*add destroy route
*add delete button

#authorisation 2 - comments
*user can only edit their own comments
*user can only delete their own comments
*hide/show these buttons as appropriate

#REfactoring middleware
*factor as index.js, so requesting "/middleware" auto goes to index.js

#Adding in flash!
*demo working version
*install & configure connect-flash
*add bootstrap alerts to header

#Added landing page

#Added dynamic price