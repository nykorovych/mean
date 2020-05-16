import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 
  posts: Post[] = [];
  private postsSub: Subscription;
  constructor(public postsService:PostsService) { }

  ngOnInit() {
   this.postsService.getPosts()
    
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) =>{
      this.posts = posts;
    } );
  }
 
  ngOnDestroy():void {
    this.postsSub.unsubscribe();
  }
}














 // posts = [
  //   { title: 'First Post', content: 'the content of the fist post'},
  //   { title: 'Second Post', content: 'the content of the Second post'},
  //   { title: 'Third Post', content: 'the content of the Third post'},
  //   { title: 'Fourth Post', content: 'the content of the fourth post'}
  // ]