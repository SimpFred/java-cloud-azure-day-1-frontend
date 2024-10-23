import { Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { LabelComponent } from './label/label.component';
import { CreateAlbumComponent } from './create-album/create-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';

export const routes: Routes = [
  { path: 'albums', component: AlbumComponent },
  { path: 'artists', component: ArtistComponent },
  { path: 'labels', component: LabelComponent },
  { path: 'create-album', component: CreateAlbumComponent },
  { path: 'edit-album/:id', component: EditAlbumComponent },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
];
