import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule
  ],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  codigo_produto = '';
  nome = '';
  marca = '';
  preco = '';
  unidades = '';
  tamanho = '';
  cor = '';

  @Output() productAdded = new EventEmitter<boolean>();
  constructor(private httpClient: HttpClient, public dialogRef: MatDialogRef<ProductModalComponent>) {
  }

  onRegister(): void {
    const url = 'http://localhost:8090/produtos';
    this.httpClient.post(url, {
      codigo_produto: this.codigo_produto,
      nome: this.nome,
      marca: this.marca,
      preco: this.preco,
      unidades: this.unidades,
      tamanho: this.tamanho,
      cor: this.cor
    }).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.productAdded.emit(true);
      },
      error: (error) => {
        console.error('Erro no cadastro do produto', error);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
