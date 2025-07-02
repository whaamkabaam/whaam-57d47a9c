
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Now I finally feel in control again.",
      author: "Jake M.",
      game: "Valorant",
      rank: "Diamond → Immortal"
    },
    {
      text: "From diamond to radiant in 3 weeks.",
      author: "Sarah K.",
      game: "Valorant", 
      rank: "Diamond → Radiant"
    },
    {
      text: "My flicks are so much more consistent now!",
      author: "Alex R.",
      game: "CS2",
      rank: "Supreme → Global"
    },
    {
      text: "Best investment I've made for my gaming setup.",
      author: "Mike T.",
      game: "Apex Legends",
      rank: "Plat → Diamond"
    },
    {
      text: "The curve changed everything. I'm hitting shots I never thought possible.",
      author: "Emma S.",
      game: "Valorant",
      rank: "Gold → Diamond"
    },
    {
      text: "Professional support and incredible results. Highly recommend!",
      author: "Chris L.",
      game: "CS2",
      rank: "MG → Supreme"
    }
  ];

  return (
    <div className="bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            <h2 className="font-anton text-6xl md:text-7xl text-white tracking-wider">
              WHAT GAMERS
              <span className="text-boom-yellow block">SAY ABOUT US</span>
            </h2>
            <div className="absolute -top-4 -right-8 w-16 h-16 bg-fire-red border-4 border-white rounded-full flex items-center justify-center transform rotate-12">
              <Quote className="text-white" size={24} />
            </div>
          </div>
          <p className="font-russo text-gray-300 text-xl max-w-2xl mx-auto">
            Real results from real gamers. See how WhaamKaBaam transformed their aim!
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="comic-panel bg-comic-black relative hover:shadow-[12px_12px_0px_0px_theme(colors.fire-red)] transition-all duration-300 hover:-translate-y-2">
              <Quote className="text-fire-red mb-4" size={32} />
              <blockquote className="font-russo text-xl text-white mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-anton text-lg text-fire-red tracking-wide">{testimonial.author}</div>
                  <div className="font-russo text-sm text-gray-400">{testimonial.game}</div>
                </div>
                <div className="bg-boom-yellow text-black px-4 py-2 rounded-full font-anton text-sm border-2 border-black">
                  {testimonial.rank}
                </div>
              </div>
              
              {/* Star Rating */}
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-boom-yellow fill-current" size={16} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="comic-panel bg-comic-black text-center">
              <div className="font-anton text-5xl text-fire-red mb-2">1500+</div>
              <div className="font-russo text-white font-bold">SATISFIED GAMERS</div>
            </div>
            <div className="comic-panel bg-comic-black text-center">
              <div className="font-anton text-5xl text-boom-yellow mb-2">98%</div>
              <div className="font-russo text-white font-bold">SUCCESS RATE</div>
            </div>
            <div className="comic-panel bg-comic-black text-center">
              <div className="font-anton text-5xl text-fire-red mb-2">4.9</div>
              <div className="font-russo text-white font-bold">AVERAGE RATING</div>
            </div>
            <div className="comic-panel bg-comic-black text-center">
              <div className="font-anton text-5xl text-boom-yellow mb-2">24/7</div>
              <div className="font-russo text-white font-bold">SUPPORT</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
