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
[x: string]: any;

  tasksList: Task[] = [];

  newTask: Task = new Task();

  currentTask: Task = new Task();

  taskId?: number;

  completed?: Task;

  completedTasks: Task[] = [];

  submit : string = '';

  constructor(private tasksService: TasksService, private dialogService: DialogService) { }

  ngOnInit(): void {
    // if((this.tasksService.getAllTasks()!==null)){
      this.tasksService.getAllTasks().subscribe(task => {
        this.tasksList = task;
      });
    // }
    // else{
    //   this.tasksList=[];
    // }
    
  }

  add() {
    this.tasksService.createTask(this.newTask).subscribe(() => {
      window.alert("Created Task Successfully!🎉");
      location.reload();
    });
  }

  update() {
    this.tasksService.updateTask(this.currentTask).subscribe(edittedProduct => {
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
    });
  }

  onChange(item?: Task) {
      this.completedTasks.push()
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