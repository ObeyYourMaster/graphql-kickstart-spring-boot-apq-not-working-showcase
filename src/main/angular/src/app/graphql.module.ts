import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {environment} from '../environments/environment';
import {createPersistedQueryLink} from "apollo-angular/persisted-queries";
import CryptoES from "crypto-es";

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        link: createPersistedQueryLink({
            sha256: (s: string) => CryptoES.SHA256(s).toString(),
        }).concat(httpLink.create({
            uri: environment.graphqlEndpoint,
        })),
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'network-only'
            }
        }
    };
}

@NgModule({
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
