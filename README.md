
# Analog-Projektarbeit


## Analog
[Analog](https://analogjs.org/) ist ein Web-Framework, das auf Angular aufbaut. In dieser Arbeit wird ein Beispiel erstellt, das die Stärken und Schwächen von Analog zeigen soll.


### Features (Quelle: [Analog Website](https://analogjs.org))
Analog bietet folgende Funktionen:  

- **Vite-powered**: Analog verwendet Vite zum Bereitstellen und Erstellen, sowie Vitest für Tests.  
- **Hybrid SSR/SSG support**: Unterstützt sowohl Server-Side Rendering (SSR) als auch Static Site Generation (SSG).  
- **File-based routing and API routes**: Nutzt dateibasierte Routen und unterstützt API-Routen für Angular-Anwendungen.  

Weitere Informationen in der [Analog Doku](https://analogjs.org/docs).


# Inhaltsverzeichnis

- [1. Projekt](#1-projekt)
  - [1.1 Projekt Setup](#11-projekt-setup)
  - [1.2 Projekt Struktur](#12-projekt-struktur)
- [2. File Based Routing in AnalogJS](#2-file-based-routing-in-analogjs)
- [3. Routen definieren in AnalogJS](#3-routen-definieren-in-analogjs)
  - [3.1 Definieren von Index-Routen](#31-definieren-von-index-routen)
  - [3.2 Definieren von statischen Routen in AnalogJS](#32-definieren-von-statischen-routen-in-analogjs)
  - [3.3 Hinweise zu verschachtelten Routen](#33-hinweise-zu-verschachtelten-routen)
  - [3.4 Definieren von dynamischen Routen in AnalogJS](#34-definieren-von-dynamischen-routen-in-analogjs)
- [4. Übergeordnete und Untergeordnete Routen mit dynamischen Parametern (Eltern-Kind-Prinzip)](#4-übergeordnete-und-untergeordnete-routen-mit-dynamischen-parametern-eltern-kind-prinzip)
- [5. Routen von Metadaten](#5-routen-von-metadaten)
  - [5.1 `RouteMeta`-Typ](#51-routemeta-typ)
  - [5.2 Redirects und Meta-Eigenschaften](#52-redirects-und-meta-eigenschaften)
- [6. Catch-All-Routen](#6-catch-all-routen)
- [7. Markdown als Routen](#7-markdown-als-routen)
  - [7.1 Content Routen definieren](#71-content-routen-definieren)
  - [7.2 Content Dateien definieren](#72-content-dateien-definieren)
    - [7.2.1 Markdown-Dateien injektieren](#721-markdown-dateien-injektieren)
    - [7.2.2 Markdown-Inhalte injektieren](#722-markdown-inhalte-injektieren)
- [8. API-Routen](#8-api-routen)
  - [8.1 Datenbanken und API-Routen](#81-datenbanken-und-api-routen)
    - [8.1.1 Beispiel 1](#811-beispiel-1)
    - [8.1.2 Beispiel 2](#812-beispiel-2)
  - [8.2 API-Schnittstelle](#82-api-schnittstelle)
- [9. Form Actions](#9-form-actions)
  - [9.1 Formvalidierung für eine Newsletteranmeldung](#91-formvalidierung-für-eine-newsletteranmeldung) 
  - [9.2 GET-Requests](#92-get-requests) 
  - [9.3 Grenzen von FormActions](#93-grenzen-von-formactions)
- [10. Static Site Generation (SSG) und Server Side Rendering (SSR)](#10-static-site-generation-ssg-und-server-side-rendering-ssr)
  - [10.1 SSG/SSR: Pre-Rendering von Routen](#101-ssgssr-pre-rendering-von-routen)
    - [10.1.1 Pre-Renderen nur von statischen Seiten](#1011-pre-renderen-nur-von-statischen-seiten)
  - [10.2 SSR abschalten](#102-ssr-abschalten)
  - [10.3 Hybrides Rendering für Client-Only-Routen](#103-hybrides-rendering-für-client-only-routen)
- [11. Fazit](#11-fazit)
  - [11.1 Stärken von AnalogJS](#111-stärken-von-analogjs)
  - [11.2 Schwächen von AnalogJS](#112-schwächen-von-analogjs)


## 1. Projekt


### 1.1 Projekt Setup

Für die genaueren Details, wie das Projekt mit analogJS und Prisma aufgesetzt werden soll, den Hinweisen [hier](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/README.md) folgen.


### 1.2 Projekt Struktur

```bash
src/
├── app/
│   ├── models/
│   │   └── post.ts
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── [slug].page.ts]
│   │   │   ├── blog.page.css
│   │   │   └── index.page.ts
│   │   ├── [...page-not-found].page.ts
│   │   ├── about.md
│   │   ├── blog.page.ts
│   │   ├── index.page.ts
│   │   ├── landing.page.css
│   │   ├── landing.page.ts
│   │   ├── newsletter.page.ts
│   │   ├── newsletter.server.ts
│   │   ├── parameter.[slug].page.ts
│   │   ├── todo.page.css
│   │   ├── todo.page.ts
│   │   └── todo.server.ts
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.server.ts
│   ├── app.config.ts
│   └── todo.services.ts
├── content/
│   ├── die-bedeutung-von-lebenslangem-lernen.md
│   ├── die-bedeutung-von-mentoring.md
│   ├── die-bedeutung-von-netzwerken.md
│   ├── die-bedeutung-von-selbstreflexion.md
│   ├── die-kunst-der-work-life-balance.md
│   ├── meine-erfahrungen-mit-projekt.md
│   ├── meine-leidenschaft-fuer-hobby.md
│   ├── meine-reise-durch-die-welt-des-berufsfeld.md
│   ├── meine-reise-durch-reiseziel.md
│   └── meine-ziele-fuer-die-zukunft.md
└── server/
    └── routes/
        └── api/
            ├── todos/ 
            │   ├── (delete)/
            │   │   └── [id].delete.ts
            │   ├── (get)/
            │   │   ├── [id].get.ts
            │   │   └── index.get.ts
            │   ├── (post)/
            │   │   └── index.post.ts
            │   ├── (put)/
            │   │   └── index.put.ts
            │   └── default/
            │       └── index.get.ts
            ├── main.server.ts
            ├── main.ts
            ├── styles.css
            ├── test-setup.ts
            └── vite-env.d.ts
```


## 2. File Based Routing in AnalogJS

Für das file-based Routing muss die `provideFileRouter()`-Funktion in dem `providers`-Array in [`app.config.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/app.config.ts) hinzugefügt werden, beim Starten der Anwendung.

```TypeScript
// src/app/app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
  ],
};
```

Alle Seiten werden als Routen definiert. Dies erfolgt über die `.page.ts`-Dateiendung im [`/src/app/pages`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/app/pages)-Ordner und nur die Dateien mit diesen Endung werden als Routen erstellt.

Es muss die `standalone: true`-Eigenschaft im `@Component-Dekorator` verwendet werden, da AnalogJS das file-based Routing nur damit unterstützen kann.

Danach sind alle Routen über ihren Dateinamen erreichbar. Das file-based Routing ermöglicht es nur auf das Konfigurieren von Routen zu verzichten, ansonsten gibt es keine Abweichungen, davon, wie eine Angular Anwendung erstellt wird.

[`index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/index.page.ts) stellt dabei die Index Route dar, die unter [localhost:5173/](http://localhost:5173/) erreichbar ist.


## 3. Routen definieren in AnalogJS


### 3.1 Definieren von Index-Routen

Index-Routen werden über einfache Klammern im Ordner- bzw. Dateinamen definiert.

So definiert z. B. `src/app/pages/(home).page.ts` die Index-Route `/`.

Ein Beispiel für solche Index-Routen in der Anwendung, sind sämtliche Routen im [`src/server/routes/api/todos`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api/todos)-Verzeichnis, die HTTP-Methoden darstellen. Dies vereinfacht die Aufrufe dieser Methoden bei HTTP-Anfragen.


### 3.2 Definieren von statischen Routen in analogJS

Ein Beispiel für eine statische Route ist die [`landing.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/landing.page.ts)-Seite. Diese nimmt keine dynamischen Werte an und stellt eine simple Landing Page dar.
Dementsprechend reicht es einfach diese Datei im [`/src/app/pages`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/app/pages)-Ordner zu erstellen und über [localhost:5173/landing](http://localhost:5173/landing) zu erreichen.

```TypeScript
// src/app/pages/landing.page.ts
import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TodoService, Todo } from "../todo.services";
import { HttpClient } from '@angular/common/http';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
        <h1>Landing Page</h1>

        <a routerLink="/blog">Blogs</a>
        <a routerLink="/todo">Todos</a>
        <a routerLink="/about">About Me</a>

        <button routerLink="/newsletter">Signup to the Newsletter</button>

        <router-outlet />
    `,
    styles: [`
        @import 'landing.page.css';
    `]
})
export default class LandingPage {
    //...
}
```

Bei statischen Routen reicht es einfach den Dateiname als Pfad der Route zu verwenden.


### 3.3 Hinweise zu verschachtelten Routen

Es lassen sich auch verschachtelte statische, sowie dynamische Routen auf zwei Arten definieren: 
- Über Router-Dateien in Ordnern, z. B. `src/app/pages/about/team.page.ts` 
- oder über Punktnotation im Dateinamen `src/app/pages/about.team.page.ts` 
Beide Varianten führen zum selben Ziel, einer `/about/team`-Route.

Ein Beispiel für solche verschachtelte Routen in der Anwendung, die mit der Punktnotation arbeiten, sind sämtliche Routen im [`src/server/routes/api/todos`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api/todos)-Verzeichnis. Wobei anzumerken ist, dass es sich um eine Kombination aus beiden Varianten handelt und es sich bei diesen Routen nicht um statische sondern dynamische Routen handelt.


### 3.4 Definieren von dynamischen Routen in analogJS

Wenn man eine Seite erstellen möchte, die dynamische Parameter oder Ähnliches verwendet, kann man, wie bei den statischen auf flache Routen zurückgreifen, oder ebenso auf verschachtelte Routen zurückgreifen.

Ein solches Beispiel ist [`parameter.[slug].page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/parameter.%5Bslug%5D.page.ts). `[slug]` repräsentiert hierbei einen beliebigen Wert, der als Parameter angenommen wird.

```TypeScript
// src/app/pages/parameter.[slug].page.ts
@Component({
  selector: "dynamic-parameter",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h1>Dynamic Parameter</h1>

    {{ slug$ | async }}
  `
})
export default class DynamicParameterPageComponent {
  route = inject(ActivatedRoute);
  slug$ = this.route.paramMap.pipe(map(params => params.get("slug")));
}
```

Diese Seite nimmt einen beliebigen Wert an und zeigt diesen auf der Seite an, sie kann z. B. über [localhost:5173/parameter/1](http://localhost:5173/parameter/1) erreicht werden und dann wird auf der Seite `1` angezeigt.

![IMG_localhost:5173/parameter/1](https://drive.google.com/uc?export=view&id=1oiUP6Sb_LvajG-rTFcJYy0RDukaDIYaD)


## 4. Übergeordnete und Untergeordnete Routen mit dynamischen Parametern (Eltern-Kind-Prinzip)

Diese werden auch als Layout-Routen bezeichnet. Hierfür wird eine übergeordnete Seite benötigt, in diesem Fall die [`blog.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog.page.ts):

```TypeScript
// src/app/pages/blog.page.ts
import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
        <h1 class="page-title">Blog</h1>

        <a class="menu-panel-active">Blogs</a>
        <a routerLink="/todo" class="menu-panel">Todos</a>
        <a routerLink="/about" class="menu-panel">About Me</a>

        <router-outlet />
    `,
})
export default class BlogPage {}
```

Diese Seite stellt das übergeordnete Elternelement dar, welches für die verschachtelte Funktion den `RouterOutlet` von `@angular/router`importiert und das `<router-outlet />`-Element im Template nutzt, um die Kinderrouten anzuzeigen, oder eine Menge von Kinderrouten anzuzeigen.

Alle untergeordneten Routen müssen sich in einem Ordner befinden, der den selben Namen hat, wie die übergeordnete Route.

Wenn zu [localhost:5173/blog](http://localhost:5173/blog) navigiert wird, wird dieser Inhalt angezeigt (hier eine simple Navigationsleiste) und das `<router-outlet />`-Element navigiert sofort zur [`/blog/index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/index.page.ts)-Seite (Hier eine Liste aller existierenden Blogeinträge), die als neue Index-Seite der Kinderrouten fungiert und diese verschachtelt auf der Elternseite neben dessen Inhalten anzeigt.

```TypeScript
// src/app/pages/blog/index.page.ts
import { Component } from "@angular/core";
import { NgFor } from "@angular/common";
import { injectContentFiles } from "@analogjs/content";
import { RouterLink } from "@angular/router";

import { BlogPost } from "src/app/models/post";

@Component({
    standalone: true,
    imports: [NgFor, RouterLink],
    template:`
        <h2>Posts</h2>

        <ul>
            <div class="blog-posts" *ngFor="let post of posts">
                <h3 class="blog-entry-element" [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</h3>
                <p [routerLink]="['/blog', post.slug]">{{ post.attributes.description }}</p>
            </div>
        </ul>
    `,
    styles: [`
        @import 'blog.page.css';
    `]
})
export default class IndexPage {
  // ...
}
```

![IMG_localhost:5173/blog](https://drive.google.com/uc?export=view&id=1VjMThPP15z5EzVzyFJcRHa_0dwUIe_VR)

Sollte man auf einen der Blogeinträge klicken, wird die aktuelle untergeordnete Route mit einer dynamischen Route [`[slug].page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/%5Bslug%5D.page.ts) ersetzt, die den Inhalt des ausgewählten Blogeintrags anzeigt.

```TypeScript
// src/app/pages/blog/[slug].page.ts
import { MarkdownComponent, injectContent } from "@analogjs/content";

@Component({
    standalone: true,
    imports: [MarkdownComponent, CommonModule, AsyncPipe, FormsModule],
    template: `
        <div *ngIf="post$ | async as post">
            <h2>{{ post.attributes.title }}</h2>
            <h3>{{ post.attributes.description }}</h3>

            <div *ngIf="todos.length > 0">
                <div class="todo-widget">
                    <h3 class="todo-widget-element">Todos:</h3>
                    <p class="todo-widget-element" *ngFor="let todo of todos">
                        {{ todo.title }} - {{ todo.description }}
                        <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
                    </p>
                </div>
            </div>

            <analog-markdown [content]="post.content" />
        </div>
    `,
    styles: [`
        @import 'blog.page.css';
    `]
})
export default class BlogPostPage {
  // ...
}
```

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=1BnQzzawInXUcIVbR93VkO6-G6N36JPnP)


## 5. Routen von Metadaten


### 5.1 `RouteMeta`-Typ

Zusätzliche Metadaten können für jede Route mit dem `RouteMeta`-Typ definiert werden, wie Seitentitel, Guards, Resolver, Provider usw.

```TypeScript
import { RouterOutlet } from "@angular/router";

export const routeMeta: RouteMeta = {
  title: 'About Analog',
  canActivate: [() => true],
  providers: [AboutService],
};
```

### 5.2 Redirects und Meta-Eigenschaften
Ebenfalls sind mit dem Typ `RouteMeta` redirect Routes möglich, die sofort zur Zielroute wechseln. Hierfür sind die Eigenschaften `redirectTo` und `pathMatch` zuständig. In dieser Anwendung wird eine solche redirectRoute in [`index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/index.page.ts) angewendet.

```TypeScript
// src/app/pages/index.page.ts
import { RouteMeta } from "@analogjs/router";

export const routeMeta: RouteMeta = {
  redirectTo: '/landing',
  pathMatch: 'full',
}
```

Dies leitet den Nutzer von der Route `/` zur Route `/landing` weiter.

Ansonsten gibt es noch die `Meta`-Eigenschaft, die ein `RouteMeta`-Typ hat, um eine Liste von Meta-Tags für jede Route zu definieren.

```TypeScript
export const routeMeta: RouteMeta = {
  title: 'Refresh every 30 sec',
  meta: [
    {
      httpEquiv: 'refresh',
      content: '30',
    },
  ],
};
```

Dieses Beispiel würde den Browser dazu auffordern alle 30 Sekunden einen Refresh durchzuführen.


## 6. Catch-All-Routen

Catch-All-Routen werden definiert, indem der Dateiname als Routenpfad verwendet wird, wobei drei Punkte in eckigen Klammern vorangestellt werden.

Die Beispielroute unten in [`[...page-not-found].page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/%5B...page-not-found%5D.page.ts) definiert eine Platzhalter-Route (wildcard `**`-Route). Diese Route wird typischerweise für 404-Seiten verwendet.

Die eckigen Klammern zeigen an, dass die Route dynamisch ist. Der Ausdruck `[...page-not-found]` wird als Parameter behandelt, und die Auslassungspunkte `(...)` zeigen an, dass die Route jeden Pfad abdecken soll, der nicht von anderen Routen erfasst wurde. Durch das Erstellen dieser oder einer ähnlichen Catch-All-Route kann sichergestellt werden, dass deine Anwendung undefinierte Routen elegant behandelt, was zu einer besseren Benutzererfahrung führt.

```TypeScript
// src/app/pages/[...page-not-found].page.ts
import { RouteMeta } from "@analogjs/router";
import { injectResponse } from "@analogjs/router/tokens";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

export const routeMeta: RouteMeta = {
  title: 'Page Not Found',
  canActivate: [
    () => {
      const response = injectResponse();
      if (import.meta.env.SSR && response) {
        response.statusCode = 404;
        response.end();
      }
      return true;
    }
  ]
};

@Component({
    standalone: true,
    imports: [RouterLink],
    template: `
        <h1>Page not found</h1>

        <a routerLink="/">Home</a>
    `,
})
export default class PageNotFoundPage {}
```

Dies ist ein simples Beispiel für eine `404-Seite`, die in der `RouteMeta` einen `404`-Statuscode an den Server sendet. 


## 7. Markdown als Routen

### 7.1 Content Routen definieren

AnalogJS unterstützt die Verwendung von Content-Routen, bei denen Markdown-Inhalte als Routen definiert werden können.

Dafür muss die `withMarkdownRenderer()`-Funktion in der `provideContent()`-Funktion dem `providers`-Array in [`app.config.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/app.config.ts) hinzugefügt werden, wenn die Anwendung gestartet wird.

```TypeScript
// src/app/app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
  ],
};
```

Dies ermöglicht es, dass [`src/app/pages/about.md`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/about.md) als Route definiert wird und in [localhost:5173/about](http://localhost:5173/about) als solche angezeigt wird.

![IMG_localhost:5173/about](https://drive.google.com/uc?export=view&id=188ezG6VevOVcRFMehJKgUCVvT0BQSwhA)


### 7.2 Content Dateien definieren

Für mehr Flexibilität Befinden sich alle Blogeinträge dieser Anwendung als Content Daten im [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner hinterlegen.

Diese sind alle gleich aufgebaut mit einer Frontmatter und dem eigentlichen Inhalt.

```markdown
<!-- src/content/die-bedeutung-von-lebenslangem-lernen.md -->
---
title: Die Bedeutung von lebenslangem Lernen
description: In diesem Blog-Eintrag teile ich  meine Gedanken über die Bedeutung von lebenslangem Lernen und wie es  mein Leben bereichert hat.
[slug]: die-bedeutung-von-lebenslangem-lernen
---

<img src="/content/img_die_bedeutung_von_lebenslangem_lernen.jpg" alt="img_die_bedeutung_von_lebenslangem_lernen" width="300" />

*Image gnerated by Le Chat - Mistral AI*

Ich habe immer geglaubt, dass Lernen ein  lebenslanger Prozess ist. In diesem Beitrag erzähle ich von meinen  Erfahrungen mit verschiedenen Lernmethoden und wie sie mir geholfen  haben, mich persönlich und beruflich weiterzuentwickeln. Ich teile auch  einige Tipps, wie man das Lernen in den Alltag integrieren kann.  Lebenslanges Lernen hat mir nicht nur neue Fähigkeiten gebracht, sondern auch mein Selbstvertrauen gestärkt und mir geholfen, mich an neue  Herausforderungen anzupassen. Ich habe gelernt, dass es nie zu spät ist, etwas Neues zu lernen, und dass jeder Tag eine neue Gelegenheit bietet, sich weiterzuentwickeln. Ich ermutige jeden, sich Zeit für das Lernen  zu nehmen und die vielen Ressourcen zu nutzen, die uns heute zur  Verfügung stehen.

*Content generated by Le Chat - Mistral AI*
```

#### 7.2.1 Markdown-Dateien injektieren

Diese Inhalte werden in dieser Anwendung an zwei Stellen zugegriffen. Einmal in [`blog/index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/index.page.ts), in dem über `injectContentFiles<BlogPost>()`, bereitgestellt von `@analogjs/content`, eine Liste aller Blogeinträge aus dem [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner als Liste extrahiert werden.

```TypeScript
// src/app/pages/blog/index.page.ts
import { Component } from "@angular/core";
import { NgFor } from "@angular/common";
import { injectContentFiles } from "@analogjs/content";
import { RouterLink } from "@angular/router";

import { BlogPost } from "src/app/models/post";

@Component({
    standalone: true,
    imports: [NgFor, RouterLink],
    template:`
        <h2>Posts</h2>

        <ul>
            <div class="blog-posts" *ngFor="let post of posts">
                <h3 class="blog-entry-element" [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</h3>
                <p [routerLink]="['/blog', post.slug]">{{ post.attributes.description }}</p>
            </div>
        </ul>
    `,
    styles: [`
        @import 'blog.page.css';
    `]
})
export default class IndexPage {
  posts = injectContentFiles<BlogPost>();
  // ...
}
```

Diese Funktion extrahiert die Frontmatter aus der Markdown-Datei und ordnet sie dem [`BlogPost`]( https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/models/post.ts)-Interface zu.

```TypeScript
// src/app/models/post.ts
export interface BlogPost {
    title: string;
    description: string;
    slug: string;
}
```

![IMG_localhost:5173/blog](https://drive.google.com/uc?export=view&id=1iMhdCmAw00CMiND8HnwvEzto2e0BK1Gy)


#### 7.2.2 Markdown-Inhalte injektieren

Der zweite Zugriff auf den [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner passiert in [`blog/[slug].page.ts `](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/%5Bslug%5D.page.ts) über `injectContent<BlogPost>()`, ebenfalls bereitgestellt von `@analogjs/content`. Doch diesmal wird eine explizite Markdown-Datei, anhand des `[slug]`-Parameters ausgewählt und auf das [`BlogPost`]( https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/models/post.ts)-Interface gemapped. Der Inhalt der Markdown-Datei wird über `<analog-markdown [content]="post.content" />` angezeigt.

```TypeScript
// src/app/pages/blog/[slug].page.ts
import { TodoService, Todo } from './../../todo.services';
import { MarkdownComponent, injectContent } from "@analogjs/content";
import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { BlogPost } from 'src/app/models/post';

@Component({
    standalone: true,
    imports: [MarkdownComponent, CommonModule, AsyncPipe, FormsModule],
    template: `
        <div *ngIf="post$ | async as post">
            <h2>{{ post.attributes.title }}</h2>
            <h3>{{ post.attributes.description }}</h3>

            <div *ngIf="todos.length > 0">
                <div class="todo-widget">
                    <h3 class="todo-widget-element">Todos:</h3>
                    <p class="todo-widget-element" *ngFor="let todo of todos">
                        {{ todo.title }} - {{ todo.description }}
                        <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
                    </p>
                </div>
            </div>

            <analog-markdown [content]="post.content" />
        </div>
    `,
    styles: [`
        @import 'blog.page.css';
    `]
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>();
  // ...
}
```

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=15krF4z3WMf0CRRyjeoCS9wZVGziQnDet)


## 8. API-Routen

AnalogJS unterstützt auch API-Routen, die verwendet werden können, um Daten und Inhalte für die Anwendung bereitzustellen.

Diese API-Routen werden im Verzeichnis [`src/server/routes/api`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api) definiert und basieren ebenfalls auf dem Prinzip des file-based Routing. Sie sind unter dem Präfix `/api` verfügbar.

Hier lassen sich viele APIs implementieren, darunter XML-Inhalte, Catch-All-Routen, Fehlerbehandlung, Cookies oder Datenbanken. Falls nötig, kann auch NextJS integriert werden. Diese laufen alle auf dem Server, ohne dass ein zusätzlicher Serverprozess gestartet werden muss. Diese Routen sind unter dem Präfix `/api` verfügbar. Weitere Informationen und Beispiele gibt es in den [AnalogJS Dokumentationen](https://analogjs.org/docs/features/api/overview).

Für die Handhabung der Todos in der Anwendung wird ein einfaches Schema mit [PrismaDB](https://www.prisma.io/) implementiert.


### 8.1 Datenbanken und API-Routen

Für die Handbabung von den Todos in der Anwendung wird ein simples Schema mit PrismaDB implementiert unter [`schema.prisma`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/prisma/schema.prisma)

```TypeScript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Todo {
  id          Int     @id @default(autoincrement())
  title       String
  description String
  linkedBlog  String
  done        Boolean @default(false)

  @@index([linkedBlog])
}
```

Alle Datenbankzugriffe erfolgen über die API-Routen in [`src/server/routes/api/todos`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api/todos), wobei jede dieser Routen entsprechende HTTP-Methoden implementiert.

```bash
src/
└── server/
    └── routes/
        └── api/
            └── todos/ 
                ├── (delete)/
                │   └── [id].delete.ts
                ├── (get)/
                │   ├── [id].get.ts
                │   └── index.get.ts
                ├── (post)/
                │   └── index.post.ts
                └── (put)/
                    └── index.put.ts
```

Zum Beispiel [`todos/(get)/index.get.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/server/routes/api/todos/(get)/index.get.ts):

```TypeScript
// src/server/routes/api/todos/(get)/index.get.ts
import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const todos = await prisma.todo.findMany();
  return todos;
});
```

Auf alle diese Routen wird über einen Service in [`todo.services.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/todo.services.ts) zugegriffen, der der Anwendung diese Funktionen zur Verfügung stellt.

```TypeScript
// src/app/todo.services.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Todo {
  id: number;
  title: string;
  description: string;
  linkedBlog: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = '/api/todos';
  private http = inject(HttpClient);

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  getById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/${id}`);
  }

  create(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}`, todo);
  }

  update(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}`, todo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```


#### 8.1.1 Beispiel 1

Die Seite [`todo.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/todo.page.ts) nutzt diese Services in der Anwendung zur Handhabung von Todos. Hier können die einzelnen Todos angezeigt, bearbeitet und gelöscht werden. Neue Todos können erstellt und als abgeschlossen markiert werden.

```TypeScript
// src/app/pages/todo.page.ts
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TodoService, Todo } from "../todo.services";
import { FormsModule } from '@angular/forms';
import { injectContentFiles } from '@analogjs/content';
import { BlogPost } from '../models/post';
import { Router } from '@angular/router';
import { FormAction } from '@analogjs/router';

type FormErrors =
  | {
      title?: string;
      description?: string;
    }
  | undefined;

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, FormAction],
    template: `
      <h1 class="page-title">Todos</h1>

      <a routerLink="/blog" class="menu-panel">Blogs</a>
      <a class="menu-panel-active">Todos</a>
      <a routerLink="/about" class="menu-panel">About Me</a>

      <div class="buttons">
        <button class="open-button" (click)="openTodoCreation()" [class.hidden]="creatingNewTodo">Create new Todo</button>
        <button *ngIf="!creatingNewTodo" (click)="switchTodoEditOptions(true)" [class.hidden]="editingTodos">Edit Todos</button>
        <button (click)="switchTodoEditOptions(false)" [class.hidden]="!editingTodos">Done</button>
      </div>

      <div class="input-class">
        <form
          *ngIf="creatingNewTodo"
          method="post"
          (onSuccess)="onSuccess()"
          (onError)="onError($any($event))"
          (onStateChanges)="newTodoErrors.set(undefined)"
        >
          <h2>Create a new Todo</h2>

          <label for="title">Todo Title</label>
          <input type="text" id="title" name="title" [(ngModel)]="title" required autocomplete="off"/>

          <label for="description">Todo Description</label>
          <input type="text" id="description" name="description" [(ngModel)]="description" required autocomplete="off"/>

          <label for="linkedBlog">Todo Description</label>
          <select id="linkedBlog" name="linkedBlog" [(ngModel)]="linkedBlog">
            <option value="" disabled selected>Select a Blog entry for this Todo</option>
            <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
          </select>

          <button class="submit-class" type="submit">Add new Todo</button>
          <button class="submit-class" (click)="resetForms()">Cancel</button>
        </form>

        @if (newTodoErrors()?.title) {
          <p>{{ newTodoErrors()?.title }}</p>
        }
        @if (newTodoErrors()?.description) {
          <p>{{ newTodoErrors()?.description }}</p>
        }
      </div>

      <div class="todos">
        <div *ngFor="let todo of todos">
          <div class="todo-element" *ngIf="!editingSingelTodo || editingSingelTodo && currentlyEditedTodo !== todo.id">
            <span>{{ todo.title }} – {{ todo.description }}</span>
            <div class="todo-actions">
              <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
              <button *ngIf="editingTodos" (click)="openEditTodo(todo)">🖊</button>
              <button *ngIf="editingTodos" (click)="deleteTodo(todo.id)">⛔</button>
            </div>
          </div>

          <div *ngIf="editingSingelTodo && currentlyEditedTodo === todo.id">
            <div class="input-class">
              <h2>Edit Todo {{ todo.title }}</h2>

              <form method="post">
                <label for="title">Todo Title</label>
                <input type="text" id="title" name="title" [(ngModel)]="title" required autocomplete="off"/>

                <label for="description">Todo Description</label>
                <input type="text" id="description" name="description" [(ngModel)]="description" required autocomplete="off"/>

                <label for="linkedBlog">Linked Blog Entry for this Todo</label>
                <select id="linkedBlog" name="linkedBlog" [(ngModel)]="linkedBlog">
                  <option value="" disabled selected>Select a Blog entry for this Todo</option>
                  <option *ngFor="let option of options" [value]="option.value">{{ option.label }}</option>
                </select>

                <div class="edit-actions">
                  <label [for]="todo.id">Todo Done</label>
                  <div>
                    <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
                    <button type="submit" (click)="editTodoFinal(todo, false)" [disabled]="!isFormValid()">Save</button>
                    <button (click)="editTodoFinal(todo, true)">Cancel</button>
                    <button (click)="deleteTodo(todo.id)">⛔</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <router-outlet />
    `,
    styles: [`
      @import 'todo.page.css';
    `],
})
export default class TodoPage {
  private todoService = inject(TodoService);
  todos: Todo[] = [];

  creatingNewTodo: boolean = false;
  editingTodos: boolean = false;
  editingSingelTodo: boolean = false;
  currentlyEditedTodo: number = 0;

  title: string = '';
  description: string = '';
  linkedBlog: string = '';

  posts = injectContentFiles<BlogPost>();
  options: { value: string; label: string }[] = [];

  constructor(private router: Router) {
    this.loadTodos();
    this.loadBlogPosts();
  }
  //...
  editTodoFinal(todo: Todo, cancel: boolean) {
    this.editingSingelTodo = false;
    console.log("ji");
    if (cancel) {
      this.resetForms();
      return;
    }

    const updatedTodo = {
      id: todo.id,
      title: this.title,
      description: this.description,
      linkedBlog: this.linkedBlog,
      done: todo.done
    }

    this.updateTodo(updatedTodo);
    this.resetForms();
  }

  addTodoFromInput() {
    const newTodo = {
      title: this.title,
      description: this.description,
      linkedBlog: this.linkedBlog,
      done: false,
    };

    this.todoService.create(newTodo).subscribe({
      next: (createdTodo) => {
        this.todos.push(createdTodo);
      },
      error: (err) => console.error('Could not create new todo:', err),
    });

    this.resetForms();
  }

  updateTodo(todo: Todo) {
    const todoToUpdate = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      linkedBlog: todo.linkedBlog,
      done: todo.done
    }

    this.todoService.update(todoToUpdate).subscribe({
      next: (updatedTodo) => {
        console.log('Todo updated successfully:', updatedTodo);
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (err) => {
        console.error('Error updating Todo:', err);
        const originalTodo = this.todos.find(t => t.id === todo.id);
        if (originalTodo) {
          todo.done = originalTodo.done;
        }
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService.delete(id).subscribe({
      next: () => {
        console.log('Todo successfully deleted');
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete todo', err);
        let errorMessage = 'Failed to delete todo. Please try again.';

        if (err.status === 404) {
          errorMessage = 'Todo not found.';
        } else if (err.status === 400) {
          errorMessage = 'Invalid todo ID.';
        }

        alert(errorMessage);
      }
    });
  }
  //...
}
```

  TODO: BESCHREIBUNG DER ROUTE 

![IMG_localhost:5173/todo](https://drive.google.com/uc?export=view&id=1UGTztLaLUTK2ktdahoVW8gVn0afcxFSl)


#### 8.1.2 Beispiel 2

Auch in den einzelnen Blogeinträgen in [[slug].page.ts](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/%5Bslug%5D.page.ts) wird auf diese Todos zugegriffen. Hier werden jedoch nur die Todos angezeigt, die eine Verknüpfung zu diesem Blogeintrag haben.

```TypeScript
// src/app/pages/blog/[slug].page.ts
import { TodoService, Todo } from './../../todo.services';
import { MarkdownComponent, injectContent } from "@analogjs/content";
import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { BlogPost } from 'src/app/models/post';

@Component({
    standalone: true,
    imports: [MarkdownComponent, CommonModule, AsyncPipe, FormsModule],
    template: `
        <div *ngIf="post$ | async as post">
            <h2>{{ post.attributes.title }}</h2>
            <h3>{{ post.attributes.description }}</h3>

            <div *ngIf="todos.length > 0">
                <div class="todo-widget">
                    <h3 class="todo-widget-element">Todos:</h3>
                    <p class="todo-widget-element" *ngFor="let todo of todos">
                        {{ todo.title }} - {{ todo.description }}
                        <input type="checkbox" [id]="todo.id" [name]="'done-' + todo.title" [(ngModel)]="todo.done" (change)="updateTodo(todo)"/>
                    </p>
                </div>
            </div>

            <analog-markdown [content]="post.content" />
        </div>
    `,
    styles: [`
        @import 'blog.page.css';
    `]
})
export default class BlogPostPage {
  post$ = injectContent<BlogPost>();
  private todoService = inject(TodoService);
  todos: Todo[] = [];

  constructor() {
    this.post$.pipe(
      finalize(() => console.log('Observable finalized or an error has occured.'))
    ).subscribe(post => {
      this.loadTodos(post.attributes.slug);
    });
  }

  updateTodo(todo: Todo) {
    const todoToUpdate = {
      id: todo.id,
      title: todo.title,
      description: todo.description,
      linkedBlog: todo.linkedBlog,
      done: todo.done
    }

    this.todoService.update(todoToUpdate).subscribe({
      next: (updatedTodo) => {
        console.log('Todo updated successfully:', updatedTodo);
        const index = this.todos.findIndex(t => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (err) => {
        console.error('Error updating Todo:', err);
        const originalTodo = this.todos.find(t => t.id === todo.id);
        if (originalTodo) {
          todo.done = originalTodo.done;
        }
      }
    });
  }

  loadTodos(blogTitle: string) {
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos = todos.filter(todo => todo.linkedBlog === blogTitle);

        console.log('Loaded todos:', this.todos);
      },
      error: (err) => {
        console.error('Could not load todos:', err);
        this.todos = [];
      }
    });
  }
}
```

  TODO: BESCHREIBUNG DER ROUTE 

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=15krF4z3WMf0CRRyjeoCS9wZVGziQnDet)


### 8.2 API-Schnittstelle

Alle diese Daten/Inhalte, dei auf dem Server gespeichert sind, sind unter der `/api`-Schnittstelle zu finden. So befinden sich die Daten der Datenbank zu dieser Anwendung unter [localhost:5173/api/todos](http://localhost:5173/api/todos), bzw. können diese dort betrachtet werden. 

Hier ein Ausschnitt:

```json
[
  {
    "id": 2,
    "title": "Mentoring-Programm starten",
    "description": "Ein Mentoring-Programm ins Leben rufen, um junge Fachkräfte in der [Berufsfeld]-Branche zu unterstützen.",
    "linkedBlog": "die-bedeutung-von-mentoring",
    "done": false
  },
  {
    "id": 3,
    "title": "Neue Lernressourcen recherchieren",
    "description": "Online nach neuen Büchern, Kursen und Artikeln suchen, die beim lebenslangen Lernen helfen können.",
    "linkedBlog": "die-bedeutung-von-lebenslangem-lernen",
    "done": false
  },
  {
    "id": 9,
    "title": "Neue Fähigkeiten erlernen",
    "description": "Einen Online-Kurs belegen, um neue Fähigkeiten in einem interessanten Bereich zu erlernen.",
    "linkedBlog": "",
    "done": false
  },
]
```


## 9. Form Actions

Um Formularübermittlungen zu handhaben oder zu validieren, kann die `FormAction`-Direktive von `@analogjs/router` verwendet werden. Die Direktive kümmert sich um das Sammeln der FormData und das Senden einer POST-Anfrage an den Server. 

Die Direktive gibt je nach Zustand des Formulars drei verschiedene Ereignisse aus.
- `onSuccess`, wenn das Formular auf dem Server verarbeitet wird und eine erfolgreiche Antwort zurückgibt.
- `onError`, wenn das Formular eine Fehlerantwort zurückgibt.
- `onStateChange`, wenn das Formular abgesendet wird.


### 9.1 Formvalidierung für eine Newsletteranmeldung

[`newsletter.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/newsletter.page.ts) stellt ein simples Beispiel für die Verwendung einer solchen FormAction dar, in der ein Formular zu einem Newsletter-Abo simuliert wird.
Zu finden unter [localhost:5173/landing](http://localhost:5173/landing) 

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=1YJS9NaRc2CQsVpBgb8vIDWsA7QDCUgcr)

```TypeScript
// src/app/pages/newsletter.page.ts
import { Component, signal } from '@angular/core';

import { FormAction } from '@analogjs/router';

type FormErrors =
  | {
      email?: string;
    }
  | undefined;

@Component({
  selector: 'app-newsletter-page',
  standalone: true,
  imports: [FormAction],
  template: `
    <h3>Newsletter Signup</h3>

    @if (!signedUp()) {
      <form method="post"
        (onSuccess)="onSuccess()"
        (onError)="onError($any($event))"
        (onStateChanges)="errors.set(undefined)"
      >
        <div>
          <label for="email"> Email </label>
          <input type="email" name="email" autocomplete="off" />
        </div>

        <button class="button" type="submit">Submit</button>
      </form>

      @if (errors()?.email) {
        <p>{{ errors()?.email }}</p>
      }
    } @else {
      <div>Thanks for signing up!</div>
    }
  `,
})
export default class NewsletterComponent {
  signedUp = signal(false);
  errors = signal<FormErrors>(undefined);

  onSuccess() {
    this.signedUp.set(true);
  }

  onError(result?: FormErrors) {
    this.errors.set(result);
  }
}
```

Die `FormAction`-Direktive übermittelt die Formulardaten an den Server, wo sie von einem Handler verarbeitet werden.
- `FormErrors`: ist ein benutzerdefinierter Typ mit einer `email`-Eigenschaft, die auch `undefined` sein kann, um Fehler im Zusammenhang mit der FormAction zu typisieren.
- `onSuccess`: Eine Methode, die aufgerufen wird, wenn das Formular erfolgreich übermittelt wurde. Sie setzt `signedUp` auf `true`.
- `onError`: Eine Methode, die aufgerufen wird, wenn ein Fehler bei der Übermittlung des Formulars auftritt. Sie setzt die `errors`-Signale mit den empfangenen Fehlern.

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=12fUc9c2pH6dTTRb0lIrKTTSoRvwilWMy)

Um die Formularaktion durchzuführen, muss eine `.server.ts`-Datei neben der `.page.ts`-Datei angelegt werden, die die asynchrone Aktionsfunktion zur Verarbeitung der Formularübermittlung enthält. In diesem Fall [newsletter.server.ts](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/newsletter.server.ts)

```TypeScript
// src/app/pages/newsletter.server.ts
import {
  type PageServerAction,
  json,
  fail,
  redirect,
} from '@analogjs/router/server/actions';
import { readFormData } from 'h3';

export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);
  const email = body.get('email') as string;

  if (!email) {
    return fail(422, { email: 'Email is required' });
  }

  // In the server action, you can use access environment variables, read cookies, and perform other server-side only operations.

  return json({ type: 'success' });
}
```

Es gibt drei verschiedene Antwortmöglichkeiten.
- `json` wird verwendet, um eine JSON-Antwort an den Client zu senden, wie im vorangegangenen Beispiel gezeigt.
- `redirect` wird verwendet, um nach erfolgreichem Absenden eines Formulars einen redirect auf einen andere Seite durchzuführen (`return redirect('/');`).
- `fail` wird verwendet, um Formularvalidierungsfehler an den Client zurückzugeben.

Wird zum Beispiel auf die Schaltfläche gedrückt, ohne dass eine valide E-Mail-Adresse eingegeben wird, dann wird der Fehlercode `422` mit der Nachricht `email: Email is required` gesendet.

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=1moFgGn4cl0hUXE2aX96CTMBGfc-JQwYp)

Wird jedoch eine valide E-Mail-Adresse eingegeben, dann wird ein `200`-Code vom Handler gesendet und eine Dankesnachricht angezeigt.

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=1cxKjYh-0UCVb_M5WcXDS9wahy2QKob9m)


### 9.2 GET-Requests

Es können auch `GET`-Requests verarbeitet werden. Der Rückgabewert könnte dann wie folgt aussehen, der eine Suchanfrage darstellt:

```TypeScript
return {
  loaded: true,
  searchTerm: `${query['search']}`,
};
```


### 9.3 Grenzen von FormActions

Zusätzlich zur `FormAction` für die Newsletteranmeldung wurde versucht, ein Validationsmodul mit Speicherfunktion für das Anlegen und Bearbeiten von Todos zu erstellen. Dies geschieht mit todo.server.ts [`todo.server.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/todo.server.ts).

```TypeScript
// src/app/pages/todo.server.ts
import {
  type PageServerAction,
  json,
  fail,
} from '@analogjs/router/server/actions';
import { readFormData } from 'h3';

export async function action({ event }: PageServerAction) {
  const body = await readFormData(event);
  const title = body.get('title') as string;
  const description = body.get('description') as string;
  const action = body.get('action') as string;

  if (!title) {
    return fail(422, { title: 'A title for a new Todo is required' });
  }

  if (!description) {
    return fail(422, { description: 'A description for a new Todo is required' });
  }

  return json({ type: 'success' });
}
```

Der Server sendet derzeit nur ein `fail` oder `success` zurück. Der Aufruf von [`todo.services.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/todo.services.ts) wird vom Element, das das Formular enthält, selbst gehandhabt.

Bei der Injektion von [`todo.services.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/todo.services.ts) über `inject` tritt folgender Fehler auf:

```bash
JIT compilation failed for injectable [class HttpClient]
```

Ein Workaround wäre ein direkter Datenbankzugriff, um die Operation durchzuführen. Dies ist jedoch aus Entwicklungssicht nicht ideal, da der Service eigentlich für solche Aufgaben vorgesehen ist.


## 10. Static Site Generation (SSG) und Server Side Rendering (SSR)

AnalogJS ermöglicht die Static Site Generation beim Deployment der Anwendung, insbesondere durch das Pre-Rendering von Routen zu statischen HTML-Dateien zusammen mit der clientseitigen Anwendung.


### 10.1 SSG/SSR: Pre-Rendering von Routen

Das Pre-Rendering kann in der [`vite.config.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/vite.config.ts) in der `prerender`-Eigenschaft konfiguriert werden, um die Seiten zur Build-Zeit zu rendern. Diese können auch asynchron bereitgestellt werden. 

Die `/`-Route ist standardmäßig vorgerendert, da es notwendig ist, eine gerenderte HTML-Seite zurückzugeben, wenn der Nutzer die Wurzel der Anwendung besucht. Beim Anpassen der Routen fürs pre-rendering muss die `/`-Route jedoch mit einbezogen werden.

Ebenfalls können Inhalte aus dem [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner zum Pre-Rendering hinzugefügt werden. Hierfür kann der `contentDir`-Wert verwendet werden, wie im Beispiel gezeigt.
Die Verzeichnisstruktur wird möglicherweise nicht 1:1 in den Pfaden der Anwendung widergespiegelt. Daher muss eine Transformationsfunktion übergeben werden, die die Dateipfade auf die URLs abbildet. Der zurückgegebene String sollte der URL-Pfad in der Anwendung sein.
Die Verwendung von `transform` ermöglicht es auch, bestimmte Routen herauszufiltern, indem `false` zurückgegeben wird.

```TypeScript
// vite.config.ts
import { defineConfig } from 'vite';
import analog, { type PrerenderContentFile } from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    analog({
      prerender: {
        routes: [
          '/',
          '/landing',
          '/newsletter',
          '/todo',
          '/about',
          '/blog',
          {
            contentDir: 'src/content/blog',
            transform: (file: PrerenderContentFile) => {
              const name = file.name;
              return `/blog/${name}`;
            },
          },
        ],
      },
    }),
  ],
}));
```

Ist das Pre-Rendering jedoch nicht gewünscht, kann einfach ein leeres Array für die Routen übergeben werden.

```TypeScript
// vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  //...
  plugins: [
    analog({
      ssr: true,
      prerender: {
        routes: async () => {
          return [];
        },
      },
    }),
  ],
}));
```


#### 10.1.1 Pre-Renderen nur von statischen Seiten

Wenn man nur die statischen Seiten pre-rendern möchte, ohne den Server zu bauen, sollte das `static`-Flag auf `true` gesetzt werden.

```TypeScript
// vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    analog({
      static: true,
      prerender: {
        routes: async () => [
          //...
        ],
      },
    }),
  ],
}));
```


### 10.2 SSR abschalten

AnalogJS unterstützt Server-Side Rendering sowohl während der Entwicklung als auch beim Erstellen für die Produktion. SSR ist in AnalogJS eher ein 'opt-out' als ein 'opt-in'. Sollte jedoch der Wunsch bestehen, SSR abzuschalten, kann dies in der [`vite.config.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/vite.config.ts) entsprechend angepasst werden.

```TypeScript
// vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  //... 
  plugins: [analog({ ssr: false })],
}));
```


### 10.3 Hybrides Rendering für Client-Only-Routen

Auch besteht die Möglichkeit für hybrides Rendering mit bestimmten Routen, die nur auf der Clientseite gerendert werden und nicht auf dem Server, indem man in den `routeRules` eine `ssr`-Option definiert.

```TypeScript
// vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // ...other config
  plugins: [
    analog({
      prerender: {
        routes: ['/', '/404.html'],
      },
      nitro: {
        routeRules: {
          '/404.html': { ssr: false },
        },
      },
    }),
  ],
}));
```

Hier wird zum Beispiel eine 404-Seite auf dem Client, als Sicherheit, gerendert.


## 11. Fazit

Nachdem die Grundlagen und Konzepte von AnalogJS präsentiert und an einem kleinen Beispiel demonstriert wurden, lässt sich ein eindeutiges Fazit ziehen.


### 11.1 Stärken von AnalogJS

Das Framework präsentiert eine gute Idee und größtenteils auch eine gute Umsetzung dieser. Besonders flüssig und einfach lässt sich mit dem File-based-Router arbeiten. Dennoch gibt es vereinzelt Schwierigkeiten mit AnalogJS, vor allem in Bezug auf die Server-Seite der Anwendung.

Das file-based-Routing funktioniert einwandfrei. Nachdem das Projekt mit AnalogJS aufgesetzt wurde und die nötigen Komponenten importiert sind, lässt sich eine Anwendung mit vielen Seiten/Routen sehr leicht aufbauen, ohne manuell Router-Module oder Ähnliches aufsetzen zu müssen. Ein einfacher `routerLink` reicht völlig aus.

Auch verschachtelte Routen lassen sich wesentlich leichter im Vergleich zu Angular implementieren. Es reicht aus, eine Ordner- bzw. Dateistruktur anzulegen, die diese Verschachtelung darstellt, und über ein `routerLink` untergeordnete Routen in einem `router-outlet` anzuzeigen.

Daneben gibt es auch noch die möglicherweise interessanteste Funktion des Routens von rohen Markdown-Dateien, die vollständig als eigenständige Route interpretiert werden können oder als untergeordnete Routen auch verschachtelt dargestellt werden können.

Markdown-Dateien können auch mit Metadaten ausgestattet werden und mit AnalogJS-Komponenten ausgelesen werden, teilweise auch ohne die Markdown-Inhalte selbst zu laden.

Auch die Möglichkeit des Routens von Metadaten kann einiges an Entwicklungsarbeit sparen.


Dass auf der Serverseite auch das file-based-Routing funktioniert, ist bei kleineren API-Aufrufen angenehm, neben der Tatsache, dass kein externer Server-Prozess gestartet werden muss, sondern alles auf `localhost:5713` läuft.


### 11.2 Schwächen von AnalogJS

Nichtsdestotrotz muss gesagt werden, dass AnalogJS ein Framework ist, das sich an eine sehr bestimmte Zielgruppe orientiert, nämlich die, die eine Blog-Anwendung (möglicherweise wie das hier vorgestellte Beispiel) erstellen möchte. Eine Anwendung, in der möglicherweise viel Content existiert, der im Markdown-Format vorliegt, und da ist die Einfachheit des file-based-Routings hervorragend. Allerdings ist das auch das Maximum, was das Framework hergibt.

Unter Umständen eignet sich AnalogJS auch für das Prototyping, wenn schnell ein Prototyp für eine App entwickelt werden muss, um einem potenziellen Kunden ein visuelles Beispiel zu geben, ohne damit in Produktion zu gehen. Die Umsetzung sollte dann jedoch mit Angular oder ähnlichem erfolgen.

Für größere bzw. komplexere Projekte ist AnalogJS momentan noch zu fehleranfällig.

Beim Entwickeln muss in manchen Browsern öfter der Cache geleert werden. Beim Beispiel der Datenbankzugriffe muss für jede einzelne HTTP-Methode eine eigene Datei/Route erstellt werden, was in einem Verzeichnisdiagramm zwar gut aussieht, aber in der Wartung des Codes einen immens höheren Arbeitsaufwand erfordert.

Auch gibt es zum Beispiel in diesem Projekt das Problem, dass sich der Build-Prozess nicht erfolgreich durchführen lässt, da Prisma, eigentlich eine gute Datenbankwahl für Angular, mit `CommonJS` kompiliert wird und AnalogJS mit Nitros `esbuild` von Vite kompiliert wird. Dies führt zu einem fatalen Fehler, der das gesamte Projekt lahmlegt.

```bash
TypeError [ERR_INVALID_MODULE_SPECIFIER]: Invalid module ".prisma" is not a valid package name imported from ...\@prisma\client\default.js
```

Hiernach sind Caches kaputt, und die Anwendung läuft nicht mal mehr korrekt mit `npm start` unter `localhost:5713`. Es bleibt nur noch der Rollback und Neuinstallation von Modulen.

Eine konkrete Lösung für dieses Problem habe ich noch nicht gefunden, da dies sehr viele Folgeschwierigkeiten nicht ausschließt.

Darum ist die Empfehlung, AnalogJS zu nutzen, wie schon bereits erwähnt, nur wenn sehr kleine und sehr einfache Projekte umgesetzt werden sollen, mit möglichst ohne bzw. mit sehr wenig Server-Logik.

Klar, man kann auf die Nitro-Server-Logik auch verzichten und Angular Services für die Server-Seite nutzen. Allerdings sollte man dann überlegen, ob man AnalogJS überhaupt benötigt, da damit die Vorteile von AnalogJS bzw. der Grund, warum man sich dafür entscheidet, zum größten Teil verloren gehen.
