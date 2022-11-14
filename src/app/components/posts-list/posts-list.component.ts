import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
	selector: 'app-posts-list',
	templateUrl: './posts-list.component.html',
	styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

	posts: Post[] = [];
	currentPost: Post = {};
	currentIndex = -1;
	title = '';

	page = 1;
	count = 0;
	pageSize = 5;
	pageSizes = [5, 10, 20];

	constructor(private postService: PostService) { }

	ngOnInit(): void {
		this.retrievePosts();
	}

	getRequestParams(searchTitle: string, page: number, pageSize: number): any {
		let params: any = {};

		if (searchTitle) {
			params['title'] = searchTitle;
		}

		if (page) {
			params['page'] = page - 1;
		}

		if (pageSize) {
			params['size'] = pageSize;
		}

		return params;
	}

	retrievePosts(): void {
		const params = this.getRequestParams(this.title, this.page, this.pageSize);

		this.postService.getAll(params)
		.subscribe({
			next: (data) => {
				this.posts = data
				console.log(data);
			},
			error: (err) => {
				console.log(err);
			}
		});
	}

	handlePageChange(event: number): void {
		this.page = event;
		this.retrievePosts();
	}

	handlePageSizeChange(event: any): void {
		this.pageSize = event.target.value;
		this.page = 1;
		this.retrievePosts();
	}

	refreshList(): void {
		this.retrievePosts();
		this.currentPost = {};
		this.currentIndex = -1;
	}

	setActivePost(post: Post, index: number): void {
		this.currentPost = post;
		this.currentIndex = index;
	}

	searchTitle(): void {
		this.page = 1;
		this.retrievePosts();
	}
}
