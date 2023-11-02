import { Component, OnInit } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  tasksList: Task[] = [];

  newTask: Task = new Task();

  currentTask: Task = new Task();

  taskId?: number;

  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getAllTasks().subscribe(task => {
      this.tasksList = task;
    });
  }

  addTask() {
    this.tasksService.createTask(this.newTask).subscribe(() => {
      window.alert("Created Coffee Successfully");
    });
  }

  onSubmit() {
    this.tasksService.updateTask(this.currentTask).subscribe(edittedProduct => {
    });

  }

  onDelete(taskId: number) {
    this.tasksService.deleteTask(taskId).subscribe(deletedTask => {
      location.reload();
    });
  }

  edit(taskId: number) {
    this.tasksService.getTask(taskId).subscribe(foundTask => {
      this.currentTask = foundTask;
    });

  }

}