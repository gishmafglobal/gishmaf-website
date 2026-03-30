import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();

  const posts = [
    {
      title: "How Reading Books Can Transform Your Life",
      excerpt:
        "Discover how consistent reading can improve your mindset, increase knowledge, and open new opportunities.",
      content: `
Reading is one of the most powerful habits anyone can develop. It exposes you to new ideas, improves your thinking ability, and helps you understand the world better.

Books provide knowledge that can shape your decisions, improve your confidence, and guide you through life challenges. Whether it is personal development, business, or life experiences, reading consistently gives you an advantage.

At Gishmaf Global Concept, we encourage everyone to make reading a daily habit for continuous growth and transformation.
      `,
    },
    {
      title: "Top 5 Skills You Need to Succeed in 2026",
      excerpt:
        "Learn the most valuable skills that can help you stay ahead and succeed in today’s fast-changing world.",
      content: `
In today’s world, having the right skills is more important than ever. Technology and global changes have made adaptability a key factor for success.

Some of the most valuable skills include problem-solving, communication, digital literacy, critical thinking, and creativity. These skills help you remain relevant and competitive in any field.

By continuously learning and improving your skills, you increase your chances of achieving your goals and building a successful future.
      `,
    },
    {
      title: "How to Build a Growth Mindset",
      excerpt:
        "Understand how your mindset affects your success and how to develop a positive and growth-oriented mindset.",
      content: `
A growth mindset is the belief that your abilities and intelligence can improve through effort and learning.

People with a growth mindset embrace challenges, learn from failures, and continuously seek improvement. This mindset is essential for long-term success.

By changing how you think and respond to challenges, you can unlock your full potential and achieve more than you ever imagined.
      `,
    },
    {
      title: "Why Knowledge is the Key to Success",
      excerpt:
        "Explore why knowledge remains one of the most powerful tools for achieving success in life.",
      content: `
Knowledge gives you the power to make informed decisions and take the right actions at the right time.

In a world full of competition, those who continuously learn and grow will always stand out. Knowledge not only improves your opportunities but also builds confidence and independence.

Investing in knowledge through books, learning platforms, and experience is one of the best decisions you can make for your future.
      `,
    },
  ];

  return (
    <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Blog & Insights</h1>

      <p>
        Welcome to our blog section, where we share valuable insights on personal
        development, skills, knowledge, and growth. Our goal is to provide useful
        content that helps you learn, improve, and succeed.
      </p>

      <div style={{ marginTop: "30px" }}>
        {posts.map((post, index) => (
          <div
            key={index}
            style={{
              marginBottom: "30px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/blog/${index}`)}
          >
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </section>
  );
}