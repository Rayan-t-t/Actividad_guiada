import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, RouterLink, CommonModule, FormsModule]
})
export class InicioPage implements OnInit {
  readonly theme = inject(ThemeService);

  constructor() { }

  ngOnInit() {
  }

}
