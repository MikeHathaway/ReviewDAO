import React from 'react';
import { Route } from 'react-router-dom'

const { Heading, Subhead } = require('rebass') 
const {
    Hero, 
    CallToAction, 
    ScrollDownIndicator,
    SignUp,
    Section,
    Features,
    Footer,
    Team
} = require('react-landing-page')

import Loading from '../Loading/index'

type LandingProps = {

}

export default function Landing () {
    return (
        <Route 
            path="/"
            render={({history}) => (
                <div>
                    <Hero
                        color="black"
                        bg="white"
                        backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
                    >
                        {/* <Loading isLoading={isLoading} /> */}
                        <Heading>Review DAO</Heading>
                        {/* <Subhead>ReviewDAO is a consortium for generating, organizing, and distributing product reviews.</Subhead> */}
                        <CallToAction onClick={() => { history.push('/token-manager') }} mt={3}>Get Started</CallToAction>
                        <ScrollDownIndicator/>
                    </Hero>
                    {/* <Features /> */}
                    {/* <Team
                        fullName='Mike Hathaway'
                    /> */}
                    <Section
                        bg='white'
                        heading="Join the Community"
                        subhead="Sign up for the latest content and updates."
                    >
                        {<SignUp onSubmit={(email: any) => alert(`got ${email}`)} mt={3}/>}
                    </Section>
                    {/* <Footer /> */}
                </div>
  
        )}/>

    )
}