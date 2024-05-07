import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

const languages = [
    { code: "en", lang: "English" },
    { code: "vi", lang: "Vietnamese" },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n, i18n.language]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="btn-container flex items-center">
            <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
            >
                {languages.map((lng) => (
                    <option value={lng.code} key={lng.code}>
                        {lng.lang}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;