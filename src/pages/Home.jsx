import "react-responsive-carousel/lib/styles/carousel.min.css"
import BannerCarousel from "../components/BannerCarousel";
import HomeBox from "../components/HomeBox";
import jeans from "../assets/jeans.jpg";
import top from "../assets/tops.jpg";
import dress from "../assets/dresses.jpg";
import shoes from "../assets/shoes.jpg";
import ProductRow from "../components/ProductRow"

function Home() {
  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="min-h-screen w-[80%] mx-auto">

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
                { img: "https://m.media-amazon.com/images/I/81n1T4CYfmL._AC_UL320_.jpg", caption: "Gaming Laptops" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/Stores-Gaming/FinalGraphics/Fuji_Gaming_store_Dashboard_card_1x_EN._SY304_CB564799420_.jpg", caption: "PlayStation" },
                { img: "https://m.media-amazon.com/images/I/615KnbjRmTL._AC_UL320_.jpg", caption: "Gaming Controller" },
                { img: "https://m.media-amazon.com/images/I/718RVdPc7qL._AC_UL640_QL65_.jpg", caption: "HeadPhones" },
              ]}
              linkText="Shop gaming"
            />

            <HomeBox
              title="Shop for your home essentials"
              items={[
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/CleaningTool_1x._SY116_CB563137408_.jpg", caption: "Cleaning Tools" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/HomeStorage_1x._SY116_CB563137408_.jpg", caption: "Home Storage" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/HomeDecor_1x._SY116_CB563137408_.jpg", caption: "Home Decor" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Bedding_1x._SY116_CB563137408_.jpg", caption: "Bedding" },
              ]}
              linkText="Discover more in Home"
            />

            <HomeBox
              title="Refresh your space"
              items={[
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_186x116_LP-HP_B08MYX5Q2W_01.23._SY116_CB619238939_.jpg", caption: "Dining" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_186x116_home_B08RCCP3HV_01.23._SY116_CB619238939_.jpg", caption: "Home" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_186x116_kitchen_B0126LMDFK_01.23._SY116_CB619238939_.jpg", caption: "Kitchen" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/launchpad/2023/Gateway/January/DesktopQuadCat_186x116_health-beauty_B07662GN57_01.23._SY116_CB619238939_.jpg", caption: "Health Beauty" },
              ]}
              linkText="See more ideas"
            />

            <HomeBox
              title="New home arrivals under $50"
              items={[
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_315_HP_NewArrivals_QuadCard_D_01_1x._SY116_CB555960040_.jpg", caption: "Kitchen & Dining" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_316_HP_NewArrivals_QuadCard_D_02_1x._SY116_CB555960040_.jpg", caption: "Home Improvement" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_317_HP_NewArrivals_QuadCard_D_03_1x._SY116_CB555960040_.jpg", caption: "Decor" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/DiscoTec/2024/HomeLifestyle/HomeSummerFlip/Homepage/QuadCards/Home_Flip_Summer_2024_318_HP_NewArrivals_QuadCard_D_04_1x._SY116_CB555960040_.jpg", caption: "Bedding & Bath" },
              ]}
              linkText="See more ideas"
            />

            <HomeBox
              title="Top categories in Kitchen appliances"
              items={[
                { img: "https://m.media-amazon.com/images/I/313wAT6Iy2L._SY160_.jpg", caption: "Cooker" },
                { img: "https://m.media-amazon.com/images/I/21W7-lndINL._SY75_.jpg", caption: "Cofee" },
                { img: "https://m.media-amazon.com/images/I/21B-NkA9p-L._SY75_.jpg", caption: "Pots and Pans" },
                { img: "https://m.media-amazon.com/images/I/217GQ1a2QzL._SY75_.jpg", caption: "Kettle" },
              ]}
              linkText="See more ideas"
            />
            <HomeBox
              title="Fashion trends you like"
              items={[
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/LuxuryStores/Spring-23/GW/Quad_Cards/Spring/LSS23_SPRING_DT_CAT_CARD_2_x1._SY116_CB595261253_.jpg", caption: "Dresses" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/LuxuryStores/Spring-23/GW/Quad_Cards/Spring/LSS23_SPRING_DT_CAT_CARD_3_x1._SY116_CB595261253_.jpg", caption: "Knits" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/LuxuryStores/Spring-23/GW/Quad_Cards/Spring/LSS23_SPRING_DT_CAT_CARD_1_x1._SY116_CB595261253_.jpg", caption: "Jackets" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2023/LuxuryStores/Spring-23/GW/Quad_Cards/Spring/LSS23_SPRING_DT_CAT_CARD_4_x1._SY116_CB595261253_.jpg", caption: "Jewelry" },
              ]}
              linkText="See more ideas"
            />
            <HomeBox
              title="Easy updates for elevated spaces"
              items={[
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_LaundryLuxe_D_Quad_186x116._SY116_CB594237035_.jpg", caption: "Baskets & hampers" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_Kitchen_D_Quad_186x116._SY116_CB594237035_.jpg", caption: "Hardware" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_AccentFurniture_D_Quad_186x116._SY116_CB594237035_.jpg", caption: "Accent furniture" },
                { img: "https://images-na.ssl-images-amazon.com/images/G/01/img18/home/2023/Q2/Homepage/2023Q2_GW_EE_Hallway_D_Quad_186x116._SY116_CB594237035_.jpg", caption: "Wallpaper & paint" },
              ]}
              linkText="See more ideas"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-gray-100 to-transparent z-10 pointer-events-none" />
        </div>

        <div className="px-6">
          <ProductRow
            title="Best Sellers In Home & Kitchen"
            products={[
              { img: "https://m.media-amazon.com/images/I/71b8fh-dQ4L._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/61sS-XIvEXL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/71LOYxu6SAL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/617+Wg+p7WL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/71Zg+lIkXeL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/91MTW21x7pL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/71M6a8SHCeL._AC_SY200_.jpg" },
            ]}
          />

          <ProductRow
            title="New International customers purchased"
            products={[
              { img: "https://m.media-amazon.com/images/I/71cmaSpp9yL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/81LCWpplZBL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/611TevMxayL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/71Y3RT9AKPL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/6108f9psE3L._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/71HUNCsDlaL._AC_SY200_.jpg" },
              { img: "https://m.media-amazon.com/images/I/81aj0gSyG8L._AC_SY200_.jpg" },
            ]}
          />
        </div>
        <div className="relative z-20 mt-7 px-6 flex justify-even flex-wrap gap-4 w-[] mx-auto">
          <HomeBox
            title="WireLess Tech"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Smartphone_1x._SY116_CB566164844_.jpg", caption: "Smartphones" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Watches_1x._SY116_CB566164844_.jpg", caption: "Watches" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Headphone_1x._SY116_CB566164844_.jpg", caption: "Headphones" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Aug/Tablet_1x._SY116_CB566164844_.jpg", caption: "Tablets" },
            ]}
            linkText="Discover More"
          />

          <HomeBox
            title="Elevate Your Electronics"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Headphones._SY116_CB549022351_.jpg", caption: "Headphones" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Tablets._SY116_CB549022351_.jpg", caption: "Tablets" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Gaming._SY116_CB549022351_.jpg", caption: "Gaming" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Speakers._SY116_CB549022351_.jpg", caption: "Speakers" },
            ]}
            linkText="Discover More"
          />

          <HomeBox
            title="Gear up to get fit"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Clothing._SY116_CB549022351_.jpg", caption: "Clothing" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Trackers._SY116_CB549022351_.jpg", caption: "Trackers" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Equipment._SY116_CB549022351_.jpg", caption: "Equipment" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Deals_Fitness._SY116_CB549022351_.jpg", caption: "Deals" },
            ]}
            linkText="Discover More"
          />

          <HomeBox
            title="Toys for all ages"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAUOct2024/RideOn._SY116_CB545223412_.jpg", caption: "Ride'on's" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAUOct2024/BuildingConstruction._SY116_CB545223412_.jpg", caption: "Building & construction" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAUOct2024/DollDoll_House._SY116_CB545223412_.jpg", caption: "Dolls & Doll Houses" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAUOct2024/SwimmingPool._SY116_CB545223412_.jpg", caption: "Swimming pools" },
            ]}
            linkText="See all"
          />
        </div>

        <div className="px-6">
          <ProductRow
          title="Best Sellers in Sports & Outdoors"
          products={[
            { img: "https://m.media-amazon.com/images/I/61v2Gh-QzrL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/710yBz6hfUL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/81Y26toqdTL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/51sA282J+iL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/71S4-NjoTDL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/61FK3dxDjXL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/71DxWxvCwlL._AC_SY200_.jpg" },
          ]}
        />

        <ProductRow
          title="Top Sellers in Books"
          products={[
            { img: "https://m.media-amazon.com/images/I/71tbImx2YVL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/71C12i+HeHL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/91ZVf3kNrcL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/814LTJ3g+VL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/81mpSoJzv4L._AC_SY200_.jpg" },
            { img: "https://images-na.ssl-images-amazon.com/images/I/71ifWRFpX6L._AC_UL165_SR165,165_.jpg" },
            { img: "https://images-na.ssl-images-amazon.com/images/I/71uOY1qNvvL._AC_UL165_SR165,165_.jpg" },
          ]}
        />
        </div>

        <div className="relative z-20 mt-7 px-6 flex justify-even flex-wrap gap-4 w-[] mx-auto">
          <HomeBox
            title="Have more fun with family"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Playground_sets._SY116_CB558654384_.jpg", caption: "Playground Sets" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_STEM_toys_or_learning_toys._SY116_CB558654384_.jpg", caption: "Learning Toys" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Action_figure._SY116_CB558654384_.jpg", caption: "Action Figures" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Pretend_Play_Toys._SY116_CB558654384_.jpg", caption: "Pretend Play Toys" },
            ]}
            linkText="Discover More"
          />

          <HomeBox
            title="Level up your beauty routine"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Make-up._SY116_CB558654384_.jpg", caption: "Makeup" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Brushes._SY116_CB558654384_.jpg", caption: "Brushes" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Sponges._SY116_CB558654384_.jpg", caption: "Sponges" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/DskBTFQuadCards/Fuji_BTF_Quad_Cards_1x_Mirrors._SY116_CB558654384_.jpg", caption: "Mirrors" },
            ]}
            linkText="Discover More"
          />


          <HomeBox
            title="Deals on top categories"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Books._SY116_CB549022351_.jpg", caption: "Books" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Fashion._SY116_CB549022351_.jpg", caption: "Fashion" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Desktops._SY116_CB549022351_.jpg", caption: "Desktops" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2025/Q1DefectReduction/Fuji_Defect_Reduction_1x_Beauty._SY116_CB549022351_.jpg", caption: "Beauty" },
            ]}
            linkText="Discover More"
          />
          <HomeBox
            title="Discover these beauty products for you"
            items={[
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Skincare_1x._SY116_CB563150139_.jpg", caption: "Skincare" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Makeup_1x._SY116_CB563150139_.jpg", caption: "Makeup" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Nail_1x._SY116_CB563150139_.jpg", caption: "Nails" },
              { img: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2024/BAU2024Sept/Fragrance_1x._SY116_CB563150139_.jpgg", caption: "Fragrances" },
            ]}
            linkText="Discover More"
          />
        </div>

        <div className="px-6">
          <ProductRow
          title="Best Sellers in Computers & Accessories"
          products={[
            { img: "https://m.media-amazon.com/images/I/71nVIiWEcgL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/719R46dVUTL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/51IFiSD+kCL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/61ciknSL0lL._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/414C25OyjML._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/71G8rdQin3L._AC_SY200_.jpg" },
            { img: "https://m.media-amazon.com/images/I/71VQl1X3DqL._AC_SY200_.jpg" },
          ]}
        />
        </div>
      </div>
    </div>
  );
}

export default Home;
