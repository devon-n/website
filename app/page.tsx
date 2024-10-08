import Container from './components/container'
import { Main } from './components/pages/Home/Main'
// import { Partners } from './components/pages/Home/Partners'
import { ExperienceSection } from './components/pages/Home/ExperienceSection'
import { DeveloperExperience } from './components/pages/Home/DeveloperExperience'
// import { Roadmap } from './components/pages/Home/Roadmap'
import { ExploreEcosystem } from './components/pages/Home/ExploreEcosystem'
import Cta from './components/cta'
import type { Metadata } from 'next'
import {
  fetchAirtableData,
  mapToProject,
  RawProject
} from '../utils/airtable/ecosystem'

export const metadata: Metadata = {
  title:
    'Layer 2 Blockchain Solutions | Tezos Smart Rollups Technology | Etherlink',
  description:
    'A decentralized & EVM compatible Layer-2 blockchain that looks after its users.'
}

// Set the default revalidation time for this page to 24 hours in seconds
export const revalidate = 86400

const Home = async () => {
  const airtableData = await fetchAirtableData(
    `?filterByFormula=NOT({rank} = '')&sort[0][field]=rank`
  )

  const rawProjects = airtableData?.records || []
  return (
    <>
      <Main />
      <ExploreEcosystem
        projects={rawProjects.map((table: RawProject) => mapToProject(table))}
      />
      <ExperienceSection />
      <DeveloperExperience />
      <Container>
        <Cta
          headerText='Ready to get started?'
          descriptionText='Useful resources to get started building and bridging on Etherlink'
          primaryButton={{
            text: 'Start building',
            link: 'https://docs.etherlink.com/'
          }}
          ghostButton={{
            text: 'EVM bridge',
            link: 'https://www.etherlinkbridge.com/bridge'
          }}
        />
      </Container>
    </>
  )
}

export default Home
