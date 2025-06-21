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

# AngularJS angewandt im Projekt

## Routing in AnalogJS

### File Base Routing in AnalogJS

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

## Routen definieren in analogJS

### Definieren von statischen Routen in analogJS

Ein Beispiel für eine statische Route ist die [`landing.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/landing.page.ts)-Seite. Diese nimmt keine dynamischen Werte an und stellt eine simple Landing Page dar.
Dementsprechend reicht es einfach diese Datei im [`/src/app/pages`](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/app/pages)-Ordner zu erstellen und über redirects oder über einen Browser zu [localhost:5173/landing](http://localhost:5173/landing) zu navigieren.

## Definieren von dynamischen Routen in analogJS

Wenn man eine Seite erstellen möchte, die dynamische Parameter oder Ähnliches verwendet, können zwei Methoden angewendet werden:
- Übergeordneten und untergeordneten Routen (Parent/Child-Routen)
- Nicht verschachtelte Routen

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

## Elter-Kind-Routen mit dynamischen Parametern

Hierfür wird eine übergeordnete Seite benötigt, hier die [`blog.page.ts`](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog.page.ts):

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

Diese Seite stellt das übergeordnete Elternelement dar, welches für die verschachtelte Funktion den `RouterOutlet` von `@angular/router`importiert und das `<router-outlet />`-Element im Template nutzt, um die Kinderrouten anzuzeigen, oder eine Menge von Kinderrouten, falls diese benötigt werden.

Sollte zu [localhost:5173/blog](http://localhost:5173/blog) navigiert werden, wird dieser Inhalt angezeigt (hier eine simple Navigationsleiste) und das `<router-outlet />`-Element navigiert sofort zur [`/blog/index.page.ts`]( https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/blog/index.page.ts)-Seite (Hier eine Liste aller Existierenden Blogeinträge), die die neue Index-Seite der Kinderrouten darstellt und diese verschachtelt auf der Elternseite neben dessen Inhalten anzeigt.

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

![IMG_localhost:5173/blog](https://drive.google.com/uc?export=view&id=1iMhdCmAw00CMiND8HnwvEzto2e0BK1Gy)

Alle untergeordneten Routen müssen sich in einem Ordner befinden, der den selben Namen hat, wie die übergeordnete Route.

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

![IMG_localhost:5173/blog/die-bedeutung-con-lebenslangem-lernen](https://drive.google.com/uc?export=view&id=15krF4z3WMf0CRRyjeoCS9wZVGziQnDet)

## Routen von Metadaten

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

## Markdown als Routen

### Content Routen definieren

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

### Content Dateien definieren

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
