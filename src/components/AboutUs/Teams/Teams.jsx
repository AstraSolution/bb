"use client"

import Image from "next/image";

const Teams = () => {
  const teams = [
    {
      img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260",
      name: "Shahriar Rafi",
      title: "Web Developer",
    },
    {
      img: "https://i.ibb.co/28RvMyT/about1.jpg",
      name: "SIYAM AHMED",
      title: "Front-End Web Developer",
    },
    {
      img: "https://i.ibb.co/brgTnQr/muammad-minhajul-alam.png",
      name: "Mohammad Minhajul Alam",
      title: "Web Developer",
    },
    {
      img: "https://i.ibb.co/jhR7438/Atik.jpg",
      name: "Atik Shahriar",
      title: "Web Developer",
    },
    {
      img: "https://i.ibb.co/DgNPrbV/429453143-733783798531919-7206945882981816927-n.png",
      name: "MD Parvej",
      title: "Web Developer",
    },
    {
      img: "https://i.ibb.co/28RvMyT/about1.jpg",
      name: "MD Siyam Ahmed",
      title: "Web Developer",
    },
    {
      img: "https://i.ibb.co/sH9rW6p/Apon-02.jpg",
      name: "Md Taiatul Islam Apon",
      title: "Web Developer",
    },
  ];

  return (
    <div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-[#016961]">
        <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
          <h2 className="mb-2 text-2xl md:text-3xl lg:text-4xl text-center font-bold">
            Meet Our Teams
          </h2>
        </div>

        <div className="grid gap-10 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, key) => (
            <div key={key} className="flex flex-col items-center">
              <Image
                className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                src={team?.img}
                width={100}
                height={100}
                priority
                alt="Member"
              />
              <div className="flex flex-col items-center">
                <p className="text-lg font-bold">{team.name}</p>
                <p className="text-sm text-gray-800">{team.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;
