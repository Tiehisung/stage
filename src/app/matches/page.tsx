import React from 'react'
import FixturesSection from './Fixtures'
import MatchesSection from './Matches'

const MatchesPage = () => {
  return (
    <div className='px-[2vw] space-y-8'>
        <FixturesSection/>
        <MatchesSection/>
    </div>
  )
}

export default MatchesPage