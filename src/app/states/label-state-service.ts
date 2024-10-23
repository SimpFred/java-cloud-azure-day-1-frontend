import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LabelService } from '../services/label.service';

@Injectable({
  providedIn: 'root',
})
export class LabelStateService {
  private labelsSubject = new BehaviorSubject<any[]>([]);
  labels$ = this.labelsSubject.asObservable();

  constructor(private labelService: LabelService) {}

  loadLabels(): void {
    if (this.labelsSubject.value.length === 0) {
      this.labelService.getLabels().subscribe((labels) => {
        this.labelsSubject.next(labels);
      });
    }
  }

  addLabel(label: any): Observable<any> {
    return this.labelService.createLabel(label).pipe(
      tap((newLabel) => {
        const currentLabels = this.labelsSubject.value;
        this.labelsSubject.next([...currentLabels, newLabel]);
        console.log('new label added', newLabel);
        console.log('labelSubject', this.labelsSubject.value);
      })
    );
  }
}
