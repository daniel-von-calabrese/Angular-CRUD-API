import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
	selector: 'app-add-post',
	templateUrl: './add-post.component.html',
	styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

	post: Post = {
		title: '',
		body: '',
		userId: 1
	};
	submitted = false;

	message = '';

	constructor(private postService: PostService) { }

	ngOnInit(): void {
		this.message = '';
	}
	
	savePost(): void {
		this.message = '';
		const data = {
			title: this.post.title,
			body: this.post.body,
			userId: 1
		};

		this.postService.create(data)
		.subscribe({
			next: (res) => {
				console.log(res);
				this.submitted = true;
			},
			error: (e) => console.error(e)
		});
  }

	newPost(): void {
		this.message = '';
		this.submitted = false;
		this.post = {
			title: '',
			body: '',
			userId: 1
		};
	}
}
