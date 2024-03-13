import { Component } from '@angular/core';
import { Tags } from './tags.model';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags: Tags[] = [];
}
