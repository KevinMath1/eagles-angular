import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-modal-edit',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  templateUrl: './product-modal-edit.component.html',
  styleUrls: ['./product-modal-edit.component.css']
})
export class ProductModalEditComponent {
  @Output() productUpdated = new EventEmitter<boolean>();
  
  // Propriedades corrigidas
  id!: number;
  codigo_produto!: string;
  nome!: string;
  marca!: string;
  preco!: string;
  unidades!: string;
  tamanho!: string;
  cor!: string;  

  constructor(
    private httpClient: HttpClient,
    public dialogRef: MatDialogRef<ProductModalEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.initializeProperties();
  }

  initializeProperties(): void {
    console.log('Dados recebidos:', this.data);
    if (this.data) {
      this.id = this.data.id;
      this.codigo_produto = this.data.codigo_produto;  
      this.nome = this.data.nome;
      this.marca = this.data.marca;
      this.preco = this.data.preco;
      this.unidades = this.data.unidades; 
      this.tamanho = this.data.tamanho;
      this.cor = this.data.cor; 
    } else {
      console.error('Nenhum dado foi passado ao modal de edição!');
    }
  }

  onUpdate(): void {
    const url = `http://localhost:8090/produtos/${this.id}`;
    const productData = {
      codigo_produto: this.codigo_produto,
      nome: this.nome,
      marca: this.marca,
      preco: this.preco,
      unidades: this.unidades,
      tamanho: this.tamanho,
      cor: this.cor
    };
  
    console.log('Enviando dados do produto:', productData);
  
    this.httpClient.put(url, productData).subscribe({
      next: (response) => {
        this.dialogRef.close();
        this.productUpdated.emit(true);
        console.log('Atualização bem-sucedida:', response);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          console.error('Erro interno do servidor:', error.message);
          if (error.error.message === 'Produto não encontrado') {
            console.log('Produto não encontrado');
          } else {
            console.log('Erro ao atualizar o produto');
          }
        } else {
          console.error('Erro na atualização do produto:', error.message);
          console.log('Erro ao atualizar o produto');
        }
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
