import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { CommonModule } from '@angular/common';
import { ArtistStateService } from '../states/artist-state.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ArtistComponent implements OnInit {
  artists: any[] = [];

  constructor(private artistStateService: ArtistStateService) {}

  ngOnInit(): void {
    this.artistStateService.artists$.subscribe((data) => {
      this.artists = data;
    });
  }
}
