import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { LangueSwitcher } from "@/components/widgets/LangueSwitcher";
import { ModeToggle } from "@/components/widgets/ModeToggle";
import { Dialog, DialogPanel } from '@headlessui/react';
import { HashLink } from 'react-router-hash-link';
import { useState } from "react";

export function HeaderAdmin(){
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigation = [
        { name: t('home'), href: '/' },
        { name: "Articles", href: '/admin/articles' },
        { name: t('article.create'), href: '/article/create' },
        { name: t('comment.title'), href: '/admin/comments' },
        { name: "Emails", href: '/admin/emails' },
    ]

    return (
        <header className='top-0'>

            <nav className='py-4 flex justify-between items-center'>
                <div className="flex lg:flex-1 gap-4">
                    {navigation.map((item) => (
                        <a key={item.name} 
                            href={item.href}
                            className="text-base font-semibold leading-6 text-primary hover:text-primary/80"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <div className="lg:flex lg:gap-x-12 hidden">
                    <p className="text-base font-semibold leading-6">
                        Administration
                    </p>
                </div>

                <div className='lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-3.5 hidden'>
                    <LangueSwitcher />
                    <ModeToggle />
                </div>
            
                <div className="lg:hidden flex">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
            </nav>  
            <Dialog as="div" className="lg:hidden" open={isMenuOpen} onClose={setIsMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <p className="-m-1.5 p-1.5">Administration</p>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 max-md:divide-y">
                            <div className="space-y-2 py-6 md:hidden">
                                {navigation.map((item) => (
                                    <HashLink 
                                        key={item.name} 
                                        smooth to={item.href} 
                                        onClick={() => setIsMenuOpen(false)}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    >
                                        {item.name}
                                    </HashLink>
                                ))}
                            </div>
                            <div className="py-6 flex items-center justify-between">
                                <LangueSwitcher />
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog> 

        </header>
    )
}