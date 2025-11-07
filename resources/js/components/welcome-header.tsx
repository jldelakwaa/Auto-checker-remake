import { dashboard, login, register, logout } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import { Button } from '@/components/ui/button';

interface WelcomeHeaderProps {
    canRegister?: boolean;
}

export function WelcomeHeader({ canRegister = true }: WelcomeHeaderProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <header className="w-full max-w-[335px] lg:max-w-7xl">
            <nav className="flex items-center justify-between py-4">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-black dark:bg-white">
                        <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                    </div>
                    <span className="text-lg font-semibold">
                        Auto Checker
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center gap-4">
                    {auth.user ? (
                        <>
                            <Button variant="default" asChild>
                                <Link href={dashboard()}>
                                    Dashboard
                                </Link>
                            </Button>

                            <Button variant="outline" className="cursor-pointer" asChild>
                                <Link href={logout()} method="post" as="button">
                                    Logout
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href={login()}>
                                    Log in
                                </Link>
                            </Button>
                            {canRegister && (
                                <Button variant="default" asChild>
                                    <Link href={register()}>
                                        Register
                                    </Link>
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
