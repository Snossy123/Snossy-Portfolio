"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getAbouts = async () => {
      let { data: aboutsData, error } = await supabase
        .from("abouts")
        .select("*");

      if (error) {
        console.log("can't get about data");
      } else if (aboutsData) {
        setAbouts(aboutsData);
        console.log(aboutsData);
        console.log("about data retrived successfully");
      }
    };
    getAbouts();
  }, []);

  return (
    <>
      <h2 className="head-text">
        I Know that <span>Good Design</span> <br />
        means <span>Good Business</span>
      </h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about.title + index}
          >
            <Image
              src={about.imgUrl}
              alt={about.title}
              width={170}
              height={170} // You can set a fixed height here
              className="img"
            />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
