"use client";

import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import { Navbar } from "@/layouts/components/navbar";
import { Footer } from "@/layouts/components/footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F0FDF4] to-white text-gray-800">
      <Navbar />
      <main className="flex-grow flex items-center py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8">
            Achieve Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#059669] text-[30px] sm:text-[100%] overflow-hidden">
              <TypeAnimation
                sequence={[
                  "Personal Goals",
                  2000,
                  "Career Ambitions",
                  2000,
                  "Fitness Goals",
                  2000,
                  "Financial Dreams",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
              />
            </span>
          </h1>
          <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-600">
            Set, track, and conquer your goals with our intuitive goal tracking
            app. Stay motivated, measure progress, and turn your dreams into
            reality.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#10B981] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#0D9668] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-lg"
          >
            Get Started
          </Link>
        </div>
      </main>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
            Why Choose Goal Tracker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Intuitive Interface",
                description:
                  "Easy-to-use dashboard to manage all your goals in one place.",
                icon: "📊",
              },
              {
                title: "Progress Visualization",
                description:
                  "Beautiful charts and graphs to visualize your progress over time.",
                icon: "📈",
              },
              {
                title: "Smart Reminders",
                description:
                  "Get timely notifications to keep you on track and motivated.",
                icon: "🔔",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#F0FDF4] to-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
