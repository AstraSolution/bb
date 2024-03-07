'use client'

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import './BannerStyles.css';
import Image from 'next/image'
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/Axios/useAxiosPublic";
import { Libre_Baskerville } from "next/font/google";
import PageLoading from '@/components/Shared/loadingPageBook/PageLoading';
import Link from 'next/link';


const sourceSerif = Libre_Baskerville({
    weight: ["400", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    display: "swap",
});

export default function BannerNew() {
    const router = useRouter();

    const axiosPublic = useAxiosPublic();

    const { data: bannerData = [], isLoading } = useQuery({
        queryKey: ["banner"],
        queryFn: async () => {
            const res = await axiosPublic.get(`api/v1/banner`);
            return res.data;
        },
    });

    useEffect(() => {
        if (!isLoading && bannerData.length > 0) {
            initializeSlider();
        }
    }, [isLoading, bannerData]);

    function initializeSlider() {
        let nextDom = document.getElementById('next');
        let prevDom = document.getElementById('prev');

        let carouselDom = document.querySelector('.carousel');
        let SliderDom = carouselDom.querySelector('.carousel .list');
        let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
        let timeDom = document.querySelector('.carousel .time');

        if (thumbnailItemsDom.length > 0) {
            thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        }

        let timeRunning = 3000;
        let timeAutoNext = 15000;

        nextDom.onclick = function () {
            showSlider('next');
        };

        prevDom.onclick = function () {
            showSlider('prev');
        };

        let runTimeOut;
        let runNextAuto = setTimeout(() => {
            nextDom.click();
        }, timeAutoNext);

        function showSlider(type) {
            let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
            let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

            if (type === 'next' && thumbnailItemsDom.length > 0) {
                SliderDom.appendChild(SliderItemsDom[0]);
                thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
                carouselDom.classList.add('next');
            } else if (thumbnailItemsDom.length > 0) {
                SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
                thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                carouselDom.classList.add('prev');
            }

            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove('next');
                carouselDom.classList.remove('prev');
            }, timeRunning);

            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => {
                nextDom.click();
            }, timeAutoNext);
        }
    }

    const handleClick = (link) => {
        // Call your function here
        console.log("Button clicked!");

        // Redirect to the intended page
        router.push(link);
    };

    if (isLoading || bannerData.length === 0) {
        return <div className='bg-50-50'><PageLoading /></div>;
    }

    return (
        <div className='carousel-container banner-slider bg-50-50'>
            <div className="carousel">
                <div className="list">
                    {Array.isArray(bannerData) && bannerData.map((item, index) => (
                        <div className="item" key={index}>
                            <Image src={item?.cover_image} width={2310} height={4100} alt="alt" />
                            <div className="content">
                                <div className="author">{item?.author}</div>
                                <div className={`${sourceSerif.className} title font-outline`}>{item?.title}</div>
                                <div className="topic">{item?.topic}</div>
                                <div className="des">{item?.description}</div>
                                <div className="buttons">
                                    {Array.isArray(item?.buttons) && item?.buttons.map((button, buttonIndex) => (
                                        <button
                                            key={buttonIndex}
                                            onClick={() => handleClick(button.link)}
                                        >
                                            {button.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <div className="thumbnail">
                        {Array.isArray(bannerData) && bannerData.map((item, index) => (
                            <div className="item" key={index}>
                                <Image src={item?.thumbnail_img} height={1500} width={1000} alt="thumbnail_img" layout="responsive" />
                                <div className="content">
                                    <div className="title">{item?.thumbnail_title}</div>
                                    <div className="description">{item?.thumbnail_description}</div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="arrows">
                    <button id="prev" className='flex items-center justify-center shadow-md '>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12 15.75 4.5" />
                        </svg>
                    </button>
                    <button id="next" className='flex items-center justify-center shadow-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
                <div className="time"></div>
            </div>
        </div>
    );
};