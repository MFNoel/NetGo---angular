import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Tariff } from '../../shared/models/Tariff';
import { TariffService } from '../../shared/services/tariff.service';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
  standalone: true
})
export class ManagementComponent implements OnInit {
  tariffs: Tariff[] = [];
  tariffForm: FormGroup;
  editingTariffId: string | null = null;

  constructor(private tariffService: TariffService, private fb: FormBuilder) {
    this.tariffForm = this.fb.group({
      name: ['', Validators.required],
      internet: ['', Validators.required],
      calls: ['', Validators.required],
      extra1: [''],
      extra2: [''],
      extra3: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.loadTariffs();
  }

  async loadTariffs() {
    this.tariffs = await this.tariffService.getAllTariffs();
  }

  async onSubmit() {
    if (this.tariffForm.invalid) return;

    const formValue = this.tariffForm.value;

    if (this.editingTariffId) {
      await this.tariffService.updateTariff(this.editingTariffId, formValue);
      this.editingTariffId = null;
    } else {
      await this.tariffService.addTariff(formValue);
    }

    this.tariffForm.reset({
      name: '',
      internet: '',
      calls: '',
      extra1: '',
      extra2: '',
      extra3: '',
      price: 0,
    });
    await this.loadTariffs();
  }

  onEdit(tariff: Tariff) {
    this.editingTariffId = tariff.id ?? null;
    this.tariffForm.setValue({
      name: tariff.name || '',
      internet: tariff.internet || '',
      calls: tariff.calls || '',
      extra1: tariff.extra1 || '',
      extra2: tariff.extra2 || '',
      extra3: tariff.extra3 || '',
      price: tariff.price || 0,
    });
  }

  async onDelete(tariff: Tariff) {
    if (confirm(`Biztosan törölni szeretnéd ezt a tarifát: ${tariff.name}?`)) {
      if (tariff.id) {
        await this.tariffService.deleteTariff(tariff.id);
        await this.loadTariffs();
      } else {
        alert('Hiba: A tarifa azonosítója hiányzik, nem törölhető.');
      }
    }
  }

  onCancelEdit() {
    this.editingTariffId = null;
    this.tariffForm.reset({
      name: '',
      internet: '',
      calls: '',
      extra1: '',
      extra2: '',
      extra3: '',
      price: 0,
    });
  }
}