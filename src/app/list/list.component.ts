import { Component, OnInit } from '@angular/core';
import { ComputerDetails } from '../models/computer.model';
import { DataService } from '../core/service/data.service';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../shared/filter/filter.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  data: ComputerDetails[] = [];
  filteredData: ComputerDetails[] = [];
  paginationData: ComputerDetails[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10; // Set the number of items per page
  totalPages: number = 1;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getComputersInfo().subscribe((computers: ComputerDetails[]) => {
      this.data = computers;
      this.filteredData = [...this.data];
      this.calculatePagination();
     console.log(this.filteredData);
    });
    
  }

  applyFilters(filters: any): void {
      this.filteredData = this.data.filter(item => {
      const ramValue = item.RAM.split('GB')[0];
      const matchRam = filters.ram.length ? filters.ram.includes(ramValue) : true;
      const matchStorage = filters.storage ? item.HDD.includes(filters.storage) : true;
      const matchHdd = filters.hddType ? item.HDD.includes(filters.hddType) : true;
      const matchLocation = filters.location ? item.Location === filters.location : true;
      return matchRam && matchStorage && matchHdd && matchLocation;
    });

    this.currentPage = 1;
    this.calculatePagination();
    console.log(this.filteredData);

  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    this.updatePaginationData();
  }

  updatePaginationData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginationData = this.filteredData.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginationData();
  }
}
