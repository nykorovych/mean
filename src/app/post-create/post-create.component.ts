import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredValue = ''
  newPost = ''
  constructor() { }

  onAddPost() {
    this.newPost = this.enteredValue;
    
  }
  ngOnInit(): void {
  }

}
