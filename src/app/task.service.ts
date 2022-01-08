import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';
import taskListModels from './models/taskListModels';
import taskModel from './models/taskModel';
import taskModels from './models/taskModel';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiConfigService: ApiConfigService) { }

    // to get all task lists 
    getAllTaskLists(): Observable<taskListModels[]>{
     return this.apiConfigService.getTaskLists('taskLists');
    }

      // to get all tasks 
      getAllTasks(taskListId: string): Observable<taskModel[]>{
        return this.apiConfigService.getTasks(`taskLists/${taskListId}`);
       }

    // create a tasklist bucket 
  createTaskList(title: string){
    let data = {'title': title}
    return this.apiConfigService.post('taskLists', data);
  }

  // to get all tasks inside a tasklist object 
  //http://localhost:3000/tasklists/616b3577028840be5ed8c605/tasks
  getAllTasksForATaskList(taskListId: string){
  return this.apiConfigService.getTasks(`tasklists/${taskListId}/tasks`);
  }

  //create a task inside a particular task list object
  createTaskInsideATaskList(taskListId: string, title: string){
  return this.apiConfigService.post(`tasklists/${taskListId}/tasks`, {title});
  }
//delete a task list 
deleteTaskLIst(taskListId: string){
  return this.apiConfigService.delete(`tasklists/${taskListId}`);
 }

 // delete a task inside a particular task list 
// http://localhost:3000/tasklists/61671bbd2a9761ab2431d960/tasks/61674575158ed7fd310b8738
 deleteATaskInsideATaskLIst(taskListId: string, taskId: string){
 return this.apiConfigService.delete(`tasklists/${taskListId}/tasks/${taskId}`);
 }

 //update the status of a task wether its completed or not
updateTaskStatus(taskListId: string, taskObject: taskModel){
  let updateData = { 'completed': !taskObject.completed}; // toggle the database value
return this.apiConfigService.patch(`tasklists/${taskListId}/tasks/${taskObject._id}`, updateData )

}

}
