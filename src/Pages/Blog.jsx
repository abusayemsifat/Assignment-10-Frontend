import { Link } from 'react-router-dom';

const posts = [
  { id: 1, category: 'Health',      emoji: '🐕', title: '10 Signs Your Dog Needs a Vet Visit',         date: 'Mar 10, 2025', readTime: '5 min', excerpt: 'Learn to recognize early warning signs that your dog may be under the weather and needs professional attention.' },
  { id: 2, category: 'Nutrition',   emoji: '🐱', title: 'The Best Diet for Senior Cats',               date: 'Mar 5, 2025',  readTime: '7 min', excerpt: 'As cats age their nutritional requirements change significantly. Here is what every senior cat owner should know.' },
  { id: 3, category: 'Training',    emoji: '🎾', title: 'Positive Reinforcement: A Complete Guide',    date: 'Feb 28, 2025', readTime: '10 min',excerpt: 'Modern dog training has shifted toward reward-based methods. Discover why it works and how to start today.' },
  { id: 4, category: 'Adoption',    emoji: '🏡', title: 'Adopting vs Buying: What You Need to Know',   date: 'Feb 20, 2025', readTime: '6 min', excerpt: 'Millions of animals are waiting in shelters. This guide explains the adoption process and why it is so rewarding.' },
  { id: 5, category: 'Care',        emoji: '✂️', title: 'Grooming Your Pet at Home — Step by Step',   date: 'Feb 15, 2025', readTime: '8 min', excerpt: 'Save money and strengthen your bond with your pet by mastering these professional grooming techniques.' },
  { id: 6, category: 'Accessories', emoji: '📡', title: 'Top 5 Pet GPS Trackers Reviewed in 2025',    date: 'Feb 10, 2025', readTime: '9 min', excerpt: 'We tested the most popular GPS trackers so you can keep your adventurous pet safe at all times.' },
];

const catColors = {
  Health:      'badge-success',
  Nutrition:   'badge-warning',
  Training:    'badge-info',
  Adoption:    'badge-primary',
  Care:        'badge-secondary',
  Accessories: 'badge-ghost',
};

const Blog = () => (
  <div className="min-h-screen">
    <div className="bg-gradient-to-r from-primary to-sky-700 text-white py-16 px-4 text-center">
      <h1 className="text-4xl font-extrabold mb-3">PawMart Blog</h1>
      <p className="text-white/80 text-lg max-w-xl mx-auto">
        Expert tips, health guides, and heartwarming adoption stories — all
        for pet lovers.
      </p>
    </div>

    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(p => (
          <div
            key={p.id}
            className="card bg-base-100 shadow-md overflow-hidden card-hover flex flex-col h-full"
          >
            <div className="h-40 bg-gradient-to-br from-primary/10 to-sky-100 flex items-center justify-center text-7xl">
              {p.emoji}
            </div>
            <div className="card-body flex-1 flex flex-col p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`badge ${catColors[p.category] || 'badge-ghost'} badge-sm`}>
                  {p.category}
                </span>
                <span className="text-xs text-base-content/40 ml-auto">
                  {p.readTime} read
                </span>
              </div>
              <h3 className="font-bold text-base mb-2 line-clamp-2">{p.title}</h3>
              <p className="text-sm text-base-content/60 leading-relaxed flex-1 line-clamp-3">
                {p.excerpt}
              </p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-base-200">
                <span className="text-xs text-base-content/40">{p.date}</span>
                <button className="btn btn-ghost btn-xs text-primary">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-base-content/60 mb-4">
          Want pet tips delivered to your inbox?
        </p>
        <Link to="/">
          <button className="btn btn-primary">Subscribe to Newsletter</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Blog;