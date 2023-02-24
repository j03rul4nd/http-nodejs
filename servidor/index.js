import { startApolloServer } from './app.js'
import { typeDefs } from './graphql/typeDefs.js'
import { resolvers } from './graphql/resolvers.js'
import { conectdb } from './db.js'


conectdb()

startApolloServer(typeDefs, resolvers);