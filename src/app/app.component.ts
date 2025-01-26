import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { MarqueeComponent } from './marquee/marquee.component';
import { CommonModule } from '@angular/common';
import { NgTiltModule } from '@geometricpanda/angular-tilt';
import { chefNames } from './chefNames';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MarqueeComponent, CommonModule, NgTiltModule],
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
    const musicSection = document.getElementById('main-header');
    if (musicSection) {
      const musicSectionRect = musicSection.getBoundingClientRect();
      this.showHeader = window.scrollY > musicSectionRect.bottom;
      if (this.showHeader) this.firstLoad = false;
    }
    // social icons fade logic
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.isSocialIconsFaded = scrollPosition + 50 > documentHeight;
  }
}
