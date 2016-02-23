
Deploy Node to Heroku

You can deploy though git, just as we did with our Ruby apps.

before starting you need to:
  1. installed git
  2. sign up to Heroku
  3. install Heroku toolbelt.
  4. check that you have added node_modules to your .gitignore file 

Go to the Heroku home page and install node.js

Create the package.json file:
  1. From inside the directory in the terminal type:
      $ npm init
  2. It will ask you to fill in the below information for your project:
      $ name: (name of the project)
      $ version: (it normally shows this after version, eg. 0.0.1)
      $ description: (describe what the project does)
      $ entry point: (file path to package, eg. ./app.js)
      $ test command: (eg. 'mocha' if you are using mocha for your tests)
      $ git repository: (link to the project on github)
      $ key words: (allow users to search for the project by keyword)
      $ author: (name)
      $ license: (somthing like 'MIT' - the license used for Ruby. It lets the user know what they can use the project for)
  3. The package.jason file will be created and automatically list any dependancies (modules/packages) used in your project
    (note: You can automatically add to the list in your package.jason file when you install additional packages from npm by
     adding the flag --save, eg. $npm install colors --save)

Open the package.jason file that should have been created in your project file. Add the below lines:
    "engines": {
      "node": "4.2.4"
    }

Create a new file in the main directory called "Procfile" (like Gemfiles this starts with a capital letter and has no extension)
you need to list at least one process in here, eg: $ web:node app.js

Git add, commit and push your changes, check you are logged in to Heroku (note: you can look at extra Heroku commands once logged in by typing: heroku help)

To add your app you first need to create it, type:
  $heroku apps: create <appname(needs to be unique)>

Test that the app is running locally by typing:
  $heroku local

It will probably give you a different port number to the one you specified in the app, so we need to update it to check the ENV variable:
in the app change the var for the port to the below (replace 1337 with whatever local port you are running on)
    var port = process.env.PORT || 1337;
this will tell the app to run on the env port if specified or on the local port if not.

Check if it is not working by running $heroku local again and $heroku open

Once you have confirmed it is working you can push to the Heroku repository that has been created.
  $git push heroku master

You may see an application error if you declared a hostname in your app. The host name is optional so just take it out and add "oursite:" to the http://.

Git add, commit and push to heroku again and it should work.
