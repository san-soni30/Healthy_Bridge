import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Feedback() {
  const reviews = [
    { name: "Emily R.", feedback: "The personalized diet plan changed my life!" },
    { name: "John D.", feedback: "I lost 10kg in 3 months and feel healthier than ever." },
    { name: "Sophia K.", feedback: "Her guidance on balanced meals is outstanding!" },
    { name: "Michael T.", feedback: "NutriFit made meal planning stress-free and fun." },
    { name: "Olivia P.", feedback: "I feel more energetic and productive at work now." },
    { name: "David L.", feedback: "The advice on hydration completely boosted my workouts!" },
  ];

  return (
    <div>
    <section id="feedback" className="py-16 bg-green-50">
      <h3 className="text-2xl md:text-3xl font-bold text-green-700 text-center mb-10">
        Client Feedback
      </h3>

      <div className="max-w-6xl mx-auto px-6 relative">
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          spaceBetween={30}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          className="rounded-2xl pb-14 pointer-events-none" 
        >
          {reviews.map((r, i) => (
            <SwiperSlide key={i} className="!w-80 flex justify-center">
              <div className="bg-white shadow-lg border border-gray-100 rounded-2xl p-6 text-center h-60 flex flex-col justify-between pointer-events-auto">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  “{r.feedback}”
                </p>
                <h4 className="font-semibold text-green-700 text-lg mt-4">
                  - {r.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Green Arrows */}
        <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 text-green-600 text-3xl cursor-pointer z-10">
          ❮
        </div>
        <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 text-green-600 text-3xl cursor-pointer z-10">
          ❯
        </div>

        {/* Custom Green Pagination Dots */}
        <div className="custom-pagination flex justify-center mt-6 space-x-2"></div>
      </div>
    </section>
    </div>
  );
}
