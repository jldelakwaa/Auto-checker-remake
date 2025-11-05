import { WelcomeHeader } from '@/components/welcome-header';
import { Head } from '@inertiajs/react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] px-6 pt-4 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <WelcomeHeader canRegister={canRegister} />
                
                {/* Add your hero section or main content here */}
                <main className="flex flex-1 flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold lg:text-6xl">
                        Welcome to Auto Checker
                    </h1>
                    <p className="mt-4 text-center text-lg text-neutral-600 dark:text-neutral-400">
                        Your automated code checking solution
                    </p>
                </main>
            </div>
        </>
    );
}
