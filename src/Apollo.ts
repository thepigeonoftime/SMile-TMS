import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";
import {onError} from "apollo-link-error";
import {ApolloLink} from "apollo-link";
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import base64 from "base-64";

export const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({message, locations, path}) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        new HttpLink({
            uri: "https://smile.goodstag.com/graphql/",
            headers: {
                authorization: "Basic " + base64.encode("smile:sei7ieQuueka"),
            },
        }),
    ]),
    cache: new InMemoryCache(),
});
