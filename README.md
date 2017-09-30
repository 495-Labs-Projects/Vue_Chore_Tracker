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

The first thing we need to do is add the base Vue instance to our application. This is going to handle the overall state of the application, but for now we will condense the scope of the instance to be the body of the Chores table found in `chores#index`. Wrap a div around the table with `id="chores_list"` (generally, giving everything in an app an id is good practice anyway, but don't worry about this now).

Now, we will go ahead and add in our Vue.JS instance to get the fun started. Open `app/assets/javascripts/chores.js` and define a new Vue instance defined as `chores` by such:

```js
var chores = //Code to instantiate a blank, new instance of Vue.JS
```

Now for the keys within the object we pass as an argument when defining a Vue instance. First, `el` refers to the portion of the app we want the instance to have control over. In this case, we want it to be our div with the id `chores_list`.
```js
// within the code to define the instance of Vue assigned to the variable chores
el: '#chores_list',
```

Now, we will want to define our `data` field to keep track of state variables. The only thing we will have for now is an array of chores, which we will initialize to be empty:
```js
// within the code to define the instance of Vue assigned to the variable chores
data(){
	return {
		chores: []
	}
}
```
Notice how here we define data as a function. This is new in Vue 2.X and is the preferred way of representing `data` variables for instance state.

This is good for the Vue instance, for now. We will add fields and methods in a bit.

*Add new form partial*

Now that we have a base Vue instance to work with, we can begin to modify our Chores view to use Vue.

Open `app/views/chores/index.html.erb` and take a look at the contents. Note that it mainly contains a table being populated by iterating over a Rails variable `@chores`, which is the list of chores we populate within the Chores controller. Now that we are using Vue.JS, we are going to have to modify this structure of representing iteration to allow us to use dynamically updated state variables within our Vue instance.

Basically, because Vue allows for us to automatically update views based on changing state variables, we can change our HTML to allow for dynamic front-end updates with no cheeky AJAX hide and render maneuvers. We can create a general chore-row component for each row in the table for dynamic updating.

To do this, lets define a new component within our `app/assets/javascripts/chores.js` file as such, with the template being a div with the id `chore-row` which we will write soon:

```js
  // A component describing a row in the chores table
  Vue.component('chore-row', {
    // Defining where to look for the HTML template in the index view
    template: '#chore-row',

    // Passed elements to the component from the Vue instance
    props: {
    	Chore: Object
    },
    // Behaviors associated with this component
    methods: {
      switch_modal: function(){
      },
      switch_edit_modal: function(id){
      },
      remove_record: function(chore){
      },
      toggle_complete: function (chore){
      },
    }
  })
```

Note we have a `Chore` prop, which is the Chore object which will be passed to the component. No, we can start to write the general HTML template for the `chore-row` component. At the bottom of the `Chore#index` view file, add the following template code:

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

Now that we have our template, we need to actually create HTML elements based on it. Remove the lines looping over `@chores` populating the table, and add the following:

```erb
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
This will loop over the `chores` variable defined in our Vue instance and create `chore-row` elements for each one based on the template we added right before.

There is only one issue, the `chores` variable in the Vue instance is always empty! We need to populate it. Here, we will use AJAX to perform a `GET` request to get all the chores. Add the following method to your `chores.js` file:

```js
run_ajax = function(method, data, link, callback=function(res){chores.get_chores()}){
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
This code will perform a general AJAX request, so long as we pass the HTML verb, data, and route needed. Now we need to call it, add the `method` property to the Vue instance (`methods: {}`) and add the following code:

```js
get_chores: function(){
	run_ajax('GET', {}, '/chores.json', function(res){chores.chores = res});
},
```

Then, add the `mounted` property to the Vue instance (`mounted: function(){}`) and within add the following line:
```js
this.get_chores();
``` 

Now we are getting the chores from our API and updating the instance variable accordingly. Check the page to see that the table is being populated as expected. Try using the Vue DevTools to see the components as well! You should be able to see the various `ChoreRow` components with their Chore objects.

*Add new form component and template, and verify*

Now, we need to modify the form for adding a new chore so it shows up dynamically at the bottom of the page without any kind of redirect. The existing button links to the `chores#new` page, so we should get rid of that button from the `chores#index` page. Replace it with this new button:
```erb
<!-- v-on:click binds a function to a clicking action -->
<button v-on:click="switch_modal()">Add Chore</button>
```

This button will simply toggle whether or not we show the new Chore form underneath the table. Let's add this method to the Vue instance:

```js
switch_modal: function(event){
	this.modal_open = !(this.modal_open);
},
```

`this.modal_open` refers to a data variable for the instance which will track whether or not we show the new form. Add in the `modal_open` variable to the `data` property of the Vue instance, and initialize it to be `false`.

Now, let's set up some logic in the `chores#index` page for showing the new form conditionally. Under the table (before closing the `chores_list` div), add the following code:

```erb
<div v-if="modal_open">
  <h3>New Chore</h3>
  <new-chore-form></new-chore-form>
</div>
```

This will conditionally render a component we are about to define called `new-chore-form`. Let's write the template for this form at the bottom of `chores#index`:

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

*Modify new form partial to use v-model*

Now, let's create a new file to manage our Vue.JS new form: `app/views/chores/_vue_form.js`. Within this file, add the following partial code to create our form:

```erb
<!-- Form template using Vue for adding and editing chores -->
<%= form_for(@chore, :remote => true) do |f| %>
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

  <p>Date: <input type="date" id="" v-model="due_on"></p>

  <div class="field">
    <%= f.label :completed %><br />
    <%= f.check_box :completed, "v-model.completed" => "completed" %>
  </div>
<% end %>
    <button v-on:click="submitForm()">Send</button>

```
(Note that for `child_id` and `task_id`, the `.number` in `v-model.number` specifies the datatype must be a number, a good security practice!). Now, we should have a working form for adding new Chores!

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

### Deletion

Something similar to toggling completion will allow us to delete a chore quickly. Again, note we added `v-on:click='remove_record(chore)'` and so clicking `Delete` will do the trick once we add this method to the `chore-row` component:

```js
  remove_record: function(chore){
    run_ajax('DELETE', {chore: chore}, '/chores/'.concat(chore['id'], '.js'));       
  },
```

# Stop
Make sure a TA has verified that you can add a edit and complete chores in Chore Tracker using Vue.JS (no reloads should be happening).
* * *

## Part 5 (Optional): Edit form, Apply to Child and Task Pages

Essentially replicate the above steps to the other pages on the site to create a unified user experience.
