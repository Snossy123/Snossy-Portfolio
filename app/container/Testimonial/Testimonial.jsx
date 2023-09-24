'use client'
import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { AppWrap, MotionWrap } from '../../wrapper'; 
import './Testimonial.scss';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);
  const supabase = createClientComponentClient();

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  // useEffect(() => {
  //   const query = '*[_type == "testimonials"]';
  //   const brandsQuery = '*[_type == "brands"]';

  //   client.fetch(query).then((data) => {
  //     setTestimonials(data);
  //   });

  //   client.fetch(brandsQuery).then((data) => {
  //     setBrands(data);
  //   });
  // }, []);
  useEffect(() => {
      const getTestimonials = async () => {
          let { data: testimonialsData, error } = await supabase
              .from("testimonials")
              .select("*");

          if (error) {
              console.log("can't get Testimonials data");
          } else if (testimonialsData) {
              setTestimonials(testimonialsData);
              console.log(testimonialsData);
              console.log("Testimonials data retrieved successfully");
          }
      };
      getTestimonials();
  }, []);

  useEffect(() => {
    const getBrands = async () => {
        let { data: brandsData, error } = await supabase
            .from("brands")
            .select("*");

        if (error) {
            console.log("can't get brands data");
        } else if (brandsData) {
            setBrands(brandsData);
            console.log(brandsData);
            console.log("brands data retrieved successfully");
        }
    };
    getBrands();
  }, []);

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <Image src={testimonials[currentIndex].imgurl} alt={testimonials[currentIndex].name} width={100} height={100} className='img'/>
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].company}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            <Image src={brand.imgUrl} alt={brand.name}  width={100} height={100} className='img'/>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);
