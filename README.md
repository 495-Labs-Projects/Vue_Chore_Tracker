## 67-272: ChoreTracker UX Improvements with Vue.JS ##

This is a lab project for 67-272: Application Design and Development.  The primary objectives of this lab are (1) to give students experience discovering pain points in existing applications and (2) to give students hands-on experience incorporating view components into an existing project using Vue.JS.

As seen in lecture, we can leverage the Vue.JS framework to allow for cool, dynamic effects on the front-end of our application. Part of the reason we may wish to use something like Vue.JS would be to improve the user experience (or UX for short) of an application. Nowadays, the demand for instantaneous results is higher than ever. We want to complete everything in a short of a time as we possibly can. Vue.JS supports this outlook onto completing tasks.

Before going any further, it is worth keeping the [Vue.JS documentation](https://vuejs.org/v2/guide/) open, as you may wish to refer to it to better understand the Vue.JS framework.

## Part 1: Setup and Installation

For this lab, we are going to implement several features using Vue.JS into the Chore Tracker lab from before. If you would like to use your previous Chore Tracker solution, go ahead, however the code portions from the lab will be based off of the starter code here, so keep that in mind. If you don't have a strong preference for using your previous code, it is recommended to simply clone the starter code repository.

1. Either locate your previous lab directory or clone the starter code repository. **If you clone from the starter code repository be sure to remove any remote connections on the repository**!

Now that we have our rails project, we have to do some small setup to add the Vue.JS framework to our project.

The gem we will be using is the [vuejs-rails](https://github.com/adambutler/vuejs-rails) gem.

2. In your gemfile, add the line:
	```ruby
	gem 'vuejs-rails'
	```
and then `bundle install`. Make sure the gems installed without any issues!

3. In your `app/assets/javascrips/application.js` file, add the following line:
	```js
	//= require vue
	```

4. Run `rails server` and check to see Chore Tracker is running properly in your browser. Also check the javascript console in the browser and make sure there are no errors. Ask a TA if you are not sure how to open the javascript console in your browser.

5. If you are using Google Chrome and have not done so, consider installing the [Vue.JS DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en), as it allows for properly checking components and their state, in real-time.

6. Create a new file in the project: `app/assets/javascripts/chores.js`.

Add and commit your work to Git if you have not done so already.

## Part 2: Pain Points
