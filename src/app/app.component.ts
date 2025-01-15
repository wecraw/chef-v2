import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarqueeComponent } from './marquee/marquee.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MarqueeComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'chef-frontend';

  chefNames = [
    'Creative Hues Erupting Funk',
    'Chromatic Heat Energy Fusion',
    'Celestial Groove Evolutionary Force',
    'Chicago Hotdog, Extra Fries',
    'Conscious Harmonic Energy Flow',
    'Captivating Harmonic Eclectic Funk',
    'Cool Heat Embracing Funk',
    'Coupla Homies Emitting Frequencies',
    'Crazy Harmonic Euphoric Funk',
    'Creative Hues Erupting Funk',
    'Chromatic Heat Energy Fusion',
    'Celestial Groove Evolutionary Force',
    'Chicago Hotdog, Extra Fries',
    'Conscious Harmonic Energy Flow',
    'Captivating Harmonic Eclectic Funk',
    'Cool Heat Embracing Funk',
    'Coupla Homies Emitting Frequencies',
    'Crazy Harmonic Euphoric Funk',
    'Creative Hues Erupting Funk',
    'Chromatic Heat Energy Fusion',
    'Celestial Groove Evolutionary Force',
    'Chicago Hotdog, Extra Fries',
    'Conscious Harmonic Energy Flow',
    'Captivating Harmonic Eclectic Funk',
    'Cool Heat Embracing Funk',
    'Coupla Homies Emitting Frequencies',
    'Crazy Harmonic Euphoric Funk',
    'Creative Hues Erupting Funk',
    'Chromatic Heat Energy Fusion',
    'Celestial Groove Evolutionary Force',
    'Chicago Hotdog, Extra Fries',
    'Conscious Harmonic Energy Flow',
    'Captivating Harmonic Eclectic Funk',
    'Cool Heat Embracing Funk',
    'Coupla Homies Emitting Frequencies',
    'Crazy Harmonic Euphoric Funk',
  ];
}
