"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const aboutsData =[
  {
    id: 1,
    createdAt: "2023-09-20 19:11:23.267791+00",
    title: "Fast",
    description: "Fast load times and lag free interaction, my highest priority.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/about01.png?t=2023-09-20T20%3A10%3A48.487Z",
  },
  {
    id: 2,
    createdAt: "2023-09-20 19:13:26.924869+00",
    title: "Intuitive",
    description: "Strong preference for easy to use, intuitive UX/UI.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/about02.png",
  },
  {
    id: 4,
    createdAt: "2023-09-20 19:28:10.949552+00",
    title: "Responsive",
    description: "My layouts will work on any device, big or small.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/about04.png",
  },
  {
    id: 3,
    createdAt: "2023-09-20 19:27:16.520439+00",
    title: "Dynamic",
    description: "Websites don't have to be static, I love making pages come to life.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/about03.png",
  },
  {
    id: 5,
    createdAt: "2023-09-22 12:21:11.747+00",
    title: "Backend Development",
    description: "I specialize in building robust and scalable backend systems that power your applications. From designing databases to creating APIs, I've got the backend covered.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/database.png",
  },
  {
    id: 6,
    createdAt: "2023-09-22 12:30:09.171931+00",
    title: "Database Management",
    description:
      "Managing data efficiently is key to any successful application. I excel in setting up, optimizing, and maintaining databases to ensure your data is always accessible and secure.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/database2.png",
  },
  {
    id: 7,
    createdAt: "2023-09-22 12:34:05.594207+00",
    title: "CMS",
    description:
      "I'm well-versed in CMS platforms like WordPress, making it easy for you to manage your website's content efficiently and keep it up-to-date.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/dashboard.png",
  },
  {
    id: 8,
    createdAt: "2023-09-22 12:37:11.843216+00",
    title: "Data Analytics",
    description:
      "I have a strong background in data analytics, helping businesses gain insights from their data to make informed decisions and drive growth.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/report.png",
  },
  {
    id: 9,
    createdAt: "2023-09-22 12:39:31.477032+00",
    title: "Security",
    description:
      "Security is paramount in today's digital landscape. I'm well-versed in implementing industry best practices to safeguard your applications and data from threats and vulnerabilities.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/security.png",
  },
  {
    id: 10,
    createdAt: "2023-09-22 12:41:38.937337+00",
    title: "API Development",
    description:
      "I have a knack for crafting APIs that allow your applications to communicate seamlessly with the backend, enabling a smooth flow of data and functionality.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/API3.png",
  },
  {
    id: 11,
    createdAt: "2023-09-22 12:46:06.70539+00",
    title: "API Integration",
    description:
      "Integrating third-party APIs is my expertise. I can seamlessly incorporate external services to enhance your application's capabilities and provide real-time data.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/API2.png",
  },
  {
    id: 12,
    createdAt: "2023-09-22 13:20:46.365493+00",
    title: "Data Science",
    description:
      "I am a deep learning and machine learning practitioner and learner. Solving a problem and gaining insights with the help of machine learning algorithms has always seemed to be a superpower for me. I am here to solve things, Learning a lot in the process.",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/openAI%20(1).jpg",
  },
];

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching data (Replace this with actual Supabase fetch logic if needed)
      setAbouts(aboutsData);
    };
    fetchData();
  }, []);

  return (
    <div className="about-container">
      <h2 className="head-text">
        I Know that <span>Good Design</span> <br />
        means <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            key={about.title + index}
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
          >
            <Image
              src={about.imgUrl}
              alt={about.title}
              width={170}
              height={170}
              className="img"
            />
            <h2 className="bold-text" style={{ marginTop: "20px" }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: "10px" }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
