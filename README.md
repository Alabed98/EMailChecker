# E-Mail Qualitätschecker

Diese Anwendung unterstützt dich dabei, **HTML-E-Mail-Templates** automatisch zu prüfen, typische Fehler zu korrigieren und hilfreiche Hinweise auszugeben.  
So kannst du sicherstellen, dass deine E-Mails technisch sauber, konsistent und leicht wartbar bleiben.  

## ✨ Features

- Upload von **HTML- und ZIP-Dateien**  
- Automatische Prüfung auf:
  - fehlende oder fehlerhafte Platzhalter (`{header}`, `{footer}`, `{preHeader}`, `{landingpageUrl}`)
  - Sonderzeichen und geschützte Leerzeichen
  - leere oder falsche `alt`-Attribute
  - externe oder falsche Bildpfade
  - Nutzung von Google Fonts (Hinweis → Bunny Fonts empfohlen)
- ZIP-Analyse:
  - ungenutzte Bilder erkennen
  - CSS-Dateien melden
  - Größe der ZIP-Datei anzeigen
- Automatische Korrekturen:
  - Entfernen von `target="_blank"`
  - Ersetzen von Umlauten durch HTML-Entities
  - Einfügen geschützter Leerzeichen vor € und %
- Mail-Type-Erkennung:
  - Header (z. B. Investor, GeVestor, maxLQ)
  - PreHeader, Impressum und enthaltene Links
 


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

