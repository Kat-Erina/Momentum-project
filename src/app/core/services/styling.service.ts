import { Injectable } from "@angular/core";

@Injectable({
    'providedIn':'root'
})
export class StylingService{
    
getDepartmentClass(departmentName: string): string {
  const departmentColors: { [key: string]: string } = {
  'ადმინისტრაციის დეპარტამენტი': 'bgc-pink',
      'ფინანსების დეპარტამენტი': 'bgc-blue',
      'გაყიდვები და მარკეტინგის დეპარტამენტი': 'bgc-pink',
      "ადამიანური რესურსების დეპარტამენტი":'bgc-pink',
      "ლოჯოსტიკის დეპარტამენტი":"bgc-blue",
      "ტექნოლოგიების დეპარტამენტი":"bgc-yellow",
"მედიის დეპარტამენტი":'bgc-orange',
  };

  return departmentColors[departmentName];
}

getPriorityClass(priorityName: string): string {
  const prioritycolors: { [key: string]: string } = {
  'დაბალი': 'green-font',
      'მაღალი': 'red-font',
      'საშუალო': 'yellow-font',
  };

  return prioritycolors[priorityName];
}

styleBorders(priorityName: string): string {
  const prioritycolors: { [key: string]: string } = {
  'დაბალი': 'grene-border',
      'მაღალი': 'red-border',
      'საშუალო': 'orange-border-lighter',
  };

  return prioritycolors[priorityName];
}

}