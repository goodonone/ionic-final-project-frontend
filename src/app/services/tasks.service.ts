import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  baseURL: string = "http://localhost:5059/api/Tasks";


  getAllTasks() {
    return this.http.get<Task[]>(this.baseURL);
  }

  getTask(taskId: number) {
    return this.http.get<Task>(this.baseURL + "/" + taskId);
  }

  createTask(newTask: Task) {
    return this.http.post(this.baseURL, newTask);
  }

  updateTask(updatedTask: Task) {
    return this.http.put(this.baseURL + "/" + updatedTask.taskId, updatedTask);
  }

  deleteTask(taskId: number) {
    return this.http.delete<any>(this.baseURL + "/" + taskId)
  }
}


