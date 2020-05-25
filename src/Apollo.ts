import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {ApolloLink} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import base64 from "base-64";

export const client = new ApolloClient({
    link: ApolloLink.from([
        // onError(({graphQLErrors, networkError}) => {
        //     if (graphQLErrors) {
        //         graphQLErrors.forEach(({message, locations, path}) =>
        //             console.log(
        //                 `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        //             )
        //         );
        //     }
        //     if (networkError) {
        //         console.log(`[Network error]: ${networkError}`);
        //     }
        // }),
        new HttpLink({
            uri: "https://smile.goodstag.com/graphql/",
            headers: {
                authorization: "Basic " + base64.encode("smile:sei7ieQuueka"),
            },
        }),
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
        mutate: {
            // fetchPolicy: "no-cache",
            errorPolicy: "all",
        },
    },
});
