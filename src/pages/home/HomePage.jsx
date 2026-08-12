
import { FaQ } from "react-icons/fa6";
import About from "../../components/landingPage/About";
import Featured from "../../components/landingPage/Featured";
import HeroSection from "../../components/landingPage/HeroSection";
import Testimonials from "../../components/landingPage/Testimonials";

import Layout from "../../components/layout/Layout";
import FAQ from "../../components/landingPage/FAQ";
import Download from "../../components/landingPage/Download";


const HomePage = () => {
    return (
        <Layout>
            <div id="xyz">
                <HeroSection/>
            </div>
            <div id="features">
                <Featured/>
            </div>
            <div id="abc">
              <About/>
          </div>
          <div id="testimonials">
              <Testimonials/>
          </div>
          <div id="faq">
              <FAQ/>
          </div>
          <div id="download">
              <Download/>
          </div>
        </Layout>
    );
}

export default HomePage;
