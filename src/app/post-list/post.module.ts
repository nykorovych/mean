import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core'
import { PostCreateComponent } from '../post-create/post-create.component';
import { PostListComponent } from './post-list.component';
import { AngularMaterialModule } from 'src/angular-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
declarations: [PostCreateComponent, PostListComponent,],
imports: [ 
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule

]
})
export class PostModule {}