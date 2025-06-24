
# Analog-Projektarbeit

## Analog
[Analog](https://analogjs.org/) ist ein Web-Framework, das auf Angular aufbaut. In dieser Arbeit wird ein Beispiel erstellt, das die Stärken und Schwächen von Analog zeigen soll.

### Features (Quelle: [Analog Website](https://analogjs.org))
Analog bietet folgende Funktionen:  

- **Vite-powered**: Analog verwendet Vite zum Bereitstellen und Erstellen sowie Vitest für Tests.  
- **Hybrid SSR/SSG support**: Unterstützt sowohl Server-Side Rendering (SSR) als auch Static Site Generation (SSG).  
- **File-based routing and API routes**: Nutzt dateibasierte Routen und unterstützt API-Routen für Angular-Anwendungen.  

Weitere Informationen in der [Analog Doku](https://analogjs.org/docs).

## Projekt Setup

Für die genaueren Details, wie das Projekt mit analogJS und Prisma aufgesetzt werden soll, den Hinweisen [hier](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/README.md) folgen.

## Projekt Struktur

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

# Routing in AnalogJS

## File Base Routing in AnalogJS

Für das file-based Routing muss die `provideFileRouter()`-Komponente in dem `providers`-Array in [`app.config.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/app.config.ts) hinzugefügt werden, wenn die Anwendung gestartet wird.

<pre>
<code>// src/app/app.config.ts
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideContent, withMarkdownRenderer } from '@analogjs/content';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    <mark>provideFileRouter()</mark>,
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
    provideClientHydration(),
    provideContent(withMarkdownRenderer()),
  ],
};</code>
</pre>


Alle Seiten werden darauf als Routen definiert. Dies erfolgt über die `.page.ts`-Dateiendung im [`/src/app/pages`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/app/pages)-Ordner und nur die Dateien mit diesen Endung werden als Routen erstellt.

Es muss die `standalone: true` Komponente im `@Component-Dekorator` verwendet werden, da analogJS das file-based Routing nur damit bereitstellen kann.

Danach sind alle Routen auch über den Namen, den diese haben erreichbar. Das file-based Routing ermöglicht es nur auf das Konfigurieren von Routen zu verzichten, ansonsten gibt es keine Abweichungen, davon, wie eine Angular Anwendung erstellt wird.

[`index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/index.page.ts) stellt dabei die Index Route dar, die unter [localhost:5173/](http://localhost:5173/) erreichbar ist.

# Routen definieren in analogJS

## Definieren von Index-Routen

Index-Routen werden über einfache Klammern im Datei-, bzw. Orndernamen definiert.

So definiert z. B. `src/app/pages/(home).page.ts` eine `/`-Route.

Ein Beispiel für solche Index-Routen in der Anwendung, sind sämtliche Routen im [`src/server/routes/api/todos`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api/todos)-Verzeichnis, die HTTP-Methoden darstellen. Dies verinfacht die Aufrufe dieser Methoden, bei HTTP-Anfragen.

## Definieren von statischen Routen in analogJS

Ein Beispiel für eine statische Route ist die [`landing.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/landing.page.ts)-Seite. Diese nimmt keine dynamischen Werte an und stellt eine simple Landing Page dar.
Dementsprechend reicht es einfach diese Datei im [`/src/app/pages`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/app/pages)-Ordner zu erstellen und über [localhost:5173/landing](http://localhost:5173/landing) zu erreichen.

```bash
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

## Hinweise zu verschachtelten Routen

Es lassen sich auch verschachtelte statische, sowie dynamische Routen auf zwei Arten definieren: 
- Über Router-Dateien in Ordnern, z. B. `src/app/pages/about/team.page.ts` 
- Ooder über Punktnotation im Dateinamen `src/app/pages/about.team.page.ts` 
Beide Varianten führen zum selben Ziel, einer `/about/team`-Route.

Ein Beispiel für solche verschachtelte Routen in der Anwendung, die mit der Punktnotation arbeiten, sind sämtliche Routen im [`src/server/routes/api/todos`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api/todos)-Verzeichnis. Wobei anzumerken ist, dass es sich um eine Kombination aus beiden Varianten handelt und es sich bei diesen Routen nicht um statische sondern dynmaiche Routen handelt.

## Definieren von dynamischen Routen in analogJS

Wenn man eine Seite erstellen möchte, die dynamische Parameter oder Ähnliches verwendet, kann man, wie bei den statischen auf flache Routen zurückgreifen, oder ebenfals auf verschachtelte Routen zurückgreifen.

Ein solches Beispiel ist [`parameter.[slug].page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/parameter.%5Bslug%5D.page.ts). `[slug]` repräsentiert hierbei einen belieben Wert, der als Parameter angenommen wird.

```bash
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

# Übergeordnete und Untergeordnete Routen mit dynamischen Parametern (Eltern-Kind-Prinzip)

Auch Layout Routes genannt. Hierfür wird eine übergeordnete Seite benötigt, hier die [`blog.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog.page.ts):

```bash
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

Diese Seite stellt das übergeordnete Elternelement dar, welches für die verschachtelte Funktion den `RouterOutlet` von `@angular/router`importiert und das `<router-outlet />`-Element im Template nutzt, um die Kinderrouten anzuzeigen, oder eine Menge von Kinderrouten.

Alle untergeordneten Routen müssen sich in einem Ordner befinden, der den selben Namen hat, wie die übergeordnete Route.

Sollte zu [localhost:5173/blog](http://localhost:5173/blog) navigiert werden, wird dieser Inhalt angezeigt (hier eine simple Navigationsleiste) und das `<router-outlet />`-Element navigiert sofort zur [`/blog/index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/index.page.ts)-Seite (Hier eine Liste aller Existierenden Blogeinträge), die die neue Index-Seite der Kinderrouten darstellt und diese verschachtelt auf der Elternseite neben dessen Inhalten anzeigt.

```bash
// src/app/pages/blog/index.page.t
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

Sollte man auf einen der Blogeinträge klicken, wird die aktuelle untergeordnete Route mit einer dynamischen Route [`[slug].page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/%5Bslug%5D.page.ts) ersetzt, die den Inhalt des angeklickten Blogeintrags anzeigt.

```bash
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

# Routen von Metadaten

Zusätzliche Metadaten können zu jeder Route mit dem `RouteMeta`-Typ definiert werden, wie Seitentitel, Guards, Resolver, Provider, etc.

```bash
import { RouterOutlet } from "@angular/router";

export const routeMeta: RouteMeta = {
  title: 'About Analog',
  canActivate: [() => true],
  providers: [AboutService],
};
```

Ebenfalls sind mit dem Typ `RouteMeta` redirect Routes möglich, die sofort auf die Ziel Route wechslen. Dafür sind die `redirectTo` und `pathMatch` Eigenschaften zuständig. In dieser Anwendung wird eine solche redirectRoute in [`index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/index.page.ts) angewendet.

```bash
// src/app/pages/index.page.ts
import { RouteMeta } from "@analogjs/router";

export const routeMeta: RouteMeta = {
  redirectTo: '/landing',
  pathMatch: 'full',
}
```

Dies leitet den Nutzer von der `/` Route zur `/landing` Route.

Ansonsten gibt es noch die `Meta`-Eigenschaft, die ein `RouteMeta`-Typ hat, um eine Liste an Meta Tags für jede Route zu definieren.

```bash
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

# Catch-All-Routen

Catch-All-Routen werden definiert, indem der Dateiname als Routenpfad verwendet wird, der mit drei Punkten in eckigen Klammern vorangestellt wird.

Die Beispielroute unten in [`[...page-not-found].page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/%5B...page-not-found%5D.page.ts) definiert eine Platzhalter-Route (wildcard `**`-Route). Diese Route wird normalerweise für 404-Seiten verwendet.

Die eckigen Klammern zeigen an, dass die Route dynamisch ist. Der Ausdruck `[...page-not-found]` wird als Parameter behandelt, und die Auslassungspunkte `(...)` zeigen an, dass die Route jeden Pfad abdecken soll, der nicht von anderen Routen erfasst wurde. Durch das Erstellen dieser oder einer ähnlichen Catch-All-Route kann sichergestellt werden, dass deine Anwendung undefinierte Routen elegant behandelt, was zu einer besseren Benutzererfahrung führt.

```bash
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

# Markdown als Routen

## Content Routen definieren

AnalogJS unterstützt die Verwendung von Content Routen, in denen Markdown Inhalte als Routen definiert werden können.

Dafür muss die `MarkDownRenderer()` Komponente in der `provideContent()`-Funktion dem `providers`-Array in [`app.config.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/app.config.ts) hinzugefügt werden, wenn die Anwendung gestartet wird.

<pre>
<code>// src/app/app.config.ts
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
    <mark>provideContent(withMarkdownRenderer()),</mark>
  ],
};</code>
</pre>

Dies ermöglicht es, dass [`src/app/pages/about.md`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/about.md) als Route definiert wird und in [localhost:5173/about](http://localhost:5173/about) als solche angezeigt wird.

![IMG_localhost:5173/about](https://drive.google.com/uc?export=view&id=188ezG6VevOVcRFMehJKgUCVvT0BQSwhA)

## Content Dateien definieren

Für mehr Flexibilität Befinden sich alle Blogeinträge dieser Anwendung als Content Daten im [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner hinterlegen.

Dise sind alle gleich aufgebaut mit einer Frontmatter und dem Inhalt an sich.

```bash
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

Diese Inhalte werden in dieser Anwendung an zwei Stellen zugegriffen. Einmal in [`blog/index.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/index.page.ts), in dem über `injectContentFiles<BlogPost>()`, bereitgestellt von `@analogjs/content`, eine Liste aller Blogeinträge aus dem [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner als Liste extrahiert werden.

```bash
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

Diese Funktion extrahiert die Frontmatter aus der Markdown-Datei in das Interface [`BlogPost`]( https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/models/post.ts)

```bash
// src/app/models/post.ts
export interface BlogPost {
    title: string;
    description: string;
    slug: string;
}
```

![IMG_localhost:5173/blog](https://drive.google.com/uc?export=view&id=1iMhdCmAw00CMiND8HnwvEzto2e0BK1Gy)

Der zweite Zugriff auf den [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner passiert in [`blog/[slug].page.ts `](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/%5Bslug%5D.page.ts) über `injectContent<BlogPost>()`, ebenfalls bereitgestellt von `@analogjs/content`. Doch diesmal wird eine explizite Markdown-Datei, anhand des `[slug]`-Parameters ausgewählt und auf das [`BlogPost`]( https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/models/post.ts)-Interface gemapped. Der Inhalt der Markdown-Datei wird über `<analog-markdown [content]="post.content" />` angezeigt.

```bash
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

# API Routen

AnalogJS unterstützt auch API-Routen, die verwendet werden können, um Daten/Inhalte für die Anwendung bereitzustellen.

Diese API-Routen werden in [`src/server/routes/api`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api) definiert und basieren auch auf dem Prinzip des file-based Routing und sind unter dem Präfix `/api` verfügbar.

Hier lassen sich viele APIs implementieren, wie XML-Inhalte, Catch-All-Routen, Fehlerbehandlung, Cookies oder Datenbanken, wenn nötig kann auch nextJS integriert werden. Diese werden alle auf dem Server laufen, ohne einen zusätzlichen Serverprozess starten zu müssen. Diese Routen sind unter dem Präfix `/api` verfügbar. Weitere Informationen und Beispiele gibt es in den [AnalogJS Dokumentationen](https://analogjs.org/docs/features/api/overview).

Dies Anwendung beschränkt sich auf eine Implementation einer [PrismaDB](https://www.prisma.io/) zur Handbabung von Todos auf dem Server.

## Datenbanken und API-Routen

Für die Handbabung von den Todos in der Anwendung wird ein simples Schema mit PrismaDB implementiert unter [`schema.prisma`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/prisma/schema.prisma)

```bash
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

Alle Datenbankzugriffe erfolgen unter den API-Routen in [`src/server/routes/api/todos`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/server/routes/api/todos) und alle diese Routen implementieren entsprechende HTTP-Methoden.

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

```bash
// src/server/routes/api/todos/(get)/index.get.ts
import { defineEventHandler } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const todos = await prisma.todo.findMany();
  return todos;
});
```

Auf alle diese Routen wird in einem Service [`todo.services.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/todo.services.ts) zugegriffen und der Anwendung zur Verfügung gestellt.

```bash
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

Und die Seite [`todo.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/todo.page.ts) nutzt diese Services in der Anwendung zum Handhaben von Todos. Hier können die einzelnen Todos angezeigt werden, bearbeitet und gelöscht werden, neue Todos können hier erstellt werden und Todos können als abgeschlossen markiert werden.

```bash
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

![IMG_localhost:5173/todo](https://drive.google.com/uc?export=view&id=1UGTztLaLUTK2ktdahoVW8gVn0afcxFSl)

Auch in den einzelnen Blogeinträgen in [[slug].page.ts](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/%5Bslug%5D.page.ts), wird auf diese Todos zugegriffen, hier werden jedoch nur die Todos angezeigt, die auch eine Verknüpfung zu diesm Blogeintrag haben.

```bash
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

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=15krF4z3WMf0CRRyjeoCS9wZVGziQnDet)

Und alle diese Daten sind unter der `/api`-Schnittstelle zu finden. So befinden sich die Daten der Datenbank zu dieser Anwendung unter [localhost:5173/api/todos](http://localhost:5173/api/todos), bzw. können diese dort betrachtet werden. Hier ein Ausschnitt:

```bash
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

# Form Actions

Um Formularübermittlungen zu handahben, oder zu validiern, kann die `FormAction`-Direktive von `@analogjs/router` verwendet werden. Die Direktive kümmert sich um das Sammeln der FormData und das Senden einer POST-Anfrage an den Server. 

Die Direktive gibt je nach Zustand des Formulars drei verschidene Ereignisse zurück: 
- `onSuccess`, wenn das Formular auf dem Server verarbeitet wird und eine Erfolgreiche Antwort zurückgibt 
- `onError`, wenn das Formulat eine Fehlerantwort zurückgibt 
- `onStateChange`, wenn das Formular abgesendet wird.

[`newsletter.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/newsletter.page.ts) stellt ein simples Beispiel für die Verwendung einer solchen FormAction dar, in der ein Formular zu einem Newsletter-Abo simuliert wird.
Aufzufunden über die [localhost:5173/landing](http://localhost:5173/landing) 

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=1YJS9NaRc2CQsVpBgb8vIDWsA7QDCUgcr)

```bash
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

`FormErrors`ist hierbei ein benutzerdefineierter Typ mit einer `email`-Eigenschaft, die aber auch `undefined` sein kann, um Fehler im zusammenhang mit der FormAction zu typisieren.

`onSuccess`: Eine Methode, die aufgerufen wird, wenn das Formular erfolgreich übermittelt wurde. Sie setzt signedUp auf true.

`onError`: Eine Methode, die aufgerufen wird, wenn ein Fehler bei der Übermittlung des Formulars auftritt. Sie setzt die errors-Signale mit den empfangenen Fehlern.

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=12fUc9c2pH6dTTRb0lIrKTTSoRvwilWMy)

Um die Formularaktion durchzuführen, muss eine `.server.ts`-Datein neben der `.page.ts`-Datei angelegt werden, die die asynchrone Aktionsfunktion zur Verarbeitung der Formularübermittlung enthält. In diesem Fall [newsletter.server.ts](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/newsletter.server.ts)

```bash
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

Es gibt drei verschidene Antwortmöglichkeiten:
- `json` wird verwendet, um eine JSON-Antwort an den Client zu senden, wie in dem Vorangegangenen Beispiel.
- `redirect` wird verwendet, um nach erfolgreichem Absenden eines Formulars einen redirect auf einen andere Seite durchzuführen (`return redirect('/');`).
- `fail` wird verwendet, um Formularvalidierungsfehler an den Client zurückzugeben.

Sollte zum Beispiel auf die Schaltfläche gedrückt werden, ohne, dass eine valide Mail-Adresse eingegeben wird, dann wird auch der eingestellte Fehlercode `422` gesendet mit der Nachricht: `email: Email is required`.

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=1moFgGn4cl0hUXE2aX96CTMBGfc-JQwYp)

Sollte aber eine valide Mail-Adresse eingegeben werden, dann wird ein `200`-er Code vom Handler gesendet und eine Dankesnachricht angezeigt.

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=1cxKjYh-0UCVb_M5WcXDS9wahy2QKob9m)

Es können auch `GET`-Requests verarbeitet werden, dann könnte der Rückgabewert wie folgt aussehen

```bash
return {
  loaded: true,
  searchTerm: `${query['search']}`,
};
```

# Static Site Generation

AnalogJS erlaubt die Static Site Generation beim Fertigstellen (Deployment) der Anwendung, vor allem mit dem Pre-Renderen von Routen zu statischen HTML-Dateien zusammen mit der clientseitigen Anwendung.

Das Pre-Renderen kann in der [`vite.config.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/vite.config.ts) in der `prerender`-Eigenschaft eingestellt werden, die dann zu Build Zeit gerendert werden. Diese können auch asynchron bereitgestellt werden. 

Ebenfalls können Inhalte aus dem [`src/content`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/content)-Ordner zum Pre-Renderen hinzugefügt werden. Dafür kann man den `contentDir`-Wert verwenden, wie in dem Beispiel gezeigt. 
Die Verzeichnisstruktur wird möglicherweise nicht 1:1 in den Pfaden der Anwendung widergespiegelt. Daher musst eine Transformationsfunktion übergeben werden, die die Dateipfade auf die URLs abbildet. Der zurückgegebene String sollte der URL-Pfad in der Anwendung sein. 
Die Verwendung von transform ermöglicht es auch, bestimmte Routen herauszufiltern, indem man false zurückgibst.

```bash
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

# Server Side Rendering
