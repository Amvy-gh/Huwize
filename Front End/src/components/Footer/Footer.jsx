import { SiGooglemaps } from "react-icons/si";
import { CiMail } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const SlideUp = (delay) => ({
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: delay,
      ease: "easeInOut",
    },
  },
});

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 flex lg:items-center lg:justify-center"> 
        <div className="flex flex-col sm:flex-col lg:flex-row lg:justify-between gap-10 lg:gap-36">
          {/* first section */}
          <motion.div
            variants={SlideUp()}
            className="flex-1 space-y-6"
            initial="initial"
            animate="animate"
          >
            <h1 className="text-xl sm:text-2xl font-bold">
              <span className="text-secondary2">Hu</span>Wize
            </h1>
            <ul>
              <li>
                <a
                  href="https://g.co/kgs/WsXN5GK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <SiGooglemaps className="text-lg sm:text-2xl text-secondary2 mr-2" />
                  Jati Agung Lampung Selatan
                </a>
              </li>

              <li className="pt-4">
                <a
                  href="mailto:wayhuwi@gmail.com"
                  className="flex items-center space-x-2"
                >
                  <CiMail className="text-lg sm:text-2xl text-secondary2 mr-2" />
                  wayhuwi1789@gmail.com
                </a>
              </li>

              <li className="flex items-center space-x-2 pt-5">
                <FaPhone className="text-lg sm:text-2xl text-secondary2 mr-2" />
                  0853-7775-4075
              </li>
            </ul>
          </motion.div>
          {/* second section */}
          <motion.div
            className="flex-1 space-y-6"
            variants={SlideUp(0.2)}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-xl sm:text-2xl font-bold">Other Website</h1>
            <ul>
              <a
                href="https://wayhui.id/"
                target="_blank"
                rel="noopener noreferrer"
              >
              <li className="flex items-center space-x-2">
                <TbWorldWww className="text-lg sm:text-2xl text-secondary2 mr-2" />{" "}
                Web Desa
              </li>
              </a>
            </ul>
          </motion.div>
          {/* third section */}
          <motion.div
            className="flex-1 space-y-6"
            variants={SlideUp(0.3)}
            initial="initial"
            animate="animate"
          >
            <h1 className="text-xl sm:text-2xl font-bold">Our Social Media</h1>
            <ul>
              <a
                href="https://web.facebook.com/profile.php?id=1204857406272216&_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="flex items-center space-x-2">
                  <FaFacebookF className="text-lg sm:text-2xl text-secondary2 mr-2" />{" "}
                  Facebook
                </li>
              </a>
              <a
                href="https://www.instagram.com/desawayhuwiofficial/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="flex items-center space-x-2 pt-4">
                  <FaInstagram className="text-lg sm:text-2xl text-secondary2 mr-2" />{" "}
                  Instagram
                </li>
              </a>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Copyright section */}
      <motion.div
        className="mt-10 py-4 bg-light font-semibold text-center"
        variants={SlideUp(0.4)}
        initial="initial"
        animate="animate"
      >
        <p>&copy; Copyright KKN ITERA 2025 WAY HUWI</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
