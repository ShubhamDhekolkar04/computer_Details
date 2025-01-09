import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../core/service/data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    FormsModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
constructor(private dataService: DataService) { }

storageOptions: string[] = [ '0GB','250GB','500GB','1TB','2TB','3TB','4TB','8TB','12TB','24TB','48TB','72TB'];
selectedStorageIndex: number = 0;
ramOptions: string[] = ['2GB','4GB','8GB','12GB','16GB','24GB','32GB','48GB','64GB','96GB',];
selectedRam: string = ''; 
hddOptions: string[] = ['SAS', 'SATA', 'SSD'];
locationOptions: string[] = [];

@Output() filterChange = new EventEmitter<any>();

filters = {
    ram: '',
    hddType: '',
    location: '',
    storage: 0,
};

  ngOnInit(): void {
    this.dataService.getLocations().subscribe((locations: string[]) => {
      this.locationOptions = locations;
    });
  }
  updateFilterData() {
    const activeFilters = {
      ram: this.selectedRam,
      hddType: this.filters.hddType,
      location: this.filters.location,
      storage: this.storageOptions[this.selectedStorageIndex],
    };
    this.filterChange.emit(activeFilters);
  }
}