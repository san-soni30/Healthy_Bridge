import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const reviews = [
    { name: "Emily R.", feedback: "The personalized diet plan changed my life!" },
    { name: "John D.", feedback: "I lost 10kg in 3 months and feel healthier than ever." },
    { name: "Sophia K.", feedback: "Her guidance on balanced meals is outstanding!" },
    { name: "Michael T.", feedback: "NutriFit made meal planning stress-free and fun." },
    { name: "Olivia P.", feedback: "I feel more energetic and productive at work now." },
    { name: "David L.", feedback: "The advice on hydration completely boosted my workouts!" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const feedbackData = { rating, message };
    console.log("Submitting feedback:", feedbackData);

    // TODO: Send to backend via fetch POST
    // fetch("/api/feedback", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(feedbackData) })
  };

  return (
    <div>
      {/* Feedback Form */}
      <section id="feedback-form" className="py-16 max-w-4xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-green-700 text-center mb-6">
          Add Your Feedback
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rating (1–5)
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="">Select rating</option>
              <option value="1">⭐ 1</option>
              <option value="2">⭐⭐ 2</option>
              <option value="3">⭐⭐⭐ 3</option>
              <option value="4">⭐⭐⭐⭐ 4</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows="3"
              placeholder="Enter your feedback"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105 duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {/* Display Feedback Carousel */}
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

          {/* Custom Arrows */}
          <div className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 text-green-600 text-3xl cursor-pointer z-10">
            ❮
          </div>
          <div className="custom-next absolute right-0 top-1/2 -translate-y-1/2 text-green-600 text-3xl cursor-pointer z-10">
            ❯
          </div>

          {/* Custom Pagination */}
          <div className="custom-pagination flex justify-center mt-6 space-x-2"></div>
        </div>
      </section>
    </div>
  );
}
