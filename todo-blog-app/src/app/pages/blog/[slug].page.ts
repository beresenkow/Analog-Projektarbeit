import { MarkdownComponent, injectContent } from "@analogjs/content";
import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from "@angular/core";

import { BlogPost } from "src/app/models/post";

@Component({
    standalone: true,
    imports: [MarkdownComponent, NgIf, AsyncPipe],
    template: `
        <div *ngIf="post$ | async as post">
            <h2>{{ post.attributes.title }}</h2>
            <h3>{{ post.attributes.description }}</h3>

            <analog-markdown [content]="post.content" />
        </div>
    `,
})
export default class BlogPostPage {
    post$ = injectContent<BlogPost>();
}
