import { getPayload } from 'payload'
import config from '@payload-config'

async function checkUser() {
  const payload = await getPayload({ config })

  const users = await payload.find({
    collection: 'users',
    limit: 10,
  })

  console.log('Users in database:')
  users.docs.forEach((user: any) => {
    console.log(`- Email: ${user.email}, ID: ${user.id}`)
  })

  if (users.docs.length === 0) {
    console.log('No users found!')
  }

  process.exit(0)
}

checkUser().catch((error) => {
  console.error('Error:', error)
  process.exit(1)
})
