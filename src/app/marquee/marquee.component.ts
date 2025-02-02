import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  template: `
    <div class="marquee" [style.animation-duration]="90 + 's'">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .marquee {
        white-space: nowrap;
        font-size: 12px;
        height: 20px;
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
export class MarqueeComponent {}
