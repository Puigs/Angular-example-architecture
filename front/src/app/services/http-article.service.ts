import { Injectable } from '@angular/core';
import { ArticleService } from './article.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpArticleService extends ArticleService {
    constructor(private http: HttpClient) {
        super();
        this.refresh();
    }

    override refresh(): Observable<Article[]> {
        super.refresh();
        return this.http
            .get<Article[]>('http://localhost:3000/api/articles')
            .pipe(delay(2000));
        // .subscribe({
        //     next: (articles) => {
        //         this.articles = articles;
        //         this.save();
        //     },
        //     error: (err) => {
        //         console.log('err : ', err);
        //     },
        //     complete: () => {
        //         console.log('complete');
        //     },
        // });
    }

    override add_article(article: Article): Observable<void> {
        super.add_article(article);
        return this.http
            .post<void>('http://localhost:3000/api/article', article)
            .pipe(delay(2000));
    }

    override delete_article(selected_articles: Set<Article>): Observable<void> {
        super.delete_article(selected_articles);
        const ids = [...selected_articles].map((elem) => elem.id);
        return this.http
            .delete<void>('http://localhost:3000/api/articles', {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(ids),
            })
            .pipe(delay(2000));
        // .subscribe({
        //     next: () => {
        //         this.refresh();
        //     },
        //     error: (err) => {
        //         console.log('err : ', err);
        //     },
        //     complete: () => {
        //         console.log('complete');
        //     },
        // });
    }
}
