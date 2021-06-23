import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { getLocaleDateFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dragdropApp';
 
  taskForm=this.fb.group({
    task:['',(Validators.required)]
  })
  taskid
  currentindex
  Todos = [];
  constructor(private fb:FormBuilder,private http:HttpClient) {
    this.showData()
  }

  drop(event: CdkDragDrop<string[]>) {
  
    moveItemInArray(this.Todos, event.previousIndex, event.currentIndex);
    const draggedelement =event.container.data[event.currentIndex]
    const draggedelementindex=event.currentIndex
    const swappedelement=event.container.data[event.previousIndex]
    const swappedelementindex=event.previousIndex
    const selement= swappedelement["Task"]
    const selementindex=swappedelementindex
    const delement=draggedelement["Task"]
    const delementindex=draggedelementindex
    console.log(selementindex)
    console.log(delementindex)
    const data={
      delement,
      delementindex,
      selement,
      selementindex
    }
   this.http.post("http://localhost:3000/updateDatabase",data).subscribe((result:any)=>{
    if(result){
      alert("Database updated")
      
    }
    })
  }
  addData(){
    const task=this.taskForm.value.task
    const taskid=this.taskid
    const currentindex=this.currentindex
    if(!this.taskForm.valid){
    alert("task field cannot be empty")
    }
    else{
      const data={
        task,
        taskid,
        currentindex
      }
      this.http.post("http://localhost:3000/addData",data).subscribe((result:any)=>{
        if(result){
          alert("task added succesfully")
          window.location.reload();
        }
        },(result)=>{
         alert(result.error.message)
        })
    }
  }
  showData(){
    this.http.post("http://localhost:3000/showData","").subscribe((result:any)=>{
        if(result){
         this.Todos=result.todolist
         if(this.Todos.length==0){
           this.taskid=1
           this.currentindex=0
         }
         else{
           this.taskid=this.Todos.length+1
           this.currentindex=this.Todos.length
         }
        }
        })
  }
}
