import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { ClientResponseError } from 'pocketbase';
import { useEffect, useState } from 'react';
import About from '../components/landingpage/About';
import HeroCard from '../components/landingpage/HeroCard';
import News from '../components/landingpage/News';
import Services from '../components/landingpage/Services';
import Stats from '../components/landingpage/Stats';
import Testmonial from '../components/landingpage/Testmonial';
import { useUserContext } from '../contexts/userContext';
import { MemberType, NewsType, VehicleType } from '../lib/interfaces';

const Home: NextPage = () => {

  const { user, loading }: any = useUserContext();
  const router = useRouter();

  const { client }: any = useUserContext()

  const [news, setNews] = useState<NewsType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [vehicles, setVehicles] = useState<VehicleType[]>([])

  useEffect(() => {
    (
      async () => {
        const memberRecords = await client.records.getFullList('members', 200 /* batch size */, {
          sort: '-created',
        }).catch((error: ClientResponseError) => {
          console.log(error);
        });
        setMembers(memberRecords)
      }
    )(),
      (
        async () => {
          const vehicleRecords = await client.records.getFullList('vehicles', 200 /* batch size */, {
            sort: '-created',
          }).catch((error: ClientResponseError) => {
            console.log(error);
          });
          setVehicles(vehicleRecords)
        }
      )(),
      (
        async () => {
          const records = await client.records.getFullList('news', 200 /* batch size */, {
            sort: '-created',
          }).catch((error: ClientResponseError) => {
            console.log(error);
          });
          setNews(records);
        }
      )()
  }, [client.records])

  return (
    <>
      <HeroCard />
      <News news={news} />
      <About />
      <Services />
      <Stats members={members} vehicles={vehicles} />
      <Testmonial />
    </>
  )
}

export default Home
