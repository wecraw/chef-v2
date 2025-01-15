import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  template: `
    <div
      class="marquee"
      [style.animation-duration]="60 + 's'"
      [style.transform]="initialTransform"
      (animationiteration)="handleAnimationIteration()"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .marquee {
        white-space: nowrap;
        animation: marquee-animation linear infinite;
      }

      @keyframes marquee-animation {
        from {
          transform: translateX(-1%);
        }
        to {
          transform: translateX(-500%);
        }
      }
    `,
  ],
})
export class MarqueeComponent implements OnInit, OnDestroy {
  @Input() speed: number = 5; // Speed of scrolling in pixels per second
  @Input() initialScrollOffset: number = 0; // Initial scroll offset in pixels
  animationDuration!: string;
  initialTransform!: string;

  constructor() {}

  ngOnInit(): void {
    this.calculateAnimationDuration();
    this.calculateInitialTransform();
  }

  ngOnDestroy(): void {
    // Cleanup
  }

  calculateAnimationDuration(): void {
    const width = this.calculateContentWidth() + this.initialScrollOffset;
    this.animationDuration = `${width / this.speed}s`;
  }

  calculateContentWidth(): number {
    const marqueeElement = document.getElementsByClassName(
      'marquee'
    )[0] as HTMLElement;
    return marqueeElement.scrollWidth;
  }

  calculateInitialTransform(): void {
    this.initialTransform = `translateX(-${this.initialScrollOffset}px)`;
  }

  handleAnimationIteration(): void {
    // Reset the position of the marquee to its initial state
    this.initialTransform = `translateX(-${this.initialScrollOffset}px)`;
  }
}
