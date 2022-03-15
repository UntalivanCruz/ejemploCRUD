import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/api/models';
import { ProductoControllerService } from 'src/app/api/services';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    private fb: FormBuilder,//Inyeccion de la herramienta para construir formularios
    private productoServices:ProductoControllerService
  ) {
    }

//Creo(FormGroup) y defino estructura de un formulario(FormBuilder)
  formProductos: FormGroup  =   this.fb.group({
    id:[],
    nombre:['Computadora'],
    marca:['Dell'],
    color:['Negro'],
    peso:[1,[Validators.min(1),Validators.max(100)]],
    volumen:[1]
  })
;

visible:boolean=false
producto:Producto[]=[]; //Arreglo de datos de productos

  open(data?:Producto): void {
    if(data)
      this.formProductos.setValue(data)
    this.visible = true;
  }

  close(): void {
    this.visible = false;
    this.formProductos.reset()
  }

  ngOnInit(): void {
    this.getProductos()
  }

  getProductos():void{
    this.productoServices.find().subscribe(datos => this.producto = datos )
  }

  guardar():void{
    if(this.formProductos.value.id){//Actualizar
      this.productoServices.updateById({'id':this.formProductos.value.id,'body':this.formProductos.value}).subscribe(
        () => 
        {
          this.producto = this.producto.map(obj => {
            if (obj.id === this.formProductos.value.id)
              return this.formProductos.value;          
            return obj;
          });

          this.formProductos.reset()
          this.close();
        }
      )
    }else{//Insertar
    delete this.formProductos.value.id //Eliminamos el campo ID porque se genera de forma automatica en la BD
    this.productoServices.create({'body':this.formProductos.value}).subscribe(
      datoAgregado=>
      {
        this.producto = [...this.producto,datoAgregado]
        this.formProductos.reset()
        this.close();
      }
      )
    }
  }

  delete(id:string):void{
    this.productoServices.deleteById({id}).subscribe(() => {
      this.producto = this.producto.filter(x => x.id !== id);
    })
  }
}
