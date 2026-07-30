import React from 'react'
import SEO from '../../components/common/SEO'
import HeroSection from '../../components/home/HeroSection'
import AboutIntro from '../../components/home/AboutIntro'
import FeaturedServices from '../../components/home/FeaturedServices'
import FeaturedPackages from '../../components/home/FeaturedPackages'
import WhyChooseUs from '../../components/home/WhyChooseUs'
import StatsCounter from '../../components/home/StatsCounter'
import GalleryPreview from '../../components/home/GalleryPreview'
import TestimonialsSlider from '../../components/home/TestimonialsSlider'
import FAQSection from '../../components/home/FAQSection'
import ContactCTA from '../../components/home/ContactCTA'

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Premium Event Decoration & Styling" 
        description="Transform your venues with Dream Events. We design wedding stages, balloon arches for birthdays, elegant centerpieces, and corporate backdrops." 
      />
      <HeroSection />
      <AboutIntro />
      <FeaturedServices />
      <FeaturedPackages />
      <WhyChooseUs />
      <StatsCounter />
      <GalleryPreview />
      <TestimonialsSlider />
      <FAQSection />
      <ContactCTA />
    </>
  )
}
