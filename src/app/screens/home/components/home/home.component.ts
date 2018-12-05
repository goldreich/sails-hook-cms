import { Component, OnInit } from '@angular/core';
import { ModelsService } from './../../../../services/models.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private modelsService: ModelsService) {}

  ngOnInit(): void {
    this.modelsService.refresh();
  }
}
