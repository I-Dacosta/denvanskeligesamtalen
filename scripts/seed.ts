import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding Payload with initial content...')

  // Check if user already exists
  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.docs.length === 0) {
    // Create admin user
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'password123',
      },
    })
    console.log('✅ Admin user created')
    console.log('   Email: admin@example.com')
    console.log('   Password: password123')
  } else {
    console.log('User already exists. Skipping user creation.')
  }

  // Check if homepage already exists
  const existingHomepage = await payload.find({
    collection: 'homepage',
    limit: 1,
  })

  if (existingHomepage.docs.length > 0) {
    console.log('Homepage content already exists. Skipping homepage seed.')
    return
  }

  // Create homepage entry
  const homepage = await payload.create({
    collection: 'homepage',
    data: {
      hero: {
        subtitle: 'Unni Gjertsen & Runa Carlsen',
        mainTitle: 'DEN VANSKELIGE SAMTALEN',
        description: 'En kunstnerisk utforskning av dialogens grenser og stillhetens språk.',
      },
      about: {
        heading: 'En kunstnerisk utforskning av dialogens potensiale.',
        sectionTitle: 'OM PROSJEKTET',
        subtitle: 'Podcast – work in progress',
        description: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: '«Den vanskelige samtalen» er et kunstnerisk prosjekt som springer ut av en dyp kommunikasjonskrise mellom to venner og kollegaer, Unni Gjertsen og Runa Carlsen.',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Med utgangspunkt i ulike bakgrunner og perspektiver på den israelsk-palestinske konflikten utforsker de, med hjelp fra Nansen Fredssenter, dialog som et verktøy for å unngå stillhet og ghosting.',
                  },
                ],
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    text: 'Kjernen i prosjektet er sju podkastepisoder, hver med mål om å fremme åpne, ærlige og utfordrende samtaler. Uten press om å oppnå enighet går dialogene i dybden på temaer som identitet, traumer, polarisering og kritisk tenkning.',
                  },
                ],
              },
            ],
          },
        },
      },
      sections: [
        {
          number: '01',
          label: 'Introduksjon',
        },
        {
          number: '02',
          label: 'Historien',
        },
        {
          number: '03',
          label: 'Refleksjon',
        },
      ],
    },
  })

  console.log('✅ Homepage created with ID:', homepage.id)
  console.log('✅ Seed completed successfully!')
  console.log('\nNote: The hero image needs to be uploaded manually via the admin panel.')
  console.log('Go to http://localhost:3000/admin/collections/media to upload /images/walking.png')
  console.log('Then edit the homepage to add the image.')

  process.exit(0)
}

seed().catch((error) => {
  console.error('Error seeding data:', error)
  process.exit(1)
})
