import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Home} from "../home/home";

@Component({
    selector: 'app'
})
@View({
    template: `
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES, Home]
})
@RouteConfig([
    { path: '/', component: Home, as: 'Home'}
])
export class App {

}
