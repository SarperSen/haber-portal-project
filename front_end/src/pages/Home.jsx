import React from "react";
import Navbar from "../components/Navbar";
import FinansBar from "../components/FinansBar";
import Slider from "../components/Slider";
import Authors from "../components/Authors";
import WeatherWidget from "../components/WeatherWidget";
import NewsList from "../components/NewsList";
import Ads from "../components/Ads";
import VisitedNews from "../components/VisitedNews";
import CategorizedNews from "../components/CategorizedNews";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pt-0"> 
      <Navbar />

      <FinansBar />

      <main className="max-w-7xl mx-auto grid grid-cols-12 gap-6 relative">
        {/* Soldaki reklam - sticky ve sola taşması için ekstra style */}
        <aside
          className="hidden lg:block col-span-1 sticky top-24 flex flex-col"
          style={{ marginLeft: "-190px", zIndex: 10 }}  
        >
          <Ads position="left" />

          {/* Sol reklamın hemen altında kategorili haberler */}
          <div className="mt-6 relative z-10">
            <CategorizedNews />
          </div>
        </aside>

        <section className="col-span-12 lg:col-span-8 space-y-6 ml-5 pt-4">
          <Slider height="h-[450px]" />

          <div className="flex flex-col md:flex-row md:space-x-6">
            <Authors className="md:w-1/3 mb-4 md:mb-0" />
            <WeatherWidget className="md:w-2/3" />
          </div>

          <NewsList />
        </section>

        <aside className="hidden lg:flex flex-col col-span-3 sticky top-24 space-y-6 ml-5 pt-4">
          <Ads position="right" />
          <VisitedNews />
        </aside>
      </main>
    </div>
  );
}
