import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-900">
            Stop Thinking About It.
            <br />
            <span className="text-neutral-600">Start Doing It.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            You've got a list of things you want to do with your family. Turn those ideas into images that make you actually want to get off the couch.
          </p>
          <div className="pt-4">
            <Link
              href="/wishboard"
              className="inline-block px-8 py-4 bg-neutral-900 text-white text-lg font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Try It Now
            </Link>
          </div>
        </div>

        {/* Visual Element: Example Cards Preview */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-70% to-white pointer-events-none z-10" />
          <div className="grid grid-cols-3 gap-4 opacity-90">
            <div className="aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden relative shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80"
                alt="Camping"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="aspect-[3/4] bg-neutral-300 rounded-lg overflow-hidden relative shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80"
                alt="Hiking"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="aspect-[3/4] bg-neutral-200 rounded-lg overflow-hidden relative shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80"
                alt="Beach"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-neutral-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-neutral-300">01</div>
              <h3 className="text-xl font-semibold text-neutral-900">Dump Your List</h3>
              <p className="text-neutral-600 leading-relaxed">
                Weekend trips, activities with the kids, places you've been meaning to check out. Just paste it.
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-neutral-300">02</div>
              <h3 className="text-xl font-semibold text-neutral-900">See What It Actually Looks Like</h3>
              <p className="text-neutral-600 leading-relaxed">
                Real photos from Google Places, curated images, AI-generated visuals. Get a real sense of each idea.
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-neutral-300">03</div>
              <h3 className="text-xl font-semibold text-neutral-900">Pick One and Go</h3>
              <p className="text-neutral-600 leading-relaxed">
                Stop planning. Start doing. Before you know it, summer's over.
              </p>
            </div>
          </div>

          {/* Example Input */}
          <div className="mt-16 max-w-xl mx-auto">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
              <div className="text-sm font-medium text-neutral-500 mb-3">Example:</div>
              <div className="space-y-2 text-neutral-700 font-mono text-sm">
                <div>Things to do with the kids:</div>
                <div className="pl-4">- Camping in the Hill Country</div>
                <div className="pl-4">- Space Center Houston</div>
                <div className="pl-4">- Beach trip to the coast</div>
                <div className="pl-4">- Canoeing on the river</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
            How We Help You Do More
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl">
                🗺️
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Maps & Directions</h3>
              <p className="text-neutral-600 leading-relaxed">
                See exactly where each place is. Get a sense of the drive time before you commit.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl">
                📋
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Quick Planning</h3>
              <p className="text-neutral-600 leading-relaxed">
                Checklists, gear lists, and reminders. Everything you need to actually make it happen.
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl">
                👨‍👩‍👧‍👦
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Family Coordination</h3>
              <p className="text-neutral-600 leading-relaxed">
                Share plans with the family. Get everyone on the same page before the weekend arrives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-neutral-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            What are you waiting for?
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Your kids aren't getting younger. Start turning those ideas into memories.
          </p>
          <div className="pt-4">
            <Link
              href="/wishboard"
              className="inline-block px-8 py-4 bg-white text-neutral-900 text-lg font-medium rounded-lg hover:bg-neutral-100 transition-colors"
            >
              Try It Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
