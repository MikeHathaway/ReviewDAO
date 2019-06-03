import React from 'react';
import { Route } from 'react-router-dom'
// import { Provider, Heading, Subhead } from 'rebass'
// import {
//   Hero, CallToAction, ScrollDownIndicator
// } from 'react-landing-page'
import Loading from '../Loading/index'
const { Heading, Subhead } = require('rebass') 

const {
    Hero, 
    CallToAction, 
    ScrollDownIndicator
} = require('react-landing-page')

type LandingProps = {

}

export default function Landing () {
    return (
        <Route 
            path="/"
            render={({history}) => (  
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
        )}/>

    )
}