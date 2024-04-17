'use client'
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react'

interface RevealOnScrollProps {
    children: React.ReactNode;
}
export const RevealOnScroll = ({children}: RevealOnScrollProps) => {
    const ref = useRef(null);
    const controls = useAnimation();
    const isInView = useInView(ref);
    // useInView(ref, { once: true });

    useEffect(() => {
        isInView 
        ? controls.start('visible')
        : controls.start('hidden');
        console.log('isInView', isInView);
    },[isInView, controls])
  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: {opacity: 0, scale: 0.8, y: 75},
        visible: {opacity: 1, scale: 1, y: 0}
      }}
      initial="hidden"
      animate={controls}
      transition={{duration: 0.5, delay: 0.25}}
    >
        {children}
    </motion.div>
  )
}
