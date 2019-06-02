import React from 'react';
// import { Provider, Heading, Subhead } from 'rebass'
// import {
//   Hero, CallToAction, ScrollDownIndicator
// } from 'react-landing-page'
import Loading from '../Loading/index'
const { Heading, Subhead } = require('rebass') 

const {
    Hero, CallToAction, ScrollDownIndicator
} = require('react-landing-page')

type LandingProps = {

}

export default function Landing () {
    return (
        <Hero
            color="black"
            bg="white"
            backgroundImage="https://source.unsplash.com/jxaj-UrzQbc/1600x900"
        >
            {/* <Loading isLoading={isLoading} /> */}
            <Heading>Review DAO</Heading>
            {/* <Subhead>ReviewDAO is a consortium for generating, organizing, and distributing product reviews.</Subhead> */}
            <CallToAction href="/token-manager" mt={3}>Get Started</CallToAction>
            <ScrollDownIndicator/>
        </Hero>
    )
}