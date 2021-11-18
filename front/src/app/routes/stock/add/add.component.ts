import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../../interfaces/article';
import { faPlus, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
    f = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.max(15),
        ]),
        price: new FormControl('', [
            Validators.required,
            Validators.max(10000),
        ]),
        quantity: new FormControl('', [Validators.required]),
    });

    isAdding = false;
    faPlus = faPlus;
    faCircleNotch = faCircleNotch;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public articleService: ArticleService
    ) {
        console.log('Cons');
    }

    ngOnInit(): void {}

    submit() {
        this.isAdding = true;
        this.articleService.add_article(this.f.value as Article).subscribe({
            next: () => {
                this.isAdding = false;
                this.router.navigate(['..'], { relativeTo: this.route });
            },
        });
    }
}
