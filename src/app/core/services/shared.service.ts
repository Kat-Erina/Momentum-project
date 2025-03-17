import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class SharedService{
employeeModalIsOpen=signal(false)
}