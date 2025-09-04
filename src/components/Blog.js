import React from "react";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Top 10 Superfoods for a Healthy Lifestyle",
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "How to Create a Balanced Diet Plan",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "The Truth About Carbs and Weight Loss",
      img: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Why Hydration is Key for Good Health",
      img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Best Foods for Boosting Immunity",
      img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Meal Prep Tips for Busy Professionals",
      img: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80",
    },
  ];


  return (
    <div>
    <section id="blog" className="py-16 max-w-6xl mx-auto px-6">
      <h3 className="text-3xl font-bold text-green-700 text-center mb-12">
        Latest Blogs
      </h3>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            {/* Image with zoom on hover */}
            <div className="overflow-hidden">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                {post.title}
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                A quick read about healthy nutrition tips and tricks.
              </p>
              <button className="group text-green-600 font-semibold text-xl transition-all duration-300 hover:text-green-500 hover:underline">
                Read More
                <span className="inline-block text-xxl font-bold transform transition-transform duration-400 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
