import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { getLocaleDateFormat } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dragdropApp';
  showTodo=false
  taskForm=this.fb.group({
    task:['',(Validators.required)]
  })
  movies = [];
  constructor(private fb:FormBuilder) {}

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.currentIndex)
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    console.log(event.container.data[event.currentIndex])
  
  }
  getData(){
    
    if(!this.taskForm.valid){
    alert("task field cannot be empty")
    }
    else{
      console.log(this.taskForm.value.task)
    }
  }
  showData(){
    this.showTodo=!this.showTodo
  }
}
