# 2Do Task Manager

Todo is a Simple and Elegant Task Manager developed only using html, css and javascript.

# Features

 - Add a new Task to Todo
 - Move the tasks to In Progress and Done as you start and complete the task
 - Remove the unwanted tasks from any group.
 - Redo the tasks which are marked done.


# Installation

This is a standalone application. Run `index.html` in any modern browsers to run this application.

**Tech Stack**

| HTML | 20% |
| ---- | ---- |
| CSS  | 40% |
| JS   | 40% |


### How does it work

1. To Add New Task  Type the task title in the Task Name field and select the priority and click Add it will add the task to “To do”  list.
2. You can click on start on any tasks in To do list to move them to “in progress” list.
3.When you are done, click complete and it will move the task to Done Tasks.
4.There is always a time where you may have change of plans or the task may no longer needed to be done, so you can delete the task by clicking “x” button to remove it. 
5.You can also move those tasks which are marked done to in progress by just clicking “Back to work”.


Voila! It’s that simple!

### How its made:

The “2Do” Task manager is developed like a small javascript library, like we can define the Task Lists and set the Priority levels in the library. 

In the index file we only have to specify where we need the input form and the output view  should be displayed while initializing the library. The library then will create a form and view container from the view controllers. 

And when we add a new task, the library orders the tasks based on the priority and displays them in the view.



License
----

**Free Software, Hell Yeah!**

Make the changes as you like! Have a good day! :)