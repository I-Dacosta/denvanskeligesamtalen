import config from '@payload-config'
import { configToSchema } from '@payloadcms/graphql'
import { createHandler } from 'graphql-http/lib/use/fetch'
import { NextRequest } from 'next/server'

let graphqlHandler: ReturnType<typeof createHandler> | null = null

async function getHandler() {
  if (!graphqlHandler) {
    const resolvedConfig = await config
    const { schema, validationRules } = configToSchema(resolvedConfig)
    
    graphqlHandler = createHandler({
      schema,
      validationRules: (req, args, specifiedRules) => {
        // Call Payload's validation rules function with just the args
        const payloadRules = validationRules(args)
        return [...specifiedRules, ...payloadRules]
      },
    })
  }
  return graphqlHandler
}

export async function GET(request: NextRequest) {
  const handler = await getHandler()
  return handler(request)
}

export async function POST(request: NextRequest) {
  const handler = await getHandler()
  return handler(request)
}
