import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarqueeComponent } from './marquee/marquee.component';
import { CommonModule } from '@angular/common';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import { chefNames } from './chefNames';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarqueeComponent, CommonModule, NgTiltModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  chefNames = chefNames;
  title = 'chef-frontend';

  scrollToSection(sectionId: string) {
    const element = document.querySelector('#' + sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
