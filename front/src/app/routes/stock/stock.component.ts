import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/interfaces/article';
import {
    faCoffee,
    faPlus,
    faTrashAlt,
    faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
    selectedArticles = new Set<Article>();
    constructor(public articleService: ArticleService) {}

    faPlus = faPlus;
    faTrash = faTrashAlt;
    faCircleNotch = faCircleNotch;
    isLoading = false;

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.isLoading = true;
        this.articleService.refresh().subscribe({
            next: () => {
                this.isLoading = false;
            },
            error: (err) => {
                console.log('err : ', err);
                this.isLoading = false;
            },
        });
    }

    toggle(a: Article) {
        if (this.selectedArticles.has(a)) {
            this.selectedArticles.delete(a);
            return;
        }
        this.selectedArticles.add(a);
    }

    remove() {
        this.articleService
            .delete_article(new Set(this.selectedArticles))
            .subscribe({
            });
        this.selectedArticles.clear();
    }
}
