import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router';
import About from '../components/landingpage/About';
import HeroCard from '../components/landingpage/HeroCard';
import News from '../components/landingpage/News';
import Services from '../components/landingpage/Services';
import Stats from '../components/landingpage/Stats';
import Testmonial from '../components/landingpage/Testmonial';
import { useUserContext } from '../contexts/userContext';

const Home: NextPage = () => {

  const {user, loading}: any = useUserContext();
  const router = useRouter();

  return (
    <>
      <HeroCard />
      <News />
      <About />
      <Services />
      <Stats />
      <Testmonial />
    </>
  )
}

export default Home
