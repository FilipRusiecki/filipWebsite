import { createGraphQLHandler } from '@redwoodjs/graphql-server'
import { authDecoder } from '@redwoodjs/auth-dbauth-api'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { getCurrentUser } from 'src/lib/auth'

export const handler = createGraphQLHandler({
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  getCurrentUser,
  authDecoder,
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
