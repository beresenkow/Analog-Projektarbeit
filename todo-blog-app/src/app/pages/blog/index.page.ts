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
}
