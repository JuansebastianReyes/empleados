import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from 'src/app/services/empleado.service';
//import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
/*
  items: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('items').valueChanges();
  }
*/
  constructor(private _empleadoService: EmpleadoService, private toastr: ToastrService){

  }
  empleados: any[] = [];

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data=>{
      this.empleados = [];
      data.forEach((element: any) => {
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        this.empleados.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          }
        )
      });
      console.log(this.empleados);
    });
  };

  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      console.log("El Empleado a sido eliminado");
      this.toastr.error('El Empleado a sido eliminado Correctamente','Registro eliminado!',{
        positionClass:'toast-bottom-right',
      });
    }).catch(error =>{
      console.log(error);
    });
  }
}
