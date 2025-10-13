import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// Ispravljena putanja da odgovara vašoj strukturi fajlova (app.ts)
import { AppComponent } from './app/app';

// Uvozimo globalne stilove i skripte
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Pokrećemo AppComponent
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

