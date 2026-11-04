import { useEffect } from 'react';
import Hero from '../sections/Hero';
import Questions from '../sections/Questions';
import WhyClass from '../sections/WhyClass';
import Curriculum from '../sections/Curriculum';
import ClassPreview from '../sections/ClassPreview';
import Instructor from '../sections/Instructor';
import Reviews from '../sections/Reviews';
import InsightsPreview from '../sections/InsightsPreview';
import FinalCta from '../sections/FinalCta';
import StickyCta from '../components/StickyCta';
import { initScrollDepth } from '../lib/analytics';

export default function LandingPage() {
  useEffect(() => {
    // 다른 페이지에서 '/#curriculum' 등으로 돌아온 경우 해당 섹션으로 이동
    const id = window.location.hash.slice(1);
    if (id && id !== 'top') requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return initScrollDepth('landing');
  }, []);

  return (
    <>
      <Hero />
      <Questions />
      <WhyClass />
      <Curriculum />
      <ClassPreview />
      <Instructor />
      <Reviews />
      <InsightsPreview />
      <FinalCta />
      <StickyCta />
    </>
  );
}
