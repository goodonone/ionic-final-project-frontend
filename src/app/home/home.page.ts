import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';
import { DialogService } from '../services/dialog.service';
import { Dialog } from '@capacitor/dialog';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasksList: Task[] = [];

  incompleteTasks: Task[] = [];

  newTask: Task = new Task();

  currentTask: Task = new Task();

  completedTasks: Task[] = [];

  elementPos: number = 0;

  constructor(private tasksService: TasksService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.refreshTasks();
  }

  refreshTasks() {
    this.tasksService.getAllTasks().subscribe(task => {
      this.tasksList = task;
      this.completedTasks = [];
      this.incompleteTasks = [];

      task.forEach(task => {
        if (task.completed == true) {
          this.completedTasks.push(task);
        }
        else {
          this.incompleteTasks.push(task);
        }
      });
    });
  }

  addTask() {
    Dialog.prompt({
      title: 'Add New Task',
      message: 'Task Title',
    }).then(result => {
      this.tasksService.createTask(result.value).subscribe(() => this.refreshTasks());
    })
  }

  update(id: number) {
    this.elementPos = this.tasksList.map(function (x) { return x.taskId; }).indexOf(id);
    const objectFound = this.tasksList[this.elementPos];
    objectFound.completed = !objectFound.completed;
    this.tasksService.updateTask(objectFound).subscribe(() => this.refreshTasks());
  }

  delete(id: number) {
    this.tasksService.deleteTask(id).subscribe(() => this.refreshTasks());
  }


}






  


