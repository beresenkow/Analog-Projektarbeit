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
            <li *ngFor="let post of posts">
                <a [routerLink]="['/blog', post.slug]">{{ post.attributes.title }}</a>
                <P [routerLink]="['/blog', post.slug]">{{ post.attributes.description }}</P>
            </li>
        </ul>
    `
})
export default class IndexPage {
    posts = injectContentFiles<BlogPost>();
}
