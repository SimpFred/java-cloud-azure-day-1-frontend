import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumStateService } from './states/album-state.service';
import { ArtistStateService } from './states/artist-state.service';
import { LabelStateService } from './states/label-state-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'music-app';

  constructor(
    private albumStateService: AlbumStateService,
    private artistStateService: ArtistStateService,
    private labelStateService: LabelStateService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.albumStateService.loadAlbums();
    this.artistStateService.loadArtists();
    this.labelStateService.loadLabels();
  }
}
