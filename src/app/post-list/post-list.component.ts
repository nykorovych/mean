import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   { title: 'First Post', content: 'the content of the fist post'},
  //   { title: 'Second Post', content: 'the content of the Second post'},
  //   { title: 'Third Post', content: 'the content of the Third post'},
  //   { title: 'Fourth Post', content: 'the content of the fourth post'}
  // ]
  posts = [
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
