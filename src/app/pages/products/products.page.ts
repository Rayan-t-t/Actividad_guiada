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
  loading = false;
  error = '';
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.productService.getProducts()
      .subscribe({
        next: (response: ProductsResponse) => {
          this.products = response.products;
          this.total = response.total;
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
}
