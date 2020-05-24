import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 
  userIsAuthenticated = false;
  posts: Post[] = [];
  userId: string;
  postsPerPage = 1;
  pageSizeOptions = [1,2,5,10];
  totalPosts = 0;
  currentPage = 1;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  isLoading = false;


  constructor(public postsService:PostsService, private authService: AuthService ) { }

  onDelete(postId) {
    this.isLoading = false;
    this.postsService.deletePost(postId).subscribe( () =>{
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    });
  }
  onChangedPage(pageData:PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex +1;
    this.postsPerPage = pageData.pageSize
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((postData: {posts:Post[], postCount: number}) => {
      this.totalPosts = postData.postCount;
      this.isLoading = false;
      this.posts = postData.posts;
    });
    this.userIsAuthenticated = this.authService.getIsAuth()
    this.authService.getauthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated,
      this.userId = this.authService.getUserId()
    });
}}
