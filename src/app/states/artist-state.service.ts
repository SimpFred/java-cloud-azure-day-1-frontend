import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArtistService } from '../services/artist.service';

@Injectable({
  providedIn: 'root',
})
export class ArtistStateService {
  private artistsSubject = new BehaviorSubject<any[]>([]);
  artists$ = this.artistsSubject.asObservable();

  constructor(private artistService: ArtistService) {}

  loadArtists(): void {
    if (this.artistsSubject.value.length === 0) {
      this.artistService.getArtists().subscribe((artists) => {
        this.artistsSubject.next(artists);
      });
    }
  }

  addArtist(artist: any): Observable<any> {
    return this.artistService.createArtist(artist).pipe(
      tap((newArtist) => {
        const currentArtists = this.artistsSubject.value;
        this.artistsSubject.next([...currentArtists, newArtist]);
      })
    );
  }
}
