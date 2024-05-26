import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent {
  codigo = '';
  nome = '';
  marca = '';
  preco = '';
  unidade = '';
  tamanho = '';
  cor = '';

  constructor(private httpClient: HttpClient) {}

  onRegister(): void {
    console.log('Dados do Produto:', { codigo: this.codigo, nome: this.nome, marca: this.marca, preco: this.preco, unidade: this.unidade, tamanho: this.tamanho, cor: this.cor });

    const url = 'http://localhost:8090/produtos';
    this.httpClient.post(url, { codigo: this.codigo, nome: this.nome, marca: this.marca, preco: this.preco, unidade: this.unidade, tamanho: this.tamanho, cor: this.cor }).subscribe({
      next: (response) => console.log('Cadastro de produto bem sucedido', response),
      error: (error) => console.error('Erro no cadastro do produto', error)
    });
  }
}
