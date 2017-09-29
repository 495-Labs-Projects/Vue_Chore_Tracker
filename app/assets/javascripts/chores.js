var init;

var initialize = function(){
  if (init){
    init();
  }
}

// app/assets/javascripts/chores.js
$(document).on('ready', function() {

  init = function(){
  // General template function for running AJAX calls through Vue.JS
  run_ajax = function(method, data, link, callback=function(res){chores.get_chores()}){
    $.ajax({
      method: method,
      data: data,
      url: link,
      success: function(res) {
        chores.modal_open = false;
        callback(res);
      },
      error: function(res) {
        that.errors = res.responseJSON.errors
      }
    })
  }

  // A component describing a row in the chores table
  Vue.component('chore-row', {
    // Defining where to look for the HTML template
    template: '#chore-row',

    // Passed elements to the component from the Vue instance
    props: {
      chore: Object,
      name: String,
      task: String
    },
    // Behaviors associated with this component
    methods: {
      switch_modal: function(){
        chores.switch_modal();
      },
      switch_edit_modal: function(id){
        chores.switch_edit_modal(id);
      },
      remove_record: function(id){
        chores.remove_chore(id);
      },
      toggle_complete: function (chore){
        chore['completed'] = !(chore['completed']);
        run_ajax('PATCH', {chore: chore}, '/chores/'.concat(chore['id'], '.js'));
      },
    }
  })

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

  // A component for editing a chore
  var edit = Vue.component('edit-chore-form', {
    template: '#edit-chore-form',
    props: {
      edit_id: Number,
      child_id: Number,
      task_id: Number,
      completed: Boolean,
      due_on: String
    },
    methods: {
      submitForm: function (id) {
        var new_post = {
          child_id: this.child_id,
          task_id: this.task_id,
          due_on: this.due_on, 
          completed: this.completed          
        }
        chores.edit_chore(new_post);
      }
    },
  })

// The Vue instance for the chores_list section
  var chores = new Vue({
    // The el connects to a <span> in chores#index
    el: '#chores_list',
    data() {
      return {
        chores: [],
        tasks: [],
        children: [],
        modal_open: false,
        edit_modal_open: false,
        edit_id: 0,
        child_id: 0,
        task_id: 0,
        completed: 0,
        due_on: ''
      }
    },
    // This function runs after the elements on the page are set
    // Here, we update the list of chores, tasks, and children
    mounted: function (){
      this.get_chores();
      this.get_tasks(); 
      this.get_children();
    },
    methods: {
      get_chores: function(){
        run_ajax('GET', {}, '/chores.json', function(res){chores.chores = res});
      },
      get_tasks: function(){
        run_ajax('GET', {}, '/tasks.json', function(res){chores.tasks = res;});
      },
      get_children: function(){
        run_ajax('GET', {}, '/children.json', function(res){chores.children = res;});      
      },

      /* 
      Since we are not iterating over an ActiveRecord collection, we must perform
      A join operation ourselves using javascript for child and task to display
      */
      find_child_name: function(chore){
        var desired_id = chore.child_id;
        for (var child = 0; child < this.children.length; child += 1){
          if (this.children[child]['id'] == desired_id){
            return this.children[child]['first_name'].concat(' ', this.children[child]['last_name']);
          }
        }
        return "No name"
      },
      find_task_name: function(chore){
        var desired_id = chore.task_id;
        for (var task = 0; task < this.tasks.length; task += 1){
          if (this.tasks[task]['id'] == desired_id){
            return this.tasks[task]['name'];
          }
        }
        return "No task"
      },
      // Behaviors to switch whether or not new or edit forms are displayed
      switch_modal: function(event){
        this.modal_open = !(this.modal_open);
      },
      switch_edit_modal: function(chore){
        this.edit_id = chore['id'];
        this.child_id = chore['child_id'];
        this.task_id = chore['task_id'];
        this.completed = chore['completed'];
        this.due_on = chore['due_on'];
        this.edit_modal_open = !(this.edit_modal_open)
      },
      edit_chore: function (post) {
        run_ajax('PATCH', {chore: post}, '/chores/'.concat(this.edit_id, '.js'));
        this.edit_modal_open = false;
      },
      remove_chore: function(id){
        run_ajax('DELETE', {chore: this.new_post}, '/chores/'.concat(id, '.js'));       
      }
    },
  });
  }
  init();
});

