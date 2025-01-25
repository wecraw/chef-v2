import { Component, HostListener } from '@angular/core';
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
  showHeader = false;
  firstLoad = true;

  scrollToSection(sectionId: string) {
    const element = document.querySelector('#' + sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const musicSection = document.getElementById('music-header');
    if (musicSection) {
      const musicSectionRect = musicSection.getBoundingClientRect();
      this.showHeader = window.scrollY > musicSectionRect.bottom;
      if (this.showHeader) this.firstLoad = false;
    }
  }
}
