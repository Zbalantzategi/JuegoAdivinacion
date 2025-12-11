import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Configuracion } from '../models/configuracion';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-configuracion',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})

export class ConfiguracionComponent {
formulario!: FormGroup;
  configuracion?: Configuracion;
  numeroGenerado?: number;
  mensaje?: string;
  vidasTotales?: number;

  constructor(private fb: FormBuilder) { }

  FormIntento!: FormGroup;

  configGuardada = false;

  ngOnInit() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      rangoMaximo: [null, [Validators.required, Validators.min(4)]],
      vidas: [null, [Validators.required, Validators.min(1)]]
    });
    this.FormIntento = this.fb.group({
      intento: [null, [Validators.required]]
    });
  }

  recogerDatos() {
    this.configuracion = this.formulario.value;

    const rangoMax = this.configuracion?.rangoMaximo ?? 0;

    this.numeroGenerado = Math.floor(Math.random() * rangoMax);

    this.vidasTotales= this.formulario.value.vidas;

    // Quitar alert!!!!!
    alert(this.numeroGenerado);

    this.formulario.disable();
    

    this.configGuardada = true;
  }

  comprobarIntento() {
    const numeroIntento = this.FormIntento.value.intento; 

    const numGen = this.numeroGenerado ?? 0;

    const diferencia = numGen - numeroIntento;
    

    if(diferencia === 0) {
      this.mensaje = "Has ganado";
      return;
    } else if (diferencia === 1) {
      this.mensaje = "Caliente";
    } else if (diferencia === 2) {
      this.mensaje = "Templado";
    } else if (diferencia >= 3) {
      this.mensaje = "Frio";
    } else {
      this.mensaje = "Te pasaste";
    }

    
    this.vidasTotales!--;



    if(this.vidasTotales === 0) {
      alert(`Has perdido pringao. El número era: ${numGen}`);
      this.FormIntento.disable();
    }
  }

}
