// import { Carousel } from "react-responsive-carousel";
// import banner1 from "../assets/banner1.jpg";
// import banner2 from "../assets/banner2.jpg";
// import banner3 from "../assets/banner3.jpg";
// import banner4 from "../assets/banner4.jpg"

// const slides = [
//   { src: banner1, alt: "Big Sale on electronics" },
//   { src: banner2, alt: "Home deals" },
//   { src: banner3, alt: "Discovers" },
//   { src: banner4, alt: "Discovers" },
// ];

// function BannerCarousel() {
//   return (
//     <div className="w-full">
//       <Carousel
//         autoPlay
//         infiniteLoop
//         showThumbs={false}
//         showStatus={false}
//         interval={3000}
//         transitionTime={400}
//         swipeable
//         emulateTouch
//         stopOnHover
//         useKeyboardArrows
//         dynamicHeight={false}
//         lazyLoad
//         ariaLabel="Homepage banner carousel"
//         renderArrowPrev={(onClickHandler, hasPrev, label) =>
//           hasPrev && (
//             <button
//               onClick={onClickHandler}
//               aria-label={label}
//               className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
//             >
//               ‹
//             </button>
//           )
//         }
//         renderArrowNext={(onClickHandler, hasNext, label) =>
//           hasNext && (
//             <button
//               onClick={onClickHandler}
//               aria-label={label}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
//             >
//               ›
//             </button>
//           )
//         }
//       >
//         {slides.map((s, i) => (
//           <div key={i}>
//             <img
//               src={s.src}
//               alt={s.alt}
//               className="w-full h-[420px] md:h-[520px] object-contain"
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }

// export default BannerCarousel


import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const slides = [
  { src: banner1, alt: "Big Sale on Electronics" },
  { src: banner2, alt: "Home Deals" },
  { src: banner3, alt: "Discover More" },
  { src: banner4, alt: "Shop Now" },
];

function BannerCarousel() {
  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={600}
        swipeable
        emulateTouch
        stopOnHover={false}
        useKeyboardArrows
        showIndicators={false}
        dynamicHeight={false}
        ariaLabel="Amazon style banner carousel"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              aria-label={label}
              className="absolute left-4 top-1/4 -translate-y-1/4 z-20 p-3 cursor-pointer"
            >
              <SlArrowLeft  className="text-4xl text-gray-700" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              aria-label={label}
              className="absolute right-4 top-1/4 -translate-y-1/4 z-20 p-3 cursor-pointer"
            >
              <SlArrowRight className="text-4xl text-gray-700" />
            </button>
          )
        }
      >
        {slides.map((s, i) => (
          <div key={i} className="relative">
            <img
              src={s.src}
              alt={s.alt}
              className="w-full h-[380px] md:h-[480px] lg:h-[600px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full h-[180px] bg-gradient-to-t from-gray-100 via-white/20 to-transparent" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
