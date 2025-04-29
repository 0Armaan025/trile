"use client";
import React from 'react'
import { AnimatedLeftBar } from './navbar/animated-left-bar'
import { HeroSection } from './hero/hero-section';

type Props = {}

const HomePage = (props: Props) => {

    const myFunction = () => {

    }

    return (
        <div>
            <AnimatedLeftBar isOpen={false} children={<div>Random Value</div>} setIsOpen={myFunction} />
            <HeroSection />

        </div>
    )
}

export default HomePage
