import { useTranslation } from 'react-i18next';
import franceIcon from '../../assets/img/icons/france.png';
import englishIcon from '../../assets/img/icons/royaume-uni.png';

export function LangueSwitcher(){
    const { t, i18n } = useTranslation();

    interface LangueInfo{
        langName: string;
        icon: string;
    }

    type LangueName = "fr" | "en";

    const lngs: Record<LangueName, LangueInfo> = {
        fr: { langName: t('langues.francais'), icon: franceIcon },
        en: { langName: t('langues.anglais'), icon: englishIcon },
    };

    return (
        <ul>
            <li className="group relative dropdown cursor-pointer">

                {Object.keys(lngs).map((lng:string) => {
                    const langue:LangueName = lng as LangueName;
                    if (i18n.resolvedLanguage === lng){
                        return (
                            <button key={lng} className="flex items-center gap-x-2 " onClick={() => i18n.changeLanguage(lng)}>
                                <img src={lngs[langue].icon} width="30" height="20" />
                                <p className='text-primary font-semibold'>{lngs[langue].langName}</p>
                            </button>
                        ) 
                    } 
                })}

                <div className={`group-hover:block dropdown-menu absolute hidden h-auto`}>

                    <ul className="top-0 w-full">

                        <li className="py-1">

                            {Object.keys(lngs).map((lng:string) => {
                                const langue:LangueName = lng as LangueName;
                                if (i18n.resolvedLanguage !== lng){
                                    return (
                                        <button key={lng} className="flex items-center gap-x-2" onClick={() => i18n.changeLanguage(lng)}>
                                            <img src={lngs[langue].icon} width="32" height="20" />
                                            <p>{lngs[langue].langName}</p>
                                        </button>
                                    ) 
                                } 
                            })}
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    )
}