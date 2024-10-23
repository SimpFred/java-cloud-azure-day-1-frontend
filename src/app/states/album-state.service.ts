import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlbumService } from '../services/album.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumStateService {
  private albumsSubject = new BehaviorSubject<any[]>([]);
  albums$ = this.albumsSubject.asObservable();

  constructor(private albumService: AlbumService) {}

  loadAlbums(): void {
    if (this.albumsSubject.value.length === 0) {
      this.albumService.getAlbums().subscribe((albums) => {
        this.albumsSubject.next(albums);
      });
    }
  }

  getAlbum(id: number): Observable<any> {
    return this.albumService.getAlbum(id);
  }

  addAlbum(album: any): Observable<any> {
    return this.albumService.createAlbum(album).pipe(
      tap((newAlbum) => {
        const currentAlbums = this.albumsSubject.value;
        this.albumsSubject.next([...currentAlbums, newAlbum]);
      })
    );
  }

  updateAlbum(id: number, album: any): Observable<any> {
    return this.albumService.updateAlbum(id, album).pipe(
      tap((updatedAlbum) => {
        const currentAlbums = this.albumsSubject.value;
        const index = currentAlbums.findIndex((a) => a.id === updatedAlbum.id);
        if (index > -1) {
          currentAlbums[index] = updatedAlbum;
          this.albumsSubject.next([...currentAlbums]);
        }
      })
    );
  }
}
