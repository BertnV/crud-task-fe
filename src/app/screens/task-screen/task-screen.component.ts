import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import taskListModels from 'src/app/models/taskListModels';
import taskModel from 'src/app/models/taskModel';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-screen',
  templateUrl: './task-screen.component.html',
  styleUrls: ['./task-screen.component.css']
})
export class TaskScreenComponent implements OnInit {

  tasksLists: taskListModels[] = [];
  tasks: taskModel[] = [];
  taskListId: string = '';
  constructor(private taskService: TaskService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    
    }

  ngOnInit(): void {
   
    this.taskService.getAllTaskLists()
    .subscribe(allTaskLists => {
    this.tasksLists = allTaskLists;
   
  this.router.navigate(['task-list', this.tasksLists[0]['_id']]);
  });
    // get the first task list id and route to it on page load  
    this.activatedRoute.params.subscribe(
    (params: Params)=>{
       this.taskListId = params.taskListId;
      if(this.taskListId){
        this.taskService.getAllTasksForATaskList(this.taskListId).subscribe(
          (tasks: taskModel[]) => this.tasks = tasks 
        );
      }
    }
    );
    }

  taskClicked(task: taskModel) {
     // this.taskService.updateTaskStatus(this.taskListId, task)
      // .subscribe(() => task.completed = !task.completed);
  
  }
}

