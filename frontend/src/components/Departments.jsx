import React from 'react';

//react-multi-carousel mahnun google vr search krayche npm cha site vr jayche tith khali he import mnun ahe te copy krun paste kraycghe
//hyacha use animation sathi hoto
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



//ha superLargeDesktop ha code npm react-multiicarousel varun download kela ahe tith example ahe
//apn superLargeDesktp la konte pn name deun change kru shkto
//hya mdhe jasi sceen size ahe tshe ky change honar te code dilele ahe.

// superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1
//   }
// };
//     <Carousel responsive={responsive}>
//   <div>Item 1</div>
//   <div>Item 2</div>
//   <div>Item 3</div>
//   <div>Item 4</div>
// </Carousel>;


const Departments = () => {
    const departmentsArray = [
        {
            name: "Pediatrics",
            imageUrl: "/departments/pedia.jpg",
        },
        {
            name: "Orthopedics",
            imageUrl: "/departments/ortho.jpg",
        },
        {
            name: "Cardiology",
            imageUrl: "/departments/cardio.jpg",
        },
        {
            name: "Neurology",
            imageUrl: "/departments/neuro.jpg",
        },
        {
            name: "Oncology",
            imageUrl: "/departments/onco.jpg",
        },
        {
            name: "Radiology",
            imageUrl: "/departments/radio.jpg",
        },
        {
            name: "Physical Therapy",
            imageUrl: "/departments/therapy.jpg",
        },
        {
            name: "Dermatology",
            imageUrl: "/departments/derma.jpg",
        },
        {
            name: "ENT",
            imageUrl: "/departments/ent.jpg",
        },
    ];

    const responsive = {
        extraLarge: {
            breakpoint: { max: 3000, min: 1324 },
            items: 4,
            slidesToSlide: 1, // optional, default to 1.
        },
        large: {
            breakpoint: { max: 1324, min: 1005 },
            items: 3,
            slidesToSlide: 1, // optional, default to 1.
        },
        medium: {
            breakpoint: { max: 1005, min: 700 },
            items: 2,
            slidesToSlide: 1, // optional, default to 1.
        },
        small: {
            breakpoint: { max: 700, min: 0 },
            items: 1,
            slidesToSlide: 1, // optional, default to 1.
        },
    };

    return (
        <>
            <div className="container departments">
                <h2>Departments</h2>
                <Carousel
                    responsive={responsive}
                    removeArrowOnDeviceType={[
                        // "superLargeDesktop",
                        // "desktop",
                        "tablet",
                        "mobile",
                    ]}
                >
                    {departmentsArray.map((depart, index) => {
                        return (
                            <div key={index} className="card">
                                <div className="depart-name">{depart.name}</div>
                                <img src={depart.imageUrl} alt="Department" />
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </>
    );
};

export default Departments;