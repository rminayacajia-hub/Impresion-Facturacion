import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IFacturas } from './Interfaces/ifacturas';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Facturas } from './Services/facturas';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {

 protected readonly title = signal('Impresion-Facturacion-Froned');

    lista_facturas$!: IFacturas[];
 
  constructor(private SFacturas: Facturas) {}
 
  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.SFacturas.todas_Facturas().subscribe((facturas) => {
      this.lista_facturas$ = facturas;
      console.log(this.lista_facturas$)
    });
  }
 


imprimir() {
    const html = document.getElementById('area_imprimir')?.innerHTML;
    const ventana = window.open('', '', 'height=600, width=900');
    ventana?.document.open();
    ventana?.document.write(
      `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Nuevo</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <style>
@media print{
  button{
    display: none;
  }
}
@page{
  size: A4 portrait;
  margin: 12mm
}
  </style>
</head>
<body onload="window.print(); window.close();">
${html}
  
</body>
</html>`
    );

  }

}
