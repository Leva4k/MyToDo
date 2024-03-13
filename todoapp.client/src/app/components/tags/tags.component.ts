import { Component, OnInit } from '@angular/core';
import { Tags } from './tags.model';
import { TagsService } from './tags.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {
  tags: Tags[] = [];

  //значения по дефолту
  newTags: Tags = {
    id: '',
    nameTags: '',
   
  };

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.getAllTags();
  }

  getAllTags() {
    this.tagsService.getAllTags()
      .subscribe({
        next: (tags) => {
          this.tags = tags;
        }
      });
  }

  addTags() {
    this.tagsService.addTags(this.newTags)
      .subscribe({
        next: (tags) => {
          this.getAllTags();
        }
      });
  }

  deleteTags(id: string) {
    this.tagsService.deleteTags(id)
      .subscribe({
        next: (response) => {
          this.getAllTags();
        }
      });
  }
}

