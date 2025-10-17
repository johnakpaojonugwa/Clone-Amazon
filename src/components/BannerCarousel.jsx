import { Carousel } from "react-responsive-carousel";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg"

const slides = [
  { src: banner1, alt: "Big Sale on electronics" },
  { src: banner2, alt: "Home deals" },
  { src: banner3, alt: "Discovers" },
  { src: banner4, alt: "Discovers" },
];

function BannerCarousel() {
  return (
    <div className="w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={400}
        swipeable
        emulateTouch
        stopOnHover
        useKeyboardArrows
        dynamicHeight={false}
        lazyLoad
        ariaLabel="Homepage banner carousel"
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              onClick={onClickHandler}
              aria-label={label}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
            >
              ‹
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              onClick={onClickHandler}
              aria-label={label}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 p-2 rounded-full shadow"
            >
              ›
            </button>
          )
        }
      >
        {slides.map((s, i) => (
          <div key={i}>
            <img
              src={s.src}
              alt={s.alt}
              className="w-full h-[420px] md:h-[520px] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default BannerCarousel