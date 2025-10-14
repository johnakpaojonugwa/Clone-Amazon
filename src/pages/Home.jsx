import Nav from "../components/Nav";
import SubHeader from "../components/SubHeader";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerCarousel from "../components/BannerCarousel";
import HomeBox from "../components/HomeBox";
import jeans from "../assets/jeans.jpg";
import top from "../assets/tops.jpg";
import dress from "../assets/dresses.jpg";
import shoes from "../assets/shoes.jpg";
import MainFooter from "../components/MainFooter";
import SubFooter from "../components/SubFooter";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <SubHeader />

      <div className="relative">
        <div className="w-full bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200">
          <BannerCarousel />
        </div>

        <div className="relative z-20 -mt-64 px-6 flex justify-even flex-wrap gap-4 w-[] mx-auto">
        <HomeBox
            title="Shop Fashion for less"
            items={[
              { img: jeans, caption: "Jeans under $50" },
              { img: top, caption: "Tops under $25" },
              { img: dress, caption: "Dresses under $30" },
              { img: shoes, caption: "Shoes under $50" },
            ]}
            linkText="See all deals"
          />

          <HomeBox
            title="Get your game on"
            items={[
              { img: "/assets/ps5.jpg", caption: "PlayStation" },
              { img: "/assets/gamingpc.jpg", caption: "Gaming PC" },
              { img: "/assets/controller.jpg", caption: "Controllers" },
              { img: "/assets/headset.jpg", caption: "Headsets" },
            ]}
            linkText="Shop gaming"
          />

          <HomeBox
            title="Shop for your home essentials"
            items={[
              { img: "/assets/cleaning.jpg", caption: "Cleaning Tools" },
              { img: "/assets/storage.jpg", caption: "Home Storage" },
              { img: "/assets/decor.jpg", caption: "Home Decor" },
              { img: "/assets/bedding.jpg", caption: "Bedding" },
            ]}
            linkText="Discover more in Home"
          />

          <HomeBox
            title="Refresh your space"
            items={[
              { img: "/assets/dining.jpg", caption: "Dining" },
              { img: "/assets/home.jpg", caption: "Home" },
              { img: "/assets/furniture.jpg", caption: "Furniture" },
              { img: "/assets/art.jpg", caption: "Wall Art" },
            ]}
            linkText="See more ideas"
          />
        </div>

         <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
      </div>
      <div className="mt-auto">
        <SubFooter />
        <MainFooter />
      </div>
    </div>
  );
}

export default Home;
