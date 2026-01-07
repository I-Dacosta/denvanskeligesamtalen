import config from '@payload-config'
import { GraphQLHandler } from '@payloadcms/next/graphql'

const handler = GraphQLHandler(config)

export { handler as GET, handler as POST }
