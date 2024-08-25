import { useTranslation } from "react-i18next";
import Img from "../../assets/img/1680106917736.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import CV from "../../assets/CV.pdf"

export function Hero(){
    const { t } = useTranslation();

    return (
      <section className="h-[calc(100vh-(24px+32px))] lg:h-[calc(100vh-(40px+32px))] flex justify-center items-center text-center px-6">
        <div className="w-full md:w-6/12 flex flex-col items-center">
          <img
            src={Img}
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />

          <h1 className="text-4xl font-bold mb-2">
            Maxence Castel
          </h1>

          <p className="text-lg italic mb-6">
            {t("hero.phrase")}
          </p>

          <nav className="mb-6">
            <ul className="flex gap-x-6">
              <li>
                <a href="/articles" className="hover:underline">Mon blog</a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">Contactez-moi</a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-4">
            <a href="https://github.com/Maxcastel" target="_blank" rel="noreferrer" className="flex items-center justify-center bg-gray-800 dark:bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 dark:hover:bg-gray-500">
              <FontAwesomeIcon icon={faGithub} size="lg" className="mr-2" />
              GitHub
            </a>
            <a href="https://linkedin.com/in/maxence-castel-46391a224/" target="_blank" rel="noreferrer" className="flex items-center justify-center bg-gray-800 dark:bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 dark:hover:bg-gray-500">
              <FontAwesomeIcon icon={faLinkedin} size="lg" className="mr-2" />
              LinkedIn
            </a>
            <a href={CV} target="_blank" rel="noreferrer" className="flex items-center bg-gray-800 dark:bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 dark:hover:bg-gray-500">
              <FontAwesomeIcon icon={faFilePdf} size="lg" className="mr-2" />
              CV
            </a>
          </div>
        </div>
      </section>
    )

}