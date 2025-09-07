import React, { useState } from "react";

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Top 10 Superfoods for a Healthy Lifestyle",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      description: "A blog about nutrition and superfoods",
      tags: ["health", "diet"],
      submittedAt: new Date()
    },
    {
      id: 2,
      title: "How to Create a Balanced Diet Plan",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      description: "A blog about nutrition and superfoods",
      tags: ["health", "nutrition"],
      submittedAt: new Date()
    },
    {
      id: 3,
      title: "The Truth About Carbs and Weight Loss",
      image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=800&q=80",
      description: "A blog about nutrition and superfoods",
      tags: ["health"],
      submittedAt: new Date()
    },
    {
      id: 4,
      title: "Why Hydration is Key for Good Health",
      image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=800&q=80",
      description: "A blog about nutrition and superfoods",
      tags: ["health", "nutrition"],
      submittedAt: new Date()
    },
    {
      id: 5,
      title: "Best Foods for Boosting Immunity",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80",
      description: "A blog about nutrition and superfoods",
      tags: ["health", "nutrition", "habit"],
      submittedAt: new Date()
    },
    {
      id: 6,
      title: "Meal Prep Tips for Busy Professionals",
      image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80",
      description: "A blog about nutrition and superfoods",
      tags: ["health", "nutrition", "time-management"],
      submittedAt: new Date()
    },
  ];

  // 🔹 Extract unique tags for filters
  const allTags = ["All", ...new Set(posts.flatMap(post => post.tags))];

  // 🔹 State for selected filter
  const [selectedTag, setSelectedTag] = useState("All");

  // 🔹 Filtered posts
  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter(post => post.tags.includes(selectedTag.toLowerCase()));

  return (
    <div>
      <section id="blog" className="py-16 max-w-6xl mx-auto px-6">
        <h3 className="text-3xl font-bold text-green-700 text-center mb-8">
          Latest Blogs
        </h3>

        {/* 🔹 Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {allTags.map((tag, i) => (
            <button
              key={i}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                selectedTag === tag
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-green-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* 🔹 Blog Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h4 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h4>

                <p className="text-sm text-gray-600 mb-2">
                  {post.description ? post.description.slice(0, 80) + "..." : "No description available"}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-400 mb-4">
                  {new Date(post.submittedAt).toLocaleDateString()}
                </p>

                <button className="group text-green-600 font-semibold text-xl transition-all duration-300 hover:text-green-500 hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
