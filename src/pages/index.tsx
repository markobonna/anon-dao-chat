import type { ReactElement } from 'react'
import { Heading, Subheading } from '@/components/heading'
import { AddToDiscordButton } from '@/components/AddToDiscordButton'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <Heading>Anonymous DAO Chat</Heading>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Enable anonymous communication in your Discord server with secure, blockchain-backed messaging.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <AddToDiscordButton />
            </div>
          </div>

          <div className="mt-20">
            <Subheading>How it works</Subheading>
            <div className="mt-8 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">1. Add to Discord</h3>
                <p className="mt-2 text-gray-600">
                  Add our bot to your Discord server with a single click.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">2. Start Chatting</h3>
                <p className="mt-2 text-gray-600">
                  Use the !anonchat command followed by your message to send anonymous messages.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold">3. Stay Anonymous</h3>
                <p className="mt-2 text-gray-600">
                  Your messages are processed in a secure TEE and logged on-chain for transparency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
