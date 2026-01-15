const BrandIntroduction = () => {
  return (
    <section className="w-full min-h-[90vh] flex items-center justify-center bg-primary_lite">
      <div className="max-w-4xl px-5 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold tracking-[0.2em] text-green-700 mb-6">
          <span className="text-base">🌱</span>
          <span>BRAND INTRODUCTION</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-8">
          Aarunya Botanicals
        </h1>

        <p className="text-lg leading-relaxed text-green-700 mb-8">
          Aarunya Botanicals is an Ayurvedic wellness brand rooted in classical
          Ayurvedic principles and guided by years of clinical experience and
          research. We develop carefully formulated herbal products designed to
          support overall health and metabolic balance, using time-tested
          ingredients and responsible practices.
        </p>

        <p className="text-xl text-green-900 mb-10">
          We believe true well-being begins with balance, awareness, and natural
          support.
        </p>
      </div>
    </section>
  );
};

export default BrandIntroduction;
