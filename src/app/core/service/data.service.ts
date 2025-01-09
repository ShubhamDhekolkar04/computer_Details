import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ComputerDetails } from '../../models/computer.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'data.json';
  constructor(private http: HttpClient) { }

  getComputersInfo(): Observable<ComputerDetails[]> {
    console.log(this.dataUrl);
    
    return this.http.get<ComputerDetails[]>(this.dataUrl);
  }

  getLocations(): Observable<string[]> {
    return this.http.get<ComputerDetails[]>(this.dataUrl).pipe(
      map((ComputerDetails:any) => {
        const locations = ComputerDetails.map((item:any) => item.Location);
        return Array.from(new Set(locations)); // Get unique locations
      })
    );
  }
}
