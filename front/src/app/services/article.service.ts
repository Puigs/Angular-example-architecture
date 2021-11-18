import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ArticleService {
    articles: Article[] = this.getArticle();

    constructor() {}

    refresh(): Observable<Article[]> {
        return of();
    }

    getArticle() {
        const list_article = localStorage.getItem('articles');
        if (!list_article) {
            return [
                {
                    id: '0',
                    name: 'Pommier et arbre à chat',
                    price: 8.99,
                    quantity: 14,
                },
                { id: '1', name: 'Poirier', price: 7.99, quantity: 8 },
                { id: '2', name: 'Cerisier', price: 5.99, quantity: 17 },
                { id: '3', name: 'Oranger', price: 4.99, quantity: 4 },
                { id: '4', name: 'Bananier', price: 21, quantity: 31 },
            ];
        }
        return JSON.parse(list_article);
    }

    save() {
        localStorage.setItem('articles', JSON.stringify(this.articles));
    }

    add_article(article: any): Observable<void> {
        this.articles.push(article);
        this.save();
        return of();
    }

    delete_article(selected_articles: Set<Article>): Observable<void> {
        this.articles = this.articles.filter((a) => !selected_articles.has(a));
        this.save();
        return of();
    }
}
