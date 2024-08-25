import { useTranslation } from "react-i18next";
import CV from "../../assets/CV.pdf"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export function Footer(){
    const { t } = useTranslation();

    return (
        <footer className="flex justify-between py-4">
            <div className="">
                <h3 className="text-lg font-medium mb-1">Contact</h3>
                <ul>
                    <li>
                        <a href="#contact">{t('footer.contactme')}</a>
                    </li>
                    <li>
                        <a href={CV} target="_blank" rel="noreferrer">{t('footer.seemycv')}</a>
                    </li>
                </ul>
            </div>
            <div className="flex items-end">
                <p>&copy; {(new Date()).getFullYear()} Maxence Castel. {t('footer.allrightsreserved')}</p>
            </div>
            <div>
                <h3 className="text-lg font-medium mb-2">{t('footer.followme')}</h3>
                <ul className="flex justify-center gap-x-3">
                    <li>
                        <a href="https://github.com/Maxcastel" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faGithub} size="xl" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/maxence-castel-46391a224/" target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} size="xl" />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}