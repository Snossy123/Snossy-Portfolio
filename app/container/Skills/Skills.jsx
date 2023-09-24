'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from "@nextui-org/react";
import { AppWrap, MotionWrap } from '../../wrapper';
import './Skills.scss';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";


const Skills = () => {
    const [experiences, setExperiences] = useState([]);
    const [experiencesYear, setExperiencesYear] = useState({});
    const [skills, setSkills] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getExperiences = async () => {
            try {
                // Fetch experiences data
                const { data: experiencesData, error } = await supabase
                    .from("experiences")
                    .select("*");

                if (error) {
                    console.log("Can't get Experiences data");
                    return;
                }

                if (experiencesData) {
                    console.log("Experiences data retrieved successfully");
                    setExperiences(experiencesData);

                    // Create an array of promises to fetch work experience data for each year
                    const yearPromises = experiencesData.map(async (experience) => {
                        const { data: workData, error } = await supabase
                            .from('workExperience')
                            .select("*")
                            .in('id', experience.works);
                        return { year: experience.year, works: workData };
                    });

                    // Wait for all promises to resolve and create the yearToWorksMap
                    const yearToWorks = await Promise.all(yearPromises);

                    // Convert the array of objects to a map
                    const yearToWorksMap = yearToWorks.reduce((acc, item) => {
                        acc[item.year] = item.works;
                        return acc;
                    }, {});

                    console.log(yearToWorksMap);
                    setExperiencesYear(yearToWorksMap);
                }
            } catch (error) {
                console.error("An error occurred while fetching data:", error);
            }
        };

        getExperiences();
    }, []);

    useEffect(() => {
        const getSkills = async () => {
            let { data: skillsData, error } = await supabase
                .from("skills")
                .select("*");

            if (error) {
                console.log("can't get Skill data");
            } else if (skillsData) {
                setSkills(skillsData);
                console.log(skillsData);
                console.log("Skill data retrieved successfully");
            }
        };
        getSkills();
    }, []);

    return (
        <>
            <h2 className="head-text">Skills & Experiences</h2>

            <div className="app__skills-container">
                <motion.div className="app__skills-list">
                    {/* Your skills mapping code */}
                    {skills.map((skill) => (
                        <motion.div
                            whileInView={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5 }}
                            className="app__skills-item app__flex"
                            key={skill.name}
                        >
                            <div
                                className="app__flex"
                                style={{ backgroundColor: skill.bgColor }}
                            >
                                <Image src={skill.icon} alt={skill.name} className='img' width={50} height={50} />
                            </div>
                            <p className="p-text">{skill.name}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <div className="app__skills-exp">
                    {experiences.map((experience) => (
                        <motion.div
                            className="app__skills-exp-item"
                            key={experience.year}
                        >
                            <div className="app__skills-exp-year">
                                <p className="bold-text">{experience.year}</p>
                            </div>
                            <motion.div className="app__skills-exp-works">
                                {(experiencesYear[experience.year] || []).map((work) => (
                                    <React.Fragment key={work.name}>
                                        <Tooltip content={work.desc}
                                            effect="solid"
                                            arrowColor="#fff"
                                            className="skills-tooltip"
                                        >
                                            <motion.div
                                                whileInView={{ opacity: [0, 1] }}
                                                transition={{ duration: 0.5 }}
                                                className="app__skills-exp-work"
                                                data-tip
                                                data-for={work.name}
                                            >
                                                <h4 className="bold-text">{work.name}</h4>
                                                <p className="p-text">{work.company}</p>
                                            </motion.div>
                                        </Tooltip>
                                    </React.Fragment>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};


export default AppWrap(
    MotionWrap(Skills, 'app__skills'),
    'skills',
    'app__whitebg',
);
