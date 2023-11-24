import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostComponent} from './posts/post.component';
import { AuthGuard } from 'src/app/share/auth.guard'; 
import { PostCategoriesComponent } from './post-categories/post-categories.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostComponent,
    data: {
      title: 'Bài viết',
      requiredPolicy: "Permissions.Posts.View",
    },
    canActivate: [AuthGuard],

  },
  {
    path: 'post-categories',
    component: PostCategoriesComponent,
    data: {
      title: 'Danh mục',
      requiredPolicy: "Permissions.PostCategories.View",
    },
    canActivate: [AuthGuard],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {
}
