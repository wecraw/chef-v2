import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'marquee-fullscreen',
  standalone: true,
  template: `
    <div class="ticker-container">
      <div class="ticker-content" [style.animation-duration]="180 + 's'">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      /* Ensure the component fills the full width of its container */
      :host {
        display: block;
        width: 100%;
      }

      /* The outer container provides a full-width, overflow-hidden ticker area */
      .ticker-container {
        width: 100%;
        overflow: hidden;
        background-color: #000;
        color: #fff;
        font-family: 'Archivo Black', serif;
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;
      }

      /* The scrolling content: start off-screen (using padding-left) and scroll continuously */
      .ticker-content {
        white-space: nowrap;
        display: inline-block;
        padding-left: 100%;
        animation: marquee-animation linear infinite;
      }

      /* A basic marquee animation: scroll the content leftwards until it is off-screen */
      @keyframes marquee-animation {
        0% {
          transform: translateX(-4.2%);
        }
        100% {
          transform: translateX(-100%);
        }
      }
    `,
  ],
})
export class MarqueeFullscreenComponent {}
