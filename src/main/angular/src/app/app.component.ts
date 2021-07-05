import {ChangeDetectionStrategy, Component} from '@angular/core';
import {gql} from "@apollo/client/core";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Apollo} from "apollo-angular";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
    public readonly name$: Observable<string>;

    constructor(
        private readonly apollo: Apollo
    ) {
        this.name$ = this.apollo.subscribe({
            query: gql`
                {
                    demo {
                        name
                    }
                }
            `,
        }).pipe(
            map(it => (it?.data as any)?.name)
        );
    }
}
