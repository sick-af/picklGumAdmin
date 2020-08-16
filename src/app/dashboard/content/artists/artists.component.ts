import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/_services/utils/utils.service';
import { ArtistsService } from 'src/app/_services/db/artists.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  public isLoading = false;
  public artists;
  public cols = [{ value: "first_name", title: "Name", visible: true },{value:"bank_account_number",title:"Bank info",visible:true}];

  constructor(private utilService:UtilsService,private artistService:ArtistsService) { }

  ngOnInit() {
    this.fetch();
  }


  async fetch() {
    this.isLoading = true;
    try {
      this.artists = await this.artistService.getArtists();
    } catch (error) {
      this.utilService.forwardErrorMessage("Failed to fetch the artists");
    }
    this.isLoading = false;
  }

}
