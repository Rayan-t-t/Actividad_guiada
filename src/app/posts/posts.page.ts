import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
} from '@ionic/angular';
import { Posts } from '../models/posts';
import { StoreService } from '../services/posts';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
  ],
})
export class PostsPage implements OnInit {
  private storeService = inject(StoreService);
  private changeDetector = inject(ChangeDetectorRef);
  readonly theme = inject(ThemeService);

  posts: Posts[] = [];
  loading = true;
  error = '';

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    this.storeService.getStoreProducts().subscribe({
      next: (posts: Posts[]) => {
        this.posts = posts;
        this.loading = false;
        this.changeDetector.markForCheck();
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'No se han podido cargar los posts.';
        this.loading = false;
        this.changeDetector.markForCheck();
      },
    });
  }
}
