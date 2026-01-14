import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-md">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt=""
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">ADDRESS</p>
          <p className="text-gray-500">
            Anand Vatika, Shri Gaur Niat Marg
            <br/> 
            Near: Nagaria Prathamik Swastha Kendra
            <br/>
            Chaitanya Vihar, Vrindavan (Mathura, Uttar Pradesh)
            <br/>
            281121
          </p>
          <p className="text-gray-500">
            Tel: (+91) 8679284623 <br /> Email: <a href="mailto:aarunyabotanical@gmail.com" className="underline text-blue-600">aarunyabotanicals@gmail.com</a>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Contact;
