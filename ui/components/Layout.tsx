import React from 'react'
import { useUserContext } from '../contexts/userContext'
import { classNames } from '../lib/design'
import Footer from './Footer'
import Loading from './Loading'
import Navigation from './Navigation'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

export default function Layout(props: any) {
  const { loading }: any = useUserContext()

  return (
    <div className="flex flex-col h-screen">
      <Navigation />

      <div className="fixed z-50 w-full bottom-0 isolate flex items-center gap-x-6 overflow-hidden bg-red-500 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm leading-6 text-gray-900">
            <strong className="font-semibold">WERKSTATT GESCHLOSSEN</strong>
            <svg viewBox="0 0 2 2" className="mx-2 inline h-0.5 w-0.5 fill-current" aria-hidden="true">
              <circle cx={1} cy={1} r={1} />
            </svg>
            Wir sind nur noch <b>telefonisch</b> oder per <b>E-Mail</b> für den <b>Verkauf</b> erreichbar.
          </p>
          <Link href="/kontakt">
            <button className="flex-none rounded-lg bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
              Kontakt <span aria-hidden="true">&rarr;</span>
            </button>
          </Link>
        </div>
        <div className="flex flex-1 justify-end"></div>
      </div>

      <main className="flex-1 mt-20">{React.cloneElement(props.children)}</main>

      <Footer />

      {loading ? <Loading /> : null}
    </div>
  )
}
