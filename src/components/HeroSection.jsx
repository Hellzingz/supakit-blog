import React from "react";
import Coding from "../assets/img/Coding.png";

export function HeroSection() {
  return (
    <section className="w-full py-8 lg:py-16 max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-10">
        <div className="max-w-[347px] mb-8 lg:mb-0 text-start lg:text-end">
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
            src={Coding}
            alt="coding"
            className="h-[530px] object-cover w-full"
          />
        </div>

        <div className="max-w-[347px]">
          <h2 className="text-xs mb-2">-Author</h2>
          <h3 className="text-2xl font-semibold mb-4">Supakit J.</h3>
          <p className="text-[#75716B] mb-4">
            I am a Full Stack Developer passionate about growth and learning. I
            love exploring new ideas and turning them into real solutions. Every
            project is an opportunity to improve and challenge myself.
          </p>
          <p className="text-[#75716B]">
            I am driven by curiosity and a desire to keep evolving as a
            developer.
          </p>
        </div>
      </div>
    </section>
  );
}
