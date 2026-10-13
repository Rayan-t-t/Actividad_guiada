import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
  private changeDetector = inject(ChangeDetectorRef);
  readonly theme = inject(ThemeService);
  products: Product[] = [];
  total = 0;
  readonly pageSize = 12;
  currentPage = 1;
  loading = false;
  error = '';

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(page = this.currentPage): void {
    this.loading = true;
    this.error = '';
    this.productService.getProducts(this.pageSize, (page - 1) * this.pageSize)
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products = response.products;
          this.total = response.total;
          this.currentPage = page;
          this.loading = false;
          this.changeDetector.markForCheck();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.error =
            'No se han podido cargar los productos.';
          this.loading = false;
          this.changeDetector.markForCheck();
        }
      });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1 && !this.loading) {
      this.loadProducts(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages && !this.loading) {
      this.loadProducts(this.currentPage + 1);
    }
  }
}
