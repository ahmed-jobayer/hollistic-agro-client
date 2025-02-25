const PlatformInformation = () => {
  return (
    <div className="bg-[#f3f3f3] p-3 flex flex-col gap-10 py-12 mt-14 lg:flex-row lg:py-28 lg:justify-evenly">
      <div className="flex items-center gap-3">
        <img src="/icon1.png" className="rounded-full" alt="" />
        <div>
            <h2 className="text-xl mb-2">নিরাপদ পেমেন্ট</h2>
            <p>বিভিন্ন পেমেন্ট পদ্ধতি থেকে বেছে নিন</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img src="/icon2.png" alt="" />
        <div>
            <h2 className="text-xl mb-2">গ্রিন ডেলিভারি</h2>
            <p>৩-৫ দিনের মধ্যে আপনার পণ্য পৌছে যাবে</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img src="/icon3.png" alt="" />
        <div>
            <h2 className="text-xl mb-2">১০০% ভালো পণ্যের নিশ্চয়তা            </h2>
            <p>মৎস্য উদ্যোক্তাদের সফলতায় আমরা প্রতিশ্রুতিবদ্ধ</p>
        </div>
      </div>
    </div>
  );
};

export default PlatformInformation;
