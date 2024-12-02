'use client'
import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion'; 

import { AppWrap, MotionWrap } from '../../wrapper';
import './Work.scss';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

// (id, created_at, title, description, "projectLink", "codeLink", "imgUrl", tags)
const worksData = [
  {
    id: 2,
    created_at: "2023-09-20 20:44:52.931768+00",
    title: "Modern UI/UX Website",
    description: "A modern UI/UX portfolio website",
    projectLink: "https://medium-clone-nextjs-supabase.vercel.app/",
    codeLink: "https://github.com/Snossy123/medium-clone-nextjs-supabase",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/about03.png",
    tags: ["UI/UX", "All"],
  },
  {
    id: 3,
    created_at: "2023-09-20 20:58:49.926499+00",
    title: "ECommerce Website",
    description: "Modern Full Stack ECommerce App",
    projectLink: "https://snossyecommerce.000webhostapp.com/",
    codeLink: "https://github.com/Snossy123/ecommerce-xano-stripe",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/about02.png",
    tags: ["React JS", "All"],
  },
  {
    id: 16,
    created_at: "2023-09-23 12:18:27.59517+00",
    title: "Image Quantization",
    description: "Image quantization is a lossy compression technique used in image processing using C#.",
    projectLink: "https://github.com/Snossy123/projects-for-college/tree/main/Algorithm%20Projects",
    codeLink: "https://github.com/Snossy123/projects-for-college/tree/main/Algorithm%20Projects",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/sparks.png",
    tags: ["Algorithm", "College", "C#"],
  },
  {
    id: 6,
    created_at: "2023-09-22 14:59:11.736709+00",
    title: "Transportation Management System",
    description:
      "The system serves as a reservation platform for bus trips, primarily utilized by a booking office.",
    projectLink:
      "https://github.com/Snossy123/Transportation-Management-System/blob/main/phase%202/DBTMS.sql",
    codeLink: "https://github.com/Snossy123/Transportation-Management-System",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/database.png",
    tags: ["Database", "All", "Team Work", "College"],
  },
  {
    id: 4,
    created_at: "2023-09-20 21:02:50.465+00",
    title: "Medium Clone Website",
    description: "A Medium clone website built using Next.js and Supabase.",
    projectLink: "https://medium-clone-nextjs-supabase.vercel.app/",
    codeLink: "https://github.com/Snossy123/medium-clone-nextjs-supabase",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/about01.png",
    tags: ["NextJs", "React", "Supabase", "HTML", "CSS", "JS", "Full Stack", "All"]
  },
  {
    id: 10,
    created_at: "2023-09-23 11:00:26.110+00",
    title: "Fitness Trainer",
    description: "A landing page for a fitness trainer designed with HTML, CSS, and JavaScript.",
    projectLink: "https://snossyfitness.000webhostapp.com/",
    codeLink: "https://github.com/Snossy123/Fitness-Trainer",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/fitness.png",
    tags: ["Frontend", "HTML", "JS", "CSS", "All"]
  },
  {
    id: 11,
    created_at: "2023-09-23 11:14:46.696+00",
    title: "Accenture Internship",
    description: "Participated in a virtual internship as a data analyst, working with a talented team.",
    projectLink: "https://www.theforage.com/virtual-internships/prototype/hzmoNKtzvAzXsEqx8/Data-Analytics-Virtual-Experience",
    codeLink: "https://github.com/Snossy123/Accenture-Internship",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/accenture.png",
    tags: ["Data Analysis", "All"]
  },
  {
    id: 14,
    created_at: "2023-09-23 11:55:38.814+00",
    title: "Topology API",
    description: "API for managing and storing device topologies using JSON files and enabling queries.",
    projectLink: "https://raw.githubusercontent.com/Snossy123/Topology-API/main/Test_API_Topology.jpg",
    codeLink: "https://github.com/Snossy123/Topology-API",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/API2.png",
    tags: ["Java", "API", "Testing", "Backend", "All"]
  },
  {
    id: 17,
    created_at: "2023-09-23 12:26:02.464+00",
    title: "Quiz App",
    description: "An Android application developed during summer training, serving as a quiz app using Java.",
    projectLink: "https://github.com/Snossy123/projects-for-college/tree/main/Android%20Project/Quiz-App-main",
    codeLink: "https://github.com/Snossy123/projects-for-college/tree/main/Android%20Project/Quiz-App-main",
    imgUrl: "https://cdn.dribbble.com/users/73294/screenshots/2206675/media/c45030a530c18d0c90febce1da6aea65.png?resize=768x576&vertical=center",
    tags: ["Android", "Java", "Mobile", "College"]
  },
  {
    id: 7,
    created_at: "2023-09-22 15:11:33.148+00",
    title: "Real Time Currency Converter",
    description: "An app used to convert the value of one currency into another currency.",
    projectLink: "https://github.com/Snossy123/Real-time-Currency-Converter/blob/main/testing.PNG?raw=true",
    codeLink: "https://github.com/Snossy123/Real-time-Currency-Converter",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/Real%20time%20currency%20converter.png",
    tags: ["Python", "All"]
  },
  {
    id: 13,
    created_at: "2023-09-23 11:34:04.560+00",
    title: "Matrix Flatten",
    description: "A program to store a 3D matrix in a 1D vector (flattened).",
    projectLink: "https://camo.githubusercontent.com/6306e94a88469ffa517a9130f9455b092202b01ec7c28d39524d00ad148ecdbe/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f7a6d3748522e676966",
    codeLink: "https://github.com/Snossy123/Matrix-Flatten",
    imgUrl: "https://camo.githubusercontent.com/6306e94a88469ffa517a9130f9455b092202b01ec7c28d39524d00ad148ecdbe/68747470733a2f2f692e737461636b2e696d6775722e636f6d2f7a6d3748522e676966",
    tags: ["C++", "All"]
  },
  {
    id: 18,
    created_at: "2023-09-23 12:58:36.351+00",
    title: "Tiny Language",
    description: "A compiler built with C# for a Tiny Language.",
    projectLink: "https://github.com/Snossy123/projects-for-college/tree/main/Compiler%20with%20C%23%20For%20Tiny%20Language",
    codeLink: "https://github.com/Snossy123/projects-for-college/tree/main/Compiler%20with%20C%23%20For%20Tiny%20Language",
    imgUrl: "https://imgs.search.brave.com/CUn1CtImf51zm6psH6qIg77bmKi-dDhLTbAxUX3kXQk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jbG91/ZC5naXRodWJ1c2Vy/Y29udGVudC5jb20v/YXNzZXRzLzk1Mjc4/My8yMTU3OTI5MC81/NzU1Mjg4YS1jZjc1/LTExZTYtOTBlMC0w/Mjk1MjlhNDRhMzgu/cG5n",
    tags: ["Compiler", "C#", "College"]
  },
  {
    id: 12,
    created_at: "2023-09-23 11:21:23.270+00",
    title: "Function Plotter",
    description: "A GUI program that plots arbitrary user-entered functions.",
    projectLink: "https://github.com/Snossy123/Function-Plotter/blob/main/test/test1%20valid%20Input.jpg?raw=true",
    codeLink: "https://github.com/Snossy123/Function-Plotter",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/function%20plot%20ex.png",
    tags: ["Python", "Frontend", "Testing", "All"]
  },
  {
    id: 15,
    created_at: "2023-09-23 12:07:35.949+00",
    title: "Sparks Foundation Internship",
    description: "Work done during the Sparks Foundation Internship in Data Science and Business Analytics.",
    projectLink: "https://github.com/Snossy123/The_Sparks_Foundation_Internship",
    codeLink: "https://github.com/Snossy123/The_Sparks_Foundation_Internship",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/sparks.png",
    tags: ["Data Analysis", "ML", "Python", "All"]
  },
  {
    id: 19,
    created_at: "2023-09-23 13:05:31.085+00",
    title: "Pepsi Advertisement",
    description: "A computer graphics project creating a Pepsi advertisement using Blender.",
    projectLink: "https://github.com/Snossy123/projects-for-college/tree/main/Computer%20Graphics%20Projects",
    codeLink: "https://github.com/Snossy123/projects-for-college/tree/main/Computer%20Graphics%20Projects",
    imgUrl: "https://cdn.dribbble.com/userupload/10139579/file/original-ae082709917c215f9c4a21be93ba2f8b.jpeg?resize=752x",
    tags: ["Computer Graphics", "College"]
  },
  {
    id: 9,
    created_at: "2023-09-22 16:28:59.960+00",
    title: "Coffee House",
    description: "A project simulating the operations of a coffee shop, managing orders, inventory, and customer interactions.",
    projectLink: "https://snossycoffee.000webhostapp.com/",
    codeLink: "https://github.com/Snossy123/Coffee-House",
    imgUrl: "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/coffe_house.jpg",
    tags: ["Frontend", "HTML", "JS", "JQuery", "CSS", "Bootstrap", "All"]
  },
  {
    "id": 20,
    "timestamp": "2023-09-23 13:14:38.6514+00",
    "title": "Text Editor",
    "description": "A C++ text editor that includes methods for adding, inserting, retrieving, deleting, finding, and replacing lines of text within a file.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Data%20Structure%20Project/Text-Editor",
    "image": "https://cdn.dribbble.com/users/376456/screenshots/3156203/shot--composer.png?resize=768x576&vertical=center",
    "tags": ["Data Structure", "C++", "College"]
  },
  {
    "id": 21,
    "timestamp": "2023-09-23 13:18:49.160734+00",
    "title": "Xonix Game",
    "description": "A classic Xonix game with new features, developed using C++.",
    "youtube": "https://www.youtube.com/watch?v=cLN3Mm5uLuI",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Gaming%20Project/xonixGame-master",
    "image": "https://cdn.dribbble.com/users/3255444/screenshots/9424041/media/d2d6ea3c9a5075f503efe2846336c95e.jpg?resize=768x576&vertical=center",
    "tags": ["Structure Programming", "C++", "College"]
  },
  {
    "id": 22,
    "timestamp": "2023-09-23 13:27:08.457254+00",
    "title": "Car Price Prediction",
    "description": "A machine learning project using Python to predict car prices based on attributes such as car maker, year, and kilometers driven.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Machine%20Learning%20Projects/Assignment%20ML%20Polynomial%20Regression",
    "image": "https://cdn.dribbble.com/users/1304341/screenshots/3481365/media/e821428c57145f191452b4f9e176d1c3.jpg?resize=768x576&vertical=center",
    "tags": ["ML", "Python", "College"]
  },
  {
    "id": 8,
    "timestamp": "2023-09-22 15:32:50.573904+00",
    "title": "House Price Prediction",
    "description": "A Python-based machine learning project predicting house prices using attributes such as house age and the number of nearby convenience stores.",
    "github": "https://github.com/Snossy123/Machine-Learning-From-Scratch",
    "image": "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/House.png",
    "tags": ["ML", "College", "Python"]
  },
  {
    "id": 23,
    "timestamp": "2023-09-23 14:07:26.212806+00",
    "title": "Binary Image Classification",
    "description": "A machine learning project focused on image classification to identify whether an image is a cat or a dog.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Machine%20Learning%20Projects/assignment%20ML%20Image%20Classification",
    "image": "https://cdn.dribbble.com/userupload/8639277/file/original-e78e5040756543a5e1aedb8614462877.jpg?resize=752x564",
    "tags": ["ML", "Python", "College"]
  },
  {
    "id": 24,
    "timestamp": "2023-09-23 14:16:51.901965+00",
    "title": "Player Value Prediction",
    "description": "A project to apply different machine learning algorithms to real-world tasks, focusing on predicting player values.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Machine%20Learning%20Projects/football-predictionep",
    "image": "https://cdn.dribbble.com/users/132362/screenshots/1850857/transfer-list-goal.com.jpg?resize=768x576&vertical=center",
    "tags": ["ML", "Python", "College"]
  },
  {
    "id": 25,
    "timestamp": "2023-09-23 14:20:59.385823+00",
    "title": "Fake News Detection",
    "description": "A Python project employing Natural Language Processing (NLP) techniques to create a system for detecting fake news.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Natural%20Language%20Processing",
    "image": "https://cdn.dribbble.com/users/393983/screenshots/3336307/media/b6943e100c2f74453db8a425db61484c.jpg?resize=768x576&vertical=center",
    "tags": ["NLP", "Python", "College"]
  },
  {
    "id": 26,
    "timestamp": "2023-09-23 14:33:35.164123+00",
    "title": "Network HTTP Server",
    "description": "A Network HTTP Server implemented using C#.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Networking/Network%20HTTP%20Server",
    "image": "https://cdn.dribbble.com/users/2880537/screenshots/10490258/media/5403759e08d0a7868801c84af5532815.png?resize=768x576&vertical=center",
    "tags": ["Networking", "C#", "College"]
  },
  {
    "id": 27,
    "timestamp": "2023-09-23 14:36:53.487179+00",
    "title": "TCP File Transfer",
    "description": "A C# project for transferring files from server to client using TCP.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Networking/TCP%20Transfer%20file%20from%20server%20to%20client",
    "image": "https://cdn.dribbble.com/users/6116014/screenshots/14749797/media/2a4dbb407168ce78cd84df748fc6fe58.png?resize=768x576&vertical=center",
    "tags": ["Networking", "C#", "College"]
  },
  {
    "id": 29,
    "timestamp": "2023-09-23 15:31:13.519028+00",
    "title": "FOS OS",
    "description": "An operating system project focused on memory management, implemented in C.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Operating%20System%20Projects/project%20operating%20system%20Memory%20Management",
    "image": "https://cdn.dribbble.com/users/29112/screenshots/719137/attachments/67691/PurgeMemory_icon_view.png?resize=768x576&vertical=center",
    "tags": ["Operating System", "C", "C++", "College"]
  },
  {
    "id": 30,
    "timestamp": "2023-09-23 15:38:59.606653+00",
    "title": "Digital Clock",
    "description": "A Python project creating a live digital clock.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Python%20Projects/Digital%20Clock",
    "image": "https://cdn.dribbble.com/userupload/7481291/file/original-f109391c4acc7c6beb13607307a6ed37.png?resize=752x564",
    "tags": ["Python"]
  },
  {
    "id": 31,
    "timestamp": "2023-09-23 15:44:42.004992+00",
    "title": "YouTube Downloader",
    "description": "A Python application to download any video or playlist in various qualities.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Python%20Projects/Download-Youtube",
    "image": "https://cdn.dribbble.com/users/1993256/screenshots/20211841/media/510a0f9c8c9c8b39b892d96950f91d29.png?resize=768x576&vertical=center",
    "tags": ["Python"]
  },
  {
    "id": 32,
    "timestamp": "2023-09-23 15:46:37.95028+00",
    "title": "MP3 Player",
    "description": "A music player application for managing and listening to music files.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Python%20Projects/MP3%20Player",
    "image": "https://cdn.dribbble.com/users/13367417/screenshots/20342801/media/41a056c2b5c45855695d61d481b2a824.png?resize=768x576&vertical=center",
    "tags": ["Python"]
  },
  {
    "id": 33,
    "timestamp": "2023-09-23 16:02:11.692467+00",
    "title": "Restaurant Management System (RMS)",
    "description": "Developed a restaurant management system using C# and Oracle DB.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Software%20Engineer%20Projects/Mainstream_103_RestaurantManagementSystem",
    "image": "https://cdn.dribbble.com/users/9102492/screenshots/16449071/media/a1301421577806ed7679f3e7c1e4a552.jpg?resize=768x576&vertical=center",
    "tags": ["Software Engineering", "C#", "College"]
  },
  {
    "id": 34,
    "timestamp": "2023-09-23 16:04:26.15357+00",
    "title": "Software Piracy Protection",
    "description": "Designed a software piracy protection system.",
    "github": "https://github.com/Snossy123/projects-for-college/tree/main/Software%20Engineer%20Projects/Software%20Piracy%20Protection%20Project",
    "image": "https://xztrvbzwbwrxkhpkblaq.supabase.co/storage/v1/object/public/about/security.png",
    "tags": ["System Analysis & Design", "College"]
  },
  {
    "id": 35,
    "timestamp": "2023-09-24 11:18:05.634838+00",
    "title": "Feedback Form",
    "description": "Dynamic feedback form generator using Laravel.",
    "github": "https://github.com/Snossy123/FeedbackForm",
    "image": "https://cdn.dribbble.com/userupload/3930041/file/original-e6b8edda48e3f3e765c0c4b52a2cb35d.jpg?resize=1024x768",
    "tags": ["Laravel", "PHP", "All"]
  },
  {
    "id": 28,
    "timestamp": "2023-09-23 15:04:26.413708+00",
    "title": "Clinic Management System",
    "description": "Developed a clinic management system using Java, MySQL, OOP concepts, and GUI.",
    "github": "https://github.com/Snossy123/Clinic-Management-System",
    "image": "https://cdn.dribbble.com/users/9520793/screenshots/20326211/media/d747ec38b80770c662b450c32774ba26.png?resize=400x300&vertical=center",
    "tags": ["Java", "Database", "OOP", "College"]
  },
  {
    "id": 36,
    "timestamp": "2023-09-24 11:25:33.015215+00",
    "title": "WQU Internship",
    "description": "Worked on WQU data science challenges.",
    "github": "https://github.com/Snossy123/WQU-data-science-lab",
    "image": "https://imgs.search.brave.com/o0rSxOKMMC9zr-lVmH9MI1bjf_m01g0X_HS39bRmQXo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3JlZGx5LmNv/bS9zaXplLzExMHgx/MTAvaW1hZ2VzLzFh/Yzc0MTc4LTg5NzQt/NDI2YS05Zjg0LTNi/OTczYmM1ZGMwOS9X/UVVfQ3JlZGx5X0Rh/dGFTY2llbmNlMl9X/aXRoSG9ub3JzLnBu/Zw",
    "tags": ["Data Science", "Data Analysis", "Python", "SQL", "All"]
  },
  {
    "id": 37,
    "timestamp": "2023-09-24 11:48:57.155732+00",
    "title": "Problem-Solving Training",
    "description": "Solutions to LeetCode problems developed over a six-month training period.",
    "github": "https://github.com/Snossy123/Problem-Solving-Training",
    "image": "https://cdn.dribbble.com/users/730703/screenshots/9689402/media/e47e29d884ce54173a46c4442e4cb2bb.jpg?resize=800x600&vertical=center",
    "tags": ["Problem Solving", "Data Structure", "Algorithm", "PHP", "JS", "All"]
  },
  {
    "id": 38,
    "timestamp": "2023-09-24 12:01:58.244895+00",
    "title": "Graduation Project",
    "description": "Developed an AI-based software for diagnosing cardiovascular diseases.",
    "github": "https://github.com/Snossy123/Artificial-Intelligence-Software-For-Diagnosis-Of-Cardiovascular-Diseases/tree/main/Artificial-Intelligence-Software-For-Diagnosis-Of-Cardiovascular-Diseases",
    "image": "https://cdn.dribbble.com/users/4506667/screenshots/14492641/media/6de2720d067de8107641c12e6acbd0db.png?resize=1200x900&vertical=center",
    "tags": ["GP", "DL", "Python", "DSP", "All"]
  }
];


const Work = () => {
  const [works, setWorks] = useState([]);
  const [filteredWorks, setFilteredWorks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Mocking a data fetch as worksData is locally available
    const fetchWorks = async () => {
      try {
        if (worksData) {
          setWorks(worksData);
          setFilteredWorks(worksData);
          console.log('Works data retrieved successfully:', worksData);
        }
      } catch (error) {
        console.error("Couldn't fetch works data:", error);
      }
    };

    fetchWorks();
  }, []);

  const handleWorkFilter = (filter) => {
    setActiveFilter(filter);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      if (filter === 'All') {
        setFilteredWorks(works);
      } else {
        setFilteredWorks(works.filter((work) => work.tags.includes(filter)));
      }
    }, 500);
  };

  return (
    <>
    <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

    <div className="app__work-filter">
      {["Laravel", "PHP", "C#", "Testing", "Java", "API", "Backend", "C++", "Data Analysis", "Frontend", "HTML", "JS", "JQuery", "CSS", "Bootstrap", "ML", "Python", "Database", "Team Work", "College", 'UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
        <div
          key={index}
          onClick={() => handleWorkFilter(item)}
          className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
        >
          {item}
        </div>
      ))}
    </div>

    <motion.div
      animate={animateCard}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__work-portfolio"
    >
      {filterWork.map((work, index) => (
        <div className="app__work-item app__flex" key={index}>
          <div
            className="app__work-img app__flex"
          >
            <img src={work.imgUrl} alt={work.name} />

            <motion.div
              whileHover={{ opacity: [0, 1] }}
              transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
              className="app__work-hover app__flex"
            >
              <a href={work.projectLink} target="_blank" rel="noreferrer">

                <motion.div
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 0.90] }}
                  transition={{ duration: 0.25 }}
                  className="app__flex"
                >
                  <AiFillEye />
                </motion.div>
              </a>
              <a href={work.codeLink} target="_blank" rel="noreferrer">
                <motion.div
                  whileInView={{ scale: [0, 1] }}
                  whileHover={{ scale: [1, 0.90] }}
                  transition={{ duration: 0.25 }}
                  className="app__flex"
                >
                  <AiFillGithub />
                </motion.div>
              </a>
            </motion.div>
          </div>

          <div className="app__work-content app__flex">
            <h4 className="bold-text">{work.title}</h4>
            <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

            <div className="app__work-tag app__flex">
              <p className="p-text">{work.tags[0]}</p>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  </>
);
};

export default Work;