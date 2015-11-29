import {Component, View, CORE_DIRECTIVES, NgFor, FORM_DIRECTIVES, Inject} from 'angular2/angular2';
import {HTTP_PROVIDERS, Http, Headers} from 'angular2/http';
import {RouterLink} from 'angular2/router';
import {Injectable} from 'angular2/core';

@Component({
    selector: 'home',
    providers: [HTTP_PROVIDERS],
})
@View({
    templateUrl:'components/home/bookmark.html',
    directives: [NgFor, FORM_DIRECTIVES, CORE_DIRECTIVES, RouterLink]
})
@Injectable()
export class Home {

  bookmarks = [];
  search:string = '';

  constructor(@Inject(Http) private http: Http) {
    this.listAll();
  }

  listAll() {
    // Define your route depended to the name of your app
    return window.fetch('/api/bookmarks/')
      .then((response) => response.json())
      .then((bookmarksData) => {
          let i = 0;
          for (let val of bookmarksData) {
            if (!val.title) {
              bookmarksData[i].title = 'no title';
            }
            if (!val.url) {
              bookmarksData[i].url = 'no url';
            }
            i++;
          }
          this.bookmarks = bookmarksData;
      });
  }

  onSubmit(value) {
    var title = value.title;
    var link = value.link;

    var creds = "title=" + title + "&url=" + link;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // Define your route depended to the name of your app
    this.http.post('/api/bookmarks/', creds, {
      headers: headers
    })
    .subscribe(res => {
        console.log('on submit');
        this.listAll();
    });
  }

  onDelete(_id) {
    var creds = _id;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // Define your route depended to the name of your app
    this.http.delete('/api/bookmarks/' + creds, {
      headers: headers
    }).subscribe(res => {
      this.listAll();
    });
  }

  getFilteredBookmarks() {
    return this.bookmarks.filter((bookmark) => {
        var title = bookmark.title;
        var search = this.search.toLowerCase();
        return title.indexOf(search) !== -1;
    });
  }
}