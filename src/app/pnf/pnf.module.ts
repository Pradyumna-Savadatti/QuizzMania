import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnfComponent } from './pnf/pnf.component';

@NgModule({
  declarations: [PnfComponent],
  imports: [CommonModule, MatIconModule],
})
export class PnfModule {}
