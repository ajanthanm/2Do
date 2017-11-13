(function (window){

	/* ====  Initialize   ==== */
	var Task = {};
	var View = {};
	var Utils = {};
	var UnitTest = {};

	var fn = fn || function(){};

	Task.list = {
		todo:{ 
			name: "To do", 
			tasks:[]
		}, 
		inprogress:{
			name:"In Progress", 
			tasks:[]
		},
		done:{
			name:"Done", 
			tasks:[]
		}
	};


	Task.task_input_container = "";
	Task.task_view_container = "";
	var Priorities =[
		{priority:0, name: "Low"}, 
		{priority:1, name:"Medium"}, 
		{priority:2, name:"High"}, 
		{priority:3, name:"Critical"}
	];



	Task.init = function(data){
		
		Task.task_input_container = document.querySelector(data.task_input);
		Task.task_input_container.innerHTML = "";
		Task.task_input_container.appendChild(View.createTaskForm());

		Task.task_view_container = document.querySelector(data.task_view);
		Task.task_view_container.innerHTML= "";
		View.createTaskView(Task.task_view_container);

		UnitTest.sampleTasks();
		Task.displayTasks();

	}



	/* ====  Controllers   ==== */


	Task.addNewTask = function(){
		console.log("new task submitted");
		var task = {};
		task.title = document.querySelector("#taskname").value;
		task.title = task.title.trim();
		task.priority = Number(document.querySelector("#priority").value);

		//validate task
		if(task.title == ""){
			Utils.showToolTip("Task Name should not be empty", "warning");
			return false;
		}

		Task.list.todo.tasks.push(task);
		var add_task_form = document.querySelector("#add_task_form");
		add_task_form.reset();
		Utils.showToolTip("Task Added: "+task.title, "success");
		Utils.sortTasks();
		Task.displayTasks();
	}

	Task.displayTasks = function(){
		var todo_container = document.querySelector("#todo_tasks");
		var inprogress_container = document.querySelector("#inprogress_tasks");
		var done_container = document.querySelector("#done_tasks");

		var task = {};
		var next_action_text = "Start";
		var template = "";

		//Display todo List;
		todo_container.innerHTML = "";
		var todo_tasks = Task.list.todo.tasks;
		for (var i=0; i<todo_tasks.length; i++){
			
			task = todo_tasks[i];
			next_action_text = "Start";
			template = "<div class=\"task "+Priorities[task.priority].name.toLowerCase()+"\"><div class=\"priority\"><span class=\"part1\">"+(task.priority+1)+"</span><span class=\"part2\">"+Priorities[task.priority].name+"</span></div><div class=\"action\"><button data-id=\""+i+"\" data-task-group=\"todo\" data-target-group=\"inprogress\" class=\"next\" onclick=\"Task.nextAction(this)\"> "+next_action_text+" </button><button class=\"delete\" data-id=\""+i+"\" data-task-group=\"todo\" onclick=\"Task.deleteTask(this)\"> &times;</button></div><div class=\"tast_title\"><p>"+task.title+"</p></div></div>"; 
			todo_container.innerHTML += template;
		}


		//Display In Progress List

		inprogress_container.innerHTML = "";
		var inprogress_tasks = Task.list.inprogress.tasks;
		for(var i=0; i<inprogress_tasks.length; i++){
			task = inprogress_tasks[i];
			next_action_text = "Complete";
			template = "<div class=\"task "+Priorities[task.priority].name.toLowerCase()+"\"><div class=\"priority\"><span class=\"part1\">"+(task.priority+1)+"</span><span class=\"part2\">"+Priorities[task.priority].name+"</span></div><div class=\"action\"><button data-id=\""+i+"\" data-task-group=\"inprogress\" data-target-group=\"done\" class=\"next\" onclick=\"Task.nextAction(this)\"> "+next_action_text+" </button><button class=\"delete\" data-id=\""+i+"\" data-task-group=\"inprogress\" onclick=\"Task.deleteTask(this)\"> &times;</button></div><div class=\"tast_title\"><p>"+task.title+"</p></div></div>"; 
			inprogress_container.innerHTML +=template;
		}

		//Display Done List
		done_container.innerHTML = "";
		var done_tasks = Task.list.done.tasks;
		for(var i=0; i<done_tasks.length; i++){
			task = done_tasks[i];
			next_action_text = "Back to work";
			template = "<div class=\"task "+Priorities[task.priority].name.toLowerCase()+"\"><div class=\"priority\"><span class=\"part1\">"+(task.priority+1)+"</span><span class=\"part2\">"+Priorities[task.priority].name+"</span></div><div class=\"action\"><button data-id=\""+i+"\" data-task-group=\"done\" data-target-group=\"inprogress\" class=\"next\" onclick=\"Task.nextAction(this)\"> "+next_action_text+" </button><button class=\"delete\" data-id=\""+i+"\" data-task-group=\"done\" onclick=\"Task.deleteTask(this)\"> &times;</button></div><div class=\"tast_title\"><p>"+task.title+"</p></div></div>"; 
			done_container.innerHTML +=template;
		}

	}


	Task.nextAction = function(element){
		//console.log(element);

		var task_id = element.getAttribute("data-id");
		var task_group = Task.list[element.getAttribute("data-task-group")];
		var target_group = Task.list[element.getAttribute("data-target-group")];

		var task = task_group.tasks[task_id];
		task_group.tasks.splice(task_id, 1);
		target_group.tasks.push(task);
		Utils.sortTasks();		
		Task.displayTasks();
	}

	Task.deleteTask = function(element){
		var task_id = element.getAttribute("data-id");
		var task_group = Task.list[element.getAttribute("data-task-group")];
		Utils.showToolTip("Task Removed: "+task_group.tasks[task_id].title, "remove-task");
		task_group.tasks.splice(task_id, 1);
		Task.displayTasks();

		
	}



	/* ====  View Builder   ==== */

	View.createTaskForm = function(){
		//1. create a form
		var form = document.createElement("form");
		form.id = "add_task_form";
		form.className = "addtaskform";
		form.innerHTML = "<h1>New Task</h1>";
		form.setAttribute("onsubmit", "Task.addNewTask();return false;");
		
		//2. create input
		var label_for_taskname = document.createElement("label");
		label_for_taskname.innerHTML = "Task Name:";
		form.appendChild(label_for_taskname);

		var task_name = document.createElement("input");
		task_name.id="taskname";
		task_name.type = "text";
		task_name.placeholder = "Enter your Task Here!";
		task_name.name = "taskname";
		form.appendChild(task_name);

		//3. creaet select
		var label_for_priority = document.createElement("label");
		label_for_priority.innerHTML = "Priority:";
		form.appendChild(label_for_priority);

		var priority_list = document.createElement("select");
		priority_list.id="priority";
		for(var i=0; i<Priorities.length; i++){
			var option = document.createElement("option");
			option.value = Priorities[i].priority;
			option.text = Priorities[i].name;
			priority_list.appendChild(option)
		}
		form.appendChild(priority_list);

		//4. create submie
		var add_task_button = document.createElement("input");
		add_task_button.type = "submit";
		add_task_button.value = "+ Add";
		add_task_button.name = "addtask";
		form.appendChild(add_task_button);

		return form;
	}


	View.createTaskView = function(container){
		//1. create Todo 
		var todo_container = document.createElement("div");
		todo_container.className ="todo";
		todo_container.innerHTML = "<h1>"+Task.list.todo.name+"</h1><div class=\"tasks\" id=\"todo_tasks\"></div>";
		container.appendChild(todo_container);

		//2. create In Progress
		var inprogress_container = document.createElement("div");
		inprogress_container.className = "inprogress";
		inprogress_container.innerHTML = "<h1>"+Task.list.inprogress.name+"</h1><div class=\"tasks\" id=\"inprogress_tasks\"></div>"
		container.appendChild(inprogress_container);

		//3. create Done
		var done_container = document.createElement("div");
		done_container.className = "done";
		done_container.innerHTML = "<h1>"+Task.list.done.name+"</h1><div class=\"tasks\" id=\"done_tasks\"></div>";
		container.appendChild(done_container);
	}



	/* ====  Utilities   ==== */

	Utils.sortTasks = function(){

		Task.list.todo.tasks.sort(function(a,b) {return (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0);} );
		Task.list.inprogress.tasks.sort(function(a,b) {return (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0);} );
		Task.list.done.tasks.sort(function(a,b) {return (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0);} );

	}

	Utils.showToolTip = function(message, type){

		var tooltip = document.querySelector("#task_tooltip");
		if(tooltip){
			window.clearTimeout(tooltip_timeout);
			tooltip.parentNode.removeChild(tooltip);
		}
		tooltip = document.createElement("div");	
		tooltip.style.display ="block";
		tooltip.className = "task-tooltip "+type;
		tooltip.id= "task_tooltip";
		tooltip.innerHTML = message;
		Task.task_input_container.appendChild(tooltip);	

		var tooltip_timeout = window.setTimeout(function(){
			if(tooltip.parentNode){
				tooltip.parentNode.removeChild(tooltip);	
			}
			window.clearTimeout(tooltip_timeout);
		}, 2000)
	}


	/* ====  Testing   ==== */

	UnitTest.sampleTasks = function(){
		Task.list.todo.tasks.push({priority:3, title:"Create Work Estimate for client"});
		Task.list.todo.tasks.push({priority:2, title:"Meet with the new team"});
		Task.list.todo.tasks.push({priority:2, title:"Make dinner for wife"});
		Task.list.todo.tasks.push({priority:1, title:"Get feedback from Client"});
		Task.list.todo.tasks.push({priority:0, title:"Watch Foodball game"});
	}


	window.Task = Task;

})(window, undefined)