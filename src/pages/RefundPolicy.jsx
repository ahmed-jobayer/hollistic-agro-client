
import useAuth from "../hooks/useAuth";
const RefundPolicy = () => {
    const {bannerUrl} = useAuth()
  return (
    <div>
      <img
        className="w-full"
        src={bannerUrl?.image1}
        alt=""
      />
      <div className="container mx-auto max-w-5xl flex flex-col gap-4 my-12 tracking-wide textarea-md">
        <h2 className="text-center my-3 font-bold text-xl">
        হলিস্টিক এগ্রো  রিফান্ড পলিসি
        </h2>

        <p>
        আপনার রিফান্ড প্রসেসিংয়ের সময় নির্ভর করে রিফান্ডের ধরন এবং আপনি যে পেমেন্ট পদ্ধতি ব্যবহার করেছেন তার উপর।

        </p>
        <p>
        ঘরেরবাজার যখন আপনার রিফান্ডের ধরন অনুযায়ী আপনার রিফান্ড প্রক্রিয়া করে তখন থেকে রিফান্ডের সময়/প্রক্রিয়া শুরু হয়।

        </p>
        <p>
        রিফান্ডের পরিমাণ আপনার ফেরত পণ্যের জন্য পণ্যের মূল্য এবং শিপিং ফি কভার করে।

        </p>
<p>যেকোনো সমস্যার জন্য আমাদের নাম্বারে যোগাযোগ করুন:   <a href="tel:+8801733326363">মোবাইল নং: ০১৭৩৩-৩২৬৩৬৩</a></p>
      </div>
    </div>
  );
};

export default RefundPolicy;
