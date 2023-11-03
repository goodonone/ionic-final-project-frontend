import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasksList: Task[] = [];

  transitionList: Task[] = [];

  newTask: Task = new Task();

  currentTask: Task = new Task();

  taskId: number = 0;

  completed?: Task;

  completedTasks: Task[] = [];

  item?: Task

  // submit: string = '';

  constructor(private tasksService: TasksService, private dialogService: DialogService) { }

  ngOnInit(): void {
    if(this.tasksList.length>0){
      this.tasksService.getAllTasks().subscribe(task => {
        this.tasksList = task;
      });
    }
  }

  add() {
    this.tasksService.createTask(this.newTask).subscribe(() => {
      window.alert("Created Task Successfully!🎉");
      location.reload();
    });
  }

  update() {
    this.tasksService.updateTask(this.currentTask).subscribe(edittedProduct => {
      location.reload();
    });
  }

  delete(taskId: number) {
    this.tasksService.deleteTask(taskId).subscribe(deletedTask => {
      location.reload();
    });
  }

  edit(taskId: number) {
    this.tasksService.getTask(taskId).subscribe(foundTask => {
      this.currentTask = foundTask;
      var elementPos = this.tasksList.map(function(x) {return x.taskId; }).indexOf(taskId);
      // var objectFound = this.tasksList[elementPos];
      this.tasksList.splice(elementPos, 1);
      location.reload();
    });
  }

  onChange(item?: Task) {
    this.completedTasks.push();
    location.reload();
  }

  prompt() {
    this.dialogService.showPrompt('Hello There!', 'Add a New Task').subscribe(response => {
      // this.submit = response;
      this.tasksService.createTask(this.newTask).subscribe(() => {
        window.alert("Created Task Successfully!🎉");
        location.reload();
        // location.reload();
        // console.log('Favorite color: ' + response);
      });
    });
  }

}