import { Component, OnInit } from '@angular/core';
import { GlobalSearchService } from '../../services/global-search.service';

@Component({
  selector: 'app-moduleoutlet',
  templateUrl: './moduleoutlet.component.html',
  styleUrls: ['./moduleoutlet.component.css']
})
export class ModuleoutletComponent implements OnInit {
  constructor(private http:GlobalSearchService) { 
    http.getData
  }
  
  display = 'none'
  searchText = '';
  changeSearchText(ev){
    this.searchText = ev;
    this.display = 'block'
  }

  inputBlur(ev){
    this.display = 'none'
  }
  characters = [
    'ant-MAN',
    'AQUAman',
    'asterix',
    'the atom',
    'the avengers',
    'bat girl',
    'bat man',
    'bat woman'
  ]
  ngOnInit(): void {  
  } 
}
