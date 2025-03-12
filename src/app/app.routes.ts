import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', 
        loadComponent:()=>import('./components/tasks/tasks.component').then(m=>m.TasksComponent)
    }
];
