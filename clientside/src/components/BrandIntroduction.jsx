import { useNavigate } from "react-router";

const BrandIntroduction = () => {

  const navigate = useNavigate()
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center bg-primary_lite">
      <div className="max-w-4xl px-5 text-center">
        {/* Top Label */}
        <div className="flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.2em] text-green-700 mb-6">
          <span className="text-base">🌱</span>
          <span>BRAND INTRODUCTION</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-8">
          Aarunya Botanicals
        </h1>

        {/* Description */}
        <p className="text-lg leading-relaxed text-green-700 mb-8">
          Aarunya Botanicals is a modern botanical skincare brand rooted in the
          richness of nature and supported by scientific innovation. We design
          clean, safe, and effective formulations that bring visible results
          without compromising skin health.
        </p>

        {/* Belief Line */}
        <p className="text-xl text-green-900 mb-10">
          We believe true beauty begins with naturally healthy skin ✨
        </p>

        {/* Button */}
        {/* <button className="inline-flex items-center justify-center rounded-xl bg-green-700 px-10 py-3.5 text-white font-semibold transition hover:bg-green-800" onClick={() => navigate("/about")}>
          About Us
        </button> */}
      </div>
    </section>
  );
};

export default BrandIntroduction;
