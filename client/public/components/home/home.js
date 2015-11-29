var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var angular2_1 = require('angular2/angular2');
var http_1 = require('angular2/http');
var router_1 = require('angular2/router');
var core_1 = require('angular2/core');
var Home = (function () {
    function Home(http) {
        this.http = http;
        this.bookmarks = [];
        this.search = '';
        this.listAll();
    }
    Home.prototype.listAll = function () {
        var _this = this;
        // Define your route depended to the name of your app
        return window.fetch('/api/bookmarks/')
            .then(function (response) { return response.json(); })
            .then(function (bookmarksData) {
            var i = 0;
            for (var _i = 0; _i < bookmarksData.length; _i++) {
                var val = bookmarksData[_i];
                if (!val.title) {
                    bookmarksData[i].title = 'no title';
                }
                if (!val.url) {
                    bookmarksData[i].url = 'no url';
                }
                i++;
            }
            _this.bookmarks = bookmarksData;
        });
    };
    Home.prototype.onSubmit = function (value) {
        var _this = this;
        var title = value.title;
        var link = value.link;
        var creds = "title=" + title + "&url=" + link;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // Define your route depended to the name of your app
        this.http.post('/api/bookmarks/', creds, {
            headers: headers
        })
            .subscribe(function (res) {
            console.log('on submit');
            _this.listAll();
        });
    };
    Home.prototype.onDelete = function (_id) {
        var _this = this;
        var creds = _id;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        // Define your route depended to the name of your app
        this.http.delete('/api/bookmarks/' + creds, {
            headers: headers
        }).subscribe(function (res) {
            _this.listAll();
        });
    };
    Home.prototype.getFilteredBookmarks = function () {
        var _this = this;
        return this.bookmarks.filter(function (bookmark) {
            var title = bookmark.title;
            var search = _this.search.toLowerCase();
            return title.indexOf(search) !== -1;
        });
    };
    Home = __decorate([
        angular2_1.Component({
            selector: 'home',
            providers: [http_1.HTTP_PROVIDERS],
        }),
        angular2_1.View({
            templateUrl: 'components/home/bookmark.html',
            directives: [angular2_1.NgFor, angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES, router_1.RouterLink]
        }),
        core_1.Injectable(),
        __param(0, angular2_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Home);
    return Home;
})();
exports.Home = Home;
