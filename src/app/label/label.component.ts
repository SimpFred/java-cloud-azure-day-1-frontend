import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LabelStateService } from '../states/label-state-service';

@Component({
  selector: 'app-label',
  standalone: true,
  templateUrl: './label.component.html',
  styleUrl: './label.component.css',
  imports: [CommonModule],
})
export class LabelComponent {
  labels: any[] = [];

  constructor(private labelStateService: LabelStateService) {}

  ngOnInit(): void {
    this.labelStateService.labels$.subscribe((data) => {
      this.labels = data;
    });
  }
}
