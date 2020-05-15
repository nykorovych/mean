import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter();
  constructor() { }


  onAddPost() {
   const post = {title: this.enteredTitle, content: this.enteredContent};
   this.postCreated.emit (post);
  };

  ngOnInit(): void {
  }

}
