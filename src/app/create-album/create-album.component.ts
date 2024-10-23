import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistStateService } from '../states/artist-state.service';
import { LabelStateService } from '../states/label-state-service';
import { AlbumStateService } from '../states/album-state.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CreateAlbumComponent implements OnInit {
  newAlbum: any = {
    title: '',
    year: '',
    genre: '',
    numberOfTracks: 0,
    label: { id: 0, name: '', location: '' },
    artists: [],
  };
  newArtistId: number | null = null;
  newArtist: any = { firstName: '', lastName: '' };
  newLabel: any = { name: '', location: '' };
  labels: any[] = [];
  artists: any[] = [];
  albumId: number | null = null;
  loading: boolean = false;

  constructor(
    private albumStateService: AlbumStateService,
    private labelStateService: LabelStateService,
    private artistStateService: ArtistStateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLabels();
    this.loadArtists();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.albumId = +params['id'];
        this.loadAlbum(this.albumId);
      }
    });
  }

  loadLabels(): void {
    this.labelStateService.labels$.subscribe((data) => {
      this.labels = data;
    });
    this.labelStateService.loadLabels();
  }

  loadArtists(): void {
    this.artistStateService.artists$.subscribe((data) => {
      this.artists = data;
    });
    this.artistStateService.loadArtists();
  }

  loadAlbum(id: number): void {
    this.albumStateService.getAlbum(id).subscribe((album) => {
      this.newAlbum = album;
    });
  }

  get labelId(): number {
    return this.newAlbum.label.id;
  }

  set labelId(value: number) {
    const label = this.labels.find((l) => l.id.toString() === value.toString());
    this.newAlbum.label = label ? label : { id: value, name: '', location: '' };
  }

  openModal(elementId: string): void {
    const modal = document.getElementById(elementId);
    this.newArtist = { firstName: '', lastName: '' }; // Reset the form
    this.newLabel = { name: '', location: '' }; // Reset the form
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(elementId: string): void {
    const modal = document.getElementById(elementId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  saveNewArtist(): void {
    this.artistStateService.addArtist(this.newArtist).subscribe((artist) => {
      this.newArtistId = artist.id;
      this.closeModal('addArtistModal');
    });
  }

  saveNewLabel(): void {
    this.labelStateService.addLabel(this.newLabel).subscribe((label) => {
      this.newAlbum.label = label;
      this.closeModal('addLabelModal');
    });
  }

  isFormValid(): boolean {
    if (!this.newAlbum.title) {
      alert('Please enter a title.');
      return false;
    }
    if (!this.newAlbum.year) {
      alert('Please enter a year.');
      return false;
    }
    if (!this.newAlbum.genre) {
      alert('Please enter a genre.');
      return false;
    }
    if (
      this.newAlbum.numberOfTracks === null ||
      this.newAlbum.numberOfTracks === undefined ||
      this.newAlbum.numberOfTracks < 1
    ) {
      alert('Please enter the number of tracks.');
      return false;
    }
    if (!this.newAlbum.label) {
      alert('Please select a label.');
      return false;
    }
    if (this.newAlbum.artists.length === 0) {
      alert('Please add at least one artist.');
      return false;
    }
    return true;
  }

  addAlbum(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.loading = true;

    if (this.albumId) {
      this.albumStateService
        .updateAlbum(this.albumId, this.newAlbum)
        .subscribe({
          next: (album) => {
            console.log('Album updated successfully:', album);
            this.router.navigate(['/albums']);
          },
          error: (error) => {
            console.error('Error updating album:', error);
          },
          complete: () => {
            this.loading = false;
          },
        });
    } else {
      this.albumStateService.addAlbum(this.newAlbum).subscribe({
        next: (album) => {
          console.log('Album created successfully:', album);
          this.router.navigate(['/albums']);
        },
        error: (error) => {
          console.error('Error creating album:', error);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  addArtist(): void {
    if (this.newArtistId !== null) {
      const artistExists = this.newAlbum.artists.some(
        (artist: any) => artist.id === this.newArtistId
      );
      if (!artistExists) {
        this.newAlbum.artists.push({ id: this.newArtistId });
      }
      this.newArtistId = null;
    }
  }

  removeArtist(artistId: number): void {
    this.newAlbum.artists = this.newAlbum.artists.filter(
      (artist: any) => artist.id !== artistId
    );
  }

  getArtistName(artistId: number): string {
    const artist = this.artists.find((a) => {
      return a.id.toString() === artistId.toString();
    });

    return artist ? `${artist.firstName} ${artist.lastName}` : 'Unknown Artist';
  }

  getButtonString(): string {
    return this.albumId ? 'Update Album' : 'Create Album';
  }
}
