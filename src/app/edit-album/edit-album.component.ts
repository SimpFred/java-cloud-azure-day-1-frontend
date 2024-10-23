import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateAlbumComponent } from '../create-album/create-album.component';
import { ArtistStateService } from '../states/artist-state.service';
import { LabelStateService } from '../states/label-state-service';
import { AlbumStateService } from '../states/album-state.service';

@Component({
  selector: 'app-edit-album',
  templateUrl: '../create-album/create-album.component.html',
  styleUrls: ['../create-album/create-album.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EditAlbumComponent extends CreateAlbumComponent implements OnInit {
  constructor(
    albumStateService: AlbumStateService,
    labelStateService: LabelStateService,
    artistStateService: ArtistStateService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(
      albumStateService,
      labelStateService,
      artistStateService,
      route,
      router
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
}
