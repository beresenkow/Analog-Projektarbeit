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

Das file-based Routing wird in der [app.config.ts](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/app.config.ts) definiert über `provideFileRouter()`. 
Alle Seiten werden darauf als Routen definiert. Dies erfolgt über die `.page.ts`-Dateiendung im [/src/app/pages](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/app/pages)-Ordner und nur die Dateien mit diesen Endung werden als Routen erstellt.

Es muss die `standalone: true` Komponente im `@Component-Dekorator` verwendet werden, da analogJS das file-based Routing nur damit bereitstellen kann.

Danach sind alle Routen auch über den Namen, den diese haben erreichbar. Das file-based Routing ermöglicht es nur auf das Konfigurieren von Routen zu verzichten, ansonsten gibt es keine Abweichungen, davon, wie eine Angular Anwendung erstellt wird.

[index.page.ts](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/index.page.ts) stellt dabei die Index Route dar, die unter [localhost:5173/](http://localhost:5173/) erreichbar ist.

## Routen definieren in analogJS

### Definieren von statischen Routen in analogJS

Ein Beispiel für eine statische Route ist die [landing.page.ts](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/landing.page.ts)-Seite. Diese nimmt keine dynamischen Werte an und stellt eine simple Landing Page dar.
Dementsprechend reicht es einfach diese Datei im [/src/app/pages](https://github.com/beresenkow/Analog-Projektarbeit/tree/main/todo-blog-app/src/app/pages)-Ordner zu erstellen und über redirects oder über einen Browser zu [localhost:5173/landing](http://localhost:5173/landing) zu navigieren.

## Definieren von dynamischen Routen in analogJS

Wenn man eine Seite erstellen möchte, die dynamische Parameter oder Ähnliches verwendet, können zwei Methoden angewendet werden:
- Übergeordneten und untergeordneten Routen (Parent/Child-Routen)
- Nicht verschachtelte Routen

Ein solches Beispiel ist `parameter.[slug].page.ts` [hier](https://github.com/beresenkow/Analog-Projektarbeit/blob/main/todo-blog-app/src/app/pages/parameter.%5Bslug%5D.page.ts). `[slug]` repräsentiert hierbei einen belieben Wert, der als Parameter angenommen wird.

```bash
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

