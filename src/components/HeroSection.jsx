import React from "react";
import Hero from "../assets/img/hero.jpg";

export function HeroSection() {
  return (
    <section className="w-full py-8 lg:py-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-10">
        <div className="max-w-[347px] mb-8 lg:mb-0 lg:pr-3 text-start lg:text-end">
          <h1 className="text-4xl lg:text-5xl font-semibold mb-4">
            Stay <br className="hidden xl:block" />
            Informed, <br className="sm:block md:hidden" />
            Stay Inspired
          </h1>
          <p className="text-md text-[#75716B]">
            Discover a World of Knowledge at Your <br /> Fingertips. Your Daily
            Dose of Inspiration <br /> and Information.
          </p>
        </div>
        <div className="w-full min-w-[320px] md:max-w-[550px] rounded-lg shadow-lg">
          <img
            src={Hero}
            alt="Person with a cat"
            className="h-[530px] object-cover w-full"
          />
        </div>

        <div className="max-w-[347px]">
          <h2 className="text-xs mb-2">-Author</h2>
          <h3 className="text-2xl font-semibold mb-4">Thompson P.</h3>
          <p className="text-[#75716B] mb-4">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
          </p>
          <p className="text-[#75716B]">
            When I'm not writing, I spend time volunteering at my local animal
            shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </section>
  );
}
