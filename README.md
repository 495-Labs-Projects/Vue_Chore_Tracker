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

Now we will spend some time re-familiarizing ourselves with the initial pain points of the Chore Tracker application. We are taking an *iterative refinement* approach to developing Chore Tracker: First we were concerned with simply building a working application, and now we are ready to improve it from a UX standpoint.

*This is actually a really important skill to use in industry since stakeholders are looking for results, and then improvement. The sooner you can have something working (some Minimal Viable Product), the better!*

1. Go through and add a new chore to the chores list (you can add new tasks and children if you wish, but just go ahead and add a chore).

2. Delete the chore you just made. Then create another one named "Complete 272 Lab".

3. Edit the status of the chore to be incomplete if it isn't already. Submit and verify the edit was made.

Okay so hopefully by playing around with Chore CRUD actions on Chore Tracker you see that those actions work, but the process of managing chores is slow and tedious. In what modern application would making a new chore bring you to another page? This is pretty unusable by modern standards, and that is where Vue.JS comes to the rescue.

# Stop
Make sure a TA has verified you have Vue.JS properly installed into Chore Tracker and you have had a chance to explore the pain points of the existing Chore Tracker application.
* * *

## Part 3: Adding a New Chore

Now we will start using Vue.JS to manipulate the means by which we perform actions on Chore Tracker. For the sake of this lab, we will only be modifying the Chores page, but you can likely imagine extending the work we do here to the Child and Task pages as well for a similar, unified experience. If you want more practice with Vue.JS (recommeded), then practice modifying the other pages to have similar form actions with Vue.

Also, it is worth acknowledging the forms could use a facelift (from a CSS standpoint), but again we are only concerned with Vue.JS interactions at this point.

*Add the base Vue instance and verify*

*Add new form partial*

*Add new form component and template, and verify*

*Modify new form partial to use v-model*

*AJAX post*

# Stop
Make sure a TA has verified that you can add a new chore into Chore Tracker using a Vue.JS form (no reloads should be happening).
* * *

## Part 4: Editing a Chore

*Add edit form template and verify*

*Add edit sync to component and verify*

*AJAX post*

## Part 5: Completing a Chore

*Add check button to chores#index*

*Add toggle method to instance*

# Stop
Make sure a TA has verified that you can add a edit and complete chores in Chore Tracker using Vue.JS (no reloads should be happening).
* * *

## Part 6 (Optional): Apply to Child and Task Pages

Essentially replicate the above steps to the other pages on the site to create a unified user experience.
