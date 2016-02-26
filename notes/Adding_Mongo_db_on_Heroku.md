#Adding Mongo DB to your Node App on Heroku

* Start by checking that all dependent modules are installed and up to date:

  ```$npm install```

* Start the server by running:
  
  ```$ nodemon <whatever your app is called, eg. app.js>```

* Go to **Heroku** in your browser and go to ** "Apps"**

* Search for **"MongoLab"** and install it.

* Go to **Settings** from the add-ons page and scroll to the *config variables section*. 

* Paste the mongolab env label into your add-ons

  * eg. where you might have had: ```mongoose.connect('mongodb://localhost/foobar');```
  * replace it with: ```mongoose.connect( (process.env.MONGOLAB_URI || config.mongoURI[app.settings.env]) ), function(err, res);```
  * This will use the env property if one is defined or the local one when you are running it locally.

* We also need to update the port info on the add-ons file (*note if you followed the instructions on deploying Node to Heroku this should already be done*)

  * ```var port = process.env.PORT || 3000``` 
  *  3000 is whatever you're running for the local port
  
* Git add, commit and push to heroku (*note: you may need to use the force!*) 
  * ```$ git push -f heroku master```
