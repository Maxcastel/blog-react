import { useTranslation } from "react-i18next";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { LangueSwitcher } from "../widgets/LangueSwitcher";
import { ModeToggle } from "../widgets/ModeToggle";
import { HashLink } from 'react-router-hash-link';
import { useState } from "react";
import { Dialog, DialogPanel } from '@headlessui/react';

export function Header(){
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navigation = [
        { name: t('home'), href: '/' },
        { name: "Articles", href: '/articles' },
        { name: 'Contact', href: '/#contact' },
    ]

    return (
        <header className='top-0'>

            <nav className='py-4 flex justify-between items-center'>
                <div className="flex md:flex-1">
                    <a href='/' className="font-semibold">
                        Blog
                    </a>
                </div>

                <div className="md:flex md:gap-x-12 hidden">
                    {navigation.map((item) => (
                        <HashLink key={item.name} 
                            smooth to={item.href} 
                            className="text-sm font-semibold leading-6 text-primary hover:text-primary/70"
                        >
                            {item.name}
                        </HashLink>
                    ))}
                </div>

                <div className='lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-3.5 hidden'>
                    <LangueSwitcher />
                    <ModeToggle />
                </div>
            
                <div className="lg:hidden flex flex-1 justify-end">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Bars3Icon className="h-6 w-6 dark:text-white" aria-hidden="true" />
                    </button>
                </div>
            </nav>  
            <Dialog as="div" className="lg:hidden" open={isMenuOpen} onClose={setIsMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <p>Blog</p>
                        </a>
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