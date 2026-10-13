import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService }
  from '../../services/product.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-productos',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  readonly theme = inject(ThemeService);
  readonly products = signal<Product[]>([]);
  readonly total = signal(0);
  readonly pageSize = 12;
  readonly currentPage = signal(1);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly totalPages = computed(() => Math.ceil(this.total() / this.pageSize));

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page = this.currentPage()): void {
    this.loading.set(true);
    this.error.set('');
    this.productService.getProducts(this.pageSize, (page - 1) * this.pageSize)
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products.set(response.products);
          this.total.set(response.total);
          this.currentPage.set(page);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.error.set('No se han podido cargar los productos.');
          this.loading.set(false);
        }
      });
  }

  goToPreviousPage(): void {
    if (this.currentPage() > 1 && !this.loading()) {
      this.loadProducts(this.currentPage() - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage() < this.totalPages() && !this.loading()) {
      this.loadProducts(this.currentPage() + 1);
    }
  }
}
