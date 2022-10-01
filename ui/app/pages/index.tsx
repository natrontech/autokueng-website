import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router';
import HeroCard from '../components/landingpage/HeroCard';
import Login from '../components/Login';
import { useUserContext } from '../contexts/userContext';

const Home: NextPage = () => {

  const {user, loading}: any = useUserContext();
  const router = useRouter();

  return (
    <>
      <HeroCard />
    </>
  )
}

export default Home
