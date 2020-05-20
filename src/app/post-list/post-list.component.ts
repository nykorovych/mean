import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 
  posts: Post[] = [];
  postsPerPage = 1;
  pageSizeOptions = [1,2,5,10];
  totalPosts = 0;
  currentPage = 1;
  private postsSub: Subscription;
  isLoading = false;


  constructor(public postsService:PostsService) { }

  onDelete(postId) {
    this.isLoading = false;
    this.postsService.deletePost(postId).subscribe( () =>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts:Post[], postCount: number} ) => {
      this.totalPosts = postData.postCount;
      this.isLoading = false;
      this.posts = postData.posts;
    } );
  }
 
  onChangedPage(pageData:PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex +1;
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  ngOnDestroy():void {
    this.postsSub.unsubscribe();
  }
}


