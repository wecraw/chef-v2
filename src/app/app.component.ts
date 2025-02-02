import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MarqueeFullscreenComponent } from './marquee-fullscreen/marquee-fullscreen.component';
import { MarqueeComponent } from './marquee/marquee.component';
import { CommonModule } from '@angular/common';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import { chefNames } from './chefNames';
import { WeatherComponent } from './weather/weather.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MarqueeFullscreenComponent,
    CommonModule,
    NgTiltModule,
    WeatherComponent,
    MarqueeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  chefNames = chefNames;
  title = 'chef-frontend';
  showHeader = false;
  firstLoad = true;
  isMobileMenuOpen = false;
  isMobile = false;
  isSocialIconsFaded = false;

  @ViewChild('socialIcons') socialIconsElement!: ElementRef;

  ngOnInit() {
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSection(sectionId: string) {
    const element = document.querySelector('#' + sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (this.isMobile) {
        this.isMobileMenuOpen = false;
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // header fade logic
    const marquee = document.getElementById('marquee-fullscreen');
    if (marquee) {
      const rect = marquee.getBoundingClientRect();
      // The element is considered in the viewport if its top is less than the viewport height
      // and its bottom is greater than 0 (i.e. at least partially visible)
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      // Update showHeader based on whether the marquee is visible.
      // For example, you might want to hide the header when the marquee is visible:
      this.showHeader = !isInViewport;

      if (this.showHeader) {
        this.firstLoad = false;
      }
    }
    // social icons fade logic
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.isSocialIconsFaded = scrollPosition + 50 > documentHeight;
  }
}
