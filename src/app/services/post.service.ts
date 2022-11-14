import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
	providedIn: 'root'
})
export class PostService {

	constructor(private http: HttpClient) { }

	getAll(params: any): Observable<any> {
		console.log(params);
		return this.http.get<any>(baseUrl, { params });
	}

	get(id: any): Observable<Post> {
		return this.http.get<Post>(`${baseUrl}/${id}`);
	}

	create(data: any): Observable<any> {
		return this.http.post(baseUrl, data);
	}

	update(id: any, data: any): Observable<any> {
		return this.http.put(`${baseUrl}/${id}`, data);
	}

	delete(id: any): Observable<any> {
		return this.http.delete(`${baseUrl}/${id}`);
	}

	findByTitle(title: any): Observable<Post[]> {
		return this.http.get<Post[]>(`${baseUrl}?title=${title}`);
	}
}
