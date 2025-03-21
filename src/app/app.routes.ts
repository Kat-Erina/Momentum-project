import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', 
        loadComponent:()=>import('./components/tasks/tasks.component').then(m=>m.TasksComponent)
    },
    {path:'new-task', 
        loadComponent:()=>import('./components/new-task/new-task.component').then(m=>m.NewTaskComponent)
    },
    {path:'task/:taskId', 
        loadComponent:()=>import('./components/task-page/task-page.component').then(m=>m.TaskPageComponent)
    }
];
