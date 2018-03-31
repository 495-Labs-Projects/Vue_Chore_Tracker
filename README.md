## 67-272: ChoreTracker UX Improvements with Vue.JS ##

**Feedback Link:** https://docs.google.com/a/andrew.cmu.edu/spreadsheets/d/1_vbyn_yYRYsXzdn0TDVsI1rEph86UBo2bDtw3G2zZhI/edit?usp=sharing

This is a lab project for 67-272: Application Design and Development.  The primary objectives of this lab are (1) to give students experience discovering pain points in existing applications and (2) to give students hands-on experience incorporating view components into an existing project using Vue.JS.

As seen in lecture, we can leverage the Vue.JS framework to allow for cool, dynamic effects on the front-end of our application. Part of the reason we may wish to use something like Vue.JS would be to improve the user experience (or UX for short) of an application. Nowadays, the demand for instantaneous results is higher than ever. We want to complete everything in a short of a time as we possibly can. Vue.JS supports this outlook onto completing tasks.

Before going any further, it is worth keeping the [Vue.JS documentation](https://vuejs.org/v2/guide/) open, as you may wish to refer to it to better understand the Vue.JS framework.

## Part 1: Setup and Installation

For this lab, we are going to implement several features using Vue.JS into the Chore Tracker lab from before. If you would like to use your previous Chore Tracker solution, go ahead, however the code portions from the lab will be based off of the starter code here, so keep that in mind. If you don't have a strong preference for using your previous code, it is recommended to simply clone the starter code repository.

1. Either locate your previous lab directory or clone the [starter code repository](https://github.com/jestapinski/VueChoreTrackerStarter). **If you clone from the starter code repository be sure to remove any remote connections on the repository**!

	Now that we have our rails project, we have to do some small setup to add the Vue.JS framework to our project.

	The gem we will be using is the [vuejs-rails](https://github.com/adambutler/vuejs-rails) gem.

2. In your gemfile, add the line:
	```ruby
	gem 'vuejs-rails'
	```
	and then `bundle install`. Make sure the gems installed without any issues!

3. In your `app/assets/javascripts/application.js` file, add the following line:
	```js
	//= require vue
	```

4. Run `rails db:migrate` and then `rails server` and check to see Chore Tracker is running properly in your browser. Also check the javascript console in the browser and make sure there are no errors. Ask a TA if you are not sure how to open the javascript console in your browser.

5. If you are using Google Chrome and have not done so, consider installing the [Vue.JS DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en), as it allows for properly checking components and their state, in real-time.

6. Create a new file in the project: `app/assets/javascripts/chores.js`.

**Add and commit your work to Git if you have not done so already.**

## Part 2: Pain Points (SKIP THIS TONIGHT)

Now we will spend some time re-familiarizing ourselves with the initial pain points of the Chore Tracker application. We are taking an *iterative refinement* approach to developing Chore Tracker: First we were concerned with simply building a working application, and now we are ready to improve it from a UX standpoint.

*This is actually a really important skill to use in industry since stakeholders are looking for results, and then improvement. The sooner you can have something working (some Minimal Viable Product), the better!*

### SKIP THIS SECTION AND GO TO PART 3 TONIGHT

1. Go through and add a new chore to the chores list (you can add new tasks and children if you wish, but just go ahead and add a chore).

2. Edit the status of the chore to be incomplete if it isn't already. Submit and verify the edit was made. If the chore was already incomplete, edit it to be complete and verify the edit was made.

3. Note how Chores also cannot be deleted easily from the Chore Tracker. We should consider adding this functionality.

Okay so hopefully by playing around with some Chore CRUD actions on Chore Tracker you see that those actions work, but the process of managing chores is slow and tedious. In what modern application would making a new chore bring you to another page? This is pretty unusable by modern standards, and that is where Vue.JS comes to the rescue.

# Stop
Make sure a TA has verified you have Vue.JS properly installed into Chore Tracker and you have had a chance to explore the pain points of the existing Chore Tracker application.
* * *

## Part 3: Adding a New Chore

Now we will start using Vue.JS to manipulate the means by which we perform actions on Chore Tracker. For the sake of this lab, we will only be modifying the Chores page, but you can likely imagine extending the work we do here to the Child and Task pages as well for a similar, unified experience. If you want more practice with Vue.JS (recommeded), then practice modifying the other pages to have similar form actions with Vue.

Also, it is worth acknowledging the forms could use a facelift (from a CSS standpoint), but again we are only concerned with Vue.JS interactions at this point.

### Adding the base Vue instance and verify

The first thing we need to do is add the base Vue instance to our application. This is going to handle the overall state of the application, but for now we will condense the scope of the instance to be the body of the Chores table found in `chores#index`. 

1. Wrap a div around the table in `chores#index` with `id="chores_list"` (generally, giving everything in an app an id is good practice anyway, but don't worry about this now).

2. Now, we will go ahead and add in our Vue.JS instance to get the fun started. Open `app/assets/javascripts/chores.js`. We don't need to add anything else to our application to link this javascript file, as the `//= require_tree .` in `application.js` does this for us. First, add some code to load Vue after all other content on the webpage:

	```js
	$(document).on('ready', function() {
		// Code we will add next!
	    }
    );
	```
**Note that all of the javascript code we will write in this file must go in the body of this** `$(document).on('ready', ...` **function**!!
Define a new Vue instance defined as `chores` by such:
	```js
	//Code to instantiate a blank, new instance of Vue.JS
	var chores = new Vue({
		// Keys, values go here
	});
	```

	Now for the keys within the object we pass as an argument when defining a Vue instance. 

3. First, `el` refers to the portion of the app we want the instance to have control over. In this case, we want it to be our div with the id `chores_list`. Add this like so:
	```js
	// within the code to define the instance of Vue assigned to the variable chores
	el: '#chores_list',
	```

4. Now, we will want to define our `data` field to keep track of state variables. The only thing we will have for now is an array of chores, which we will initialize to be empty:
	```js
	// within the code to define the instance of Vue assigned to the variable chores
	data: {
	        chores: []
	      }
	```

	This is good for the Vue instance, for now. We will add fields and methods in a bit.

	Now that we have a base Vue instance to work with, we can begin to modify our Chores view to use Vue.

	Open `app/views/chores/index.html.erb` and take a look at the contents. Note that it mainly contains a table being populated by iterating over a Rails variable `@chores`, which is the list of chores we populate within the Chores controller. Now that we are using Vue.JS, we are going to have to modify this structure of representing iteration to allow us to use dynamically updated state variables within our Vue instance.

	Basically, because Vue allows for us to automatically update views based on changing state variables, we can change our HTML to allow for dynamic front-end updates with no cheeky AJAX hide and render maneuvers. We can create a general chore-row component for each row in the table for dynamic updating.

5. To do this, lets define a new component within our `app/assets/javascripts/chores.js` file **above the definition of the Vue instance from before** as such, with the template being a div with the id `chore-row` which we will write soon:

	```js
	  // A component describing a row in the chores table
	  Vue.component('chore-row', {
	    // Defining where to look for the HTML template in the index view
	    template: '#chore-row',

	    // Passed elements to the component from the Vue instance
	    props: {
	    	chore: Object
	    },
	    // Behaviors associated with this component
	    methods: {
	      remove_record: function(chore){
	      },
	      toggle_complete: function (chore){
	      },
	    }
	  })
	```

	Note we have a `chore` prop, which is the Chore object which will be passed to the component. Now, we can start to write the general HTML template for the `chore-row` component. 

6. At the bottom of the `Chore#index` view file, add the following template code (At the very bottom, not wrapped in any tags!):

	```erb
	<!-- Defining Vue templates to work with components -->
	<script type="text/x-template" id="chore-row">
	    <tr>
	      <td>{{ chore.child_id }}</td>
	      <td>{{ chore.task_id }}</td>
	      <td>{{ chore.due_on }}</td>
	      <td>{{ chore.completed }}</td>
	      <td v-on:click="toggle_complete(chore)">Check</td>
	      <td v-on:click="switch_edit_modal(chore)">Edit</td>
	      <td v-on:click="remove_record(chore)">Delete</td>
	    </tr>
	</script>
	```

	Take a minute to look at the template code. The first four columns in the table are various fields of the Chore object. The last three are actions which will be instantiated through a click, however the methods `toggle_complete`, `switch_edit_modal`, and `remove_record` have not been filled in yet in the `chore-row` component! We will come back to these later.

	Now that we have our template, we need to actually create HTML elements based on it. 

7. Remove the lines looping over `@chores` populating the table, and add the following:

	```html
	<!-- 
	  Template for creating a table row display
	  v-for iterates over values in the Vue instance
	  v-bind binds props to be sent to components 
	-->
	  <tr is='chore-row' 
	      v-for='chore in chores' 
	      v-bind:chore='chore'>  
	  </tr>
	```
	This will loop over the `chores` variable defined in our Vue instance and create `chore-row` elements for each individual chore based on the template we added right before.

	There is only one issue, the `chores` variable in the Vue instance is always empty! We need to populate it. Here, we will use AJAX to perform a `GET` request to get all the chores. 

8. Add the following method to the top of your `chores.js` file (under `document.on('ready'...))` since we need the page to load prior to running our javascript code:

	```js
	function run_ajax(method, data, link, callback=function(res){chores.get_chores()}){
		$.ajax({
		  method: method,
		  data: data,
		  url: link,
		  success: function(res) {
		    callback(res);
		  },
		  error: function(res) {
		    that.errors = res.responseJSON.errors
		  }
		})
	}
	```
	This code will perform a general AJAX request, so long as we pass the HTML verb, data, and route needed. 

9. Now we need to call it, add the `methods` property to the Vue instance (`methods: {}`) and add the following code:

	```js
	get_chores: function(){
		run_ajax('GET', {}, '/chores.json', function(res){chores.chores = res});
	}
	```

10. Then, add the `mounted` property to the Vue instance (`mounted: function(){}`) and within add the following line:
	```js
	this.get_chores();
	``` 

	Now we are getting the chores from our API and updating the instance variable accordingly. Check the page to see that the table is being populated as expected. Try using the Vue DevTools to see the components as well! You should be able to see the various `ChoreRow` components with their Chore objects.

	**If the page is not rendering the components, try restarting your server!**

	Now, we need to modify the form for adding a new chore so it shows up dynamically at the bottom of the page without any kind of redirect. 

11. The existing button links to the `chores#new` page, so we should get rid of that button from the `chores#index` page. Replace it with this new button **within the `chores_list` div and the `chores_list` tag**:
	```html
	<!-- v-on:click binds a function to a clicking action -->
	<button v-on:click="switch_modal()">Add Chore</button>
	```

	This button will simply toggle whether or not we show the new Chore form underneath the table. 

12. Let's add this method to the Vue instance:

	```js
	switch_modal: function(event){
		this.modal_open = !(this.modal_open);
	},
	```

	`this.modal_open` refers to a data variable for the instance which will track whether or not we show the new form. 

13. Add in the `modal_open` variable to the `data` property of the Vue instance, and initialize it to be `false`.

14. Now, let's set up some logic in the `chores#index` page for showing the new form conditionally. Under the table (before closing the `chores_list` div), add the following code:

	```html
	<div v-if="modal_open">
	  <h3>New Chore</h3>
	  <new-chore-form></new-chore-form>
	</div>
	```

	This will conditionally render a component we are about to define called `new-chore-form`. 

15. Let's write the template for this form at the bottom of `chores#index` (At the very bottom, not wrapped in any tags!):

	```erb
	<!-- Component to add a new form -->
	<script type="text/x-template" id="new-chore-form">
	  <div>
		<% @chore = Chore.new() %>
		<%= render 'vue_form' %>
	  </div>
	</script>
	```

	and then add the complete new component in `chores.js`:

	```js
	// A component for adding a new chore
	  var new_form = Vue.component('new-chore-form', {
	    template: '#new-chore-form',
	    data: function () {
	      return {
	          child_id: 0,
	          task_id: 0,
	          due_on: '', 
	          completed: false
	      }
	    },
	    methods: {
	      submitForm: function (x) {
	        new_post = {
	          child_id: this.child_id,
	          task_id: this.task_id,
	          due_on: this.due_on,
	          completed: this.completed
	        }
	        run_ajax('POST', {chore: new_post}, '/chores.js');
	      }
	    },
	  })
	```

	Note how we have data variables for the main fields of Chore, and combine them all into one object when we run our POST request to add a new Chore.

16. Now, let's create a new file to manage our Vue.JS new form: `app/views/chores/_vue_form.html.erb`. Within this file, add the following partial code to create our form:

	```erb
	<!-- Form template using Vue for adding and editing chores -->
	<%= form_for(@chore) do |f| %>
	  <% if @chore.errors.any? %>
	    <div id="error_explanation">
	      <h2><%= pluralize(@chore.errors.count, "error") %> prohibited this chore from being saved:</h2>

	      <ul>
	      <% @chore.errors.full_messages.each do |msg| %>
	        <li><%= msg %></li>
	      <% end %>
	      </ul>
	    </div>
	  <% end %>

	  <div class="field">
	    <%= f.label :child_id %><br />
	    <%= f.collection_select :child_id, Child.alphabetical.active.all, :id, :name, {:prompt => "Select child..."}, "v-model.number" => "child_id" %>
	  </div>
	  <div class="field">
	    <%= f.label :task_id %><br />
	    <%= f.collection_select :task_id, Task.alphabetical.active.all, :id, :name, {:prompt => "Select task..."}, "v-model.number" => "task_id" %>
	  </div>

	  <p>Date: <input type="date" id=""></p>

	  <div class="field">
	    <%= f.label :completed %><br />
	    <%= f.check_box :completed, "v-model.completed" => "completed" %>
	  </div>
	<% end %>
	    <button v-on:click="submitForm()">Submit</button>

	```
	(Note that for `child_id` and `task_id`, the `.number` in `v-model.number` specifies the datatype must be a number, a good security practice!). 

	Also, here we are submitting a POST request using javascript (in our AJAX call), so we must update the Chores controller accordingly. In the Chores controller, add the line:

	```erb
	format.js
	```

	to the `create` action after each `format.html` line. Add the corresponding `create.js.erb file` in the Chores view directory since our controller will look for such `.js.erb` file upon formatting as javascript.

	Now, we should have a working form for adding new Chores!

17. Wait, something isn't right. We are able to view the new form, but no matter what we select for the date, the date isn't being saved properly. Use the Vue.JS DevTools extension to see if the NewChoreForm `due_on` date value is being updated properly.

Oh, it isn't! Figure out where in the form we are missing something and add it in (Hint: Check out some of the HTML properties of other elements of the form, what is the date input missing?).

Now the form should add a new row to the list of chores upon clicking `Submit`. Perhaps one small UX improvement would be to hide the form upon clicking `Submit`. Knowing we call the `submitForm` method upon clicking `Submit`, modify this to hide the New Chore Form upon submitting.

# Stop
Make sure a TA has verified that you can add a new chore into Chore Tracker using a Vue.JS form (no reloads should be happening).
* * *


## Part 4: Completing and Deleting a Chore

Now that we have our form setup, we can add some quick other interactions to speed up the user experience:

### Toggling Completion

We already added the `v-on:click="toggle_complete(chore)"` property to the template for a `chore-row`, so now we just need to add the method for actually toggling the method within the `chore-row` component (which will work by clicking 'check'):

```js
  toggle_complete: function (chore){
    chore['completed'] = !(chore['completed']);
    run_ajax('PATCH', {chore: chore}, '/chores/'.concat(chore['id'], '.js'));
  },
```

Note here how we simply switch the `completed` state and POST it. Vue takes care of re-rendering, so this is all we have to do for completion.

**Also add `format.js` to the update action in the controller and add the `update.js.erb` file to the view directory for Chores!**

### Deletion

Something similar to toggling completion will allow us to delete a chore quickly. Again, note we added `v-on:click='remove_record(chore)'` and so clicking `Delete` will do the trick once we add this method to the `chore-row` component:

```js
  remove_record: function(chore){
    run_ajax('DELETE', {chore: chore}, '/chores/'.concat(chore['id'], '.js'));       
  },
```

**Also add `format.js` to the destroy action in the controller and add the `destroy.js.erb` file to the view directory for Chores!**

# Stop
Make sure a TA has verified that you can complete and delete chores in Chore Tracker using Vue.JS (no reloads should be happening).
* * *

## Part 5 (Optional): Edit form, Apply to Child and Task Pages

Essentially replicate the above steps to the other pages on the site to create a unified user experience.
