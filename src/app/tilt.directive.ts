import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit, OnDestroy {
  @Input() tiltMaxAngleX = 25;
  @Input() tiltMaxAngleY = 25;
  @Input() tiltTransition = 'all 0.2s ease-out';
  @Input() tiltPerspective = '1000px';

  private element: HTMLElement;
  private width!: number;
  private height!: number;
  private mouseX!: number;
  private mouseY!: number;
  private tiltX!: number;
  private tiltY!: number;

  private destroy$ = new Subject<void>();

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.renderer.setStyle(this.element, 'transformStyle', 'preserve-3d');
    this.renderer.setStyle(this.element, 'transition', this.tiltTransition);
    this.renderer.setStyle(this.element, 'willChange', 'transform');

    this.setupEventListeners();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupEventListeners() {
    if ('ondeviceorientationabsolute' in window) {
      fromEvent<DeviceOrientationEvent>(window, 'deviceorientationabsolute')
        .pipe(takeUntil(this.destroy$), throttleTime(20))
        .subscribe((event: DeviceOrientationEvent) => {
          this.handleDeviceOrientation(event);
        });
    } else if ('ondeviceorientation' in window) {
      fromEvent<DeviceOrientationEvent>(window, 'deviceorientation')
        .pipe(takeUntil(this.destroy$), throttleTime(20))
        .subscribe((event: DeviceOrientationEvent) => {
          this.handleDeviceOrientation(event);
        });
    } else {
      fromEvent<MouseEvent>(this.element, 'mousemove')
        .pipe(takeUntil(this.destroy$), throttleTime(20))
        .subscribe((event: MouseEvent) => {
          this.handleMouseMove(event);
        });

      fromEvent<MouseEvent>(this.element, 'mouseleave')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.resetTilt();
        });
    }
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent) {
    if (event.beta === null || event.gamma === null) {
      return; // Handle cases where values might be null (device not providing data)
    }

    // Use absolute values if available for better accuracy
    const x = event.gamma; // (-90 to 90)
    const y = event.beta; // (-180 to 180)

    this.calculateTilt(x, y);
    this.applyTilt();
  }

  private handleMouseMove(event: MouseEvent) {
    this.updateElementSizeAndPosition();

    this.mouseX = event.clientX - this.element.offsetLeft;
    this.mouseY = event.clientY - this.element.offsetTop;

    this.calculateTilt(
      (this.mouseX / this.width - 0.5) * this.tiltMaxAngleX * 2,
      (this.mouseY / this.height - 0.5) * this.tiltMaxAngleY * 2
    );

    this.applyTilt();
  }

  private resetTilt() {
    this.tiltX = 0;
    this.tiltY = 0;
    this.applyTilt();
  }

  private calculateTilt(x: number, y: number) {
    this.tiltX = this.clamp(x, -this.tiltMaxAngleX, this.tiltMaxAngleX);
    this.tiltY = this.clamp(y, -this.tiltMaxAngleY, this.tiltMaxAngleY);
  }

  private applyTilt() {
    const transform = `perspective(${this.tiltPerspective}) rotateX(${
      this.tiltY
    }deg) rotateY(${-this.tiltX}deg)`;
    this.renderer.setStyle(this.element, 'transform', transform);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  private updateElementSizeAndPosition() {
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
  }
}
