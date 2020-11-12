import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocSearchResult } from '../models/docsearchresult';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  searchResults : DocSearchResult;
  p:number = 1;
  searchText;
  specialization;
  location;
  order:String='experience';
  reverse:boolean=true;

  constructor(private searchService : SearchService,
              private activatedRote : ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRote.queryParams.subscribe(params =>{
      this.specialization=params['specialization'];
      this.location=params['location'];

      if(this.specialization==='All Doctors' && this.location==='All Locations'){
        this.searchService.getDoctors().subscribe(data => {
          this.searchResults=data;
          // console.log(this.searchResults);
        });
      }

      else if(this.location==='All Locations'){
          this.searchService.getSpecializedDoctors(this.specialization).subscribe(data =>{
            this.searchResults=data;
            // console.log(this.specialization+" "+this.location);
          });
      }

      else if(this.specialization==='All Doctors'){
          this.searchService.getDoctorsinLocation(this.location).subscribe(data=> {
            this.searchResults=data;
          });
      }

      else{
        this.searchService.getSpecializedDoctorsInLocation(this.specialization,this.location).subscribe(data => {
          this.searchResults=data;
        })
      }
  });
    
  }

  sortByHandler(event : any){
    this.order=event.target.value;
    if(this.order=='consultationfee-high to low'){
      this.order='consultationfee';
      this.reverse=true;
    }
    else if(this.order=='consultationfee-low to high'){
      this.order='consultationfee';
      this.reverse=false;
    }
    else{
      this.reverse=true;
    }
  }

}
