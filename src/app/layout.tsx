import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const nanum = localFont({
    src: [
        {
            path: "./fonts/NanumSquareB.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/NanumSquareR.woff2",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/NanumSquareL.woff2",
            weight: "300",
            style: "normal",
        },
    ],
    display: "swap",
    variable: "--font-nanum",
});

export const metadata: Metadata = {
    title: "Codeit TodoList",
    description: "코드잇 투두리스트",
    openGraph: {
        title: "Codeit TodoList",
        description: "코드잇 투두리스트",
        images: ["/assets/logo/LogoSize=Large.svg"],
    },
    viewport: "width=device-width, initial-scale=1",
};

// priority로 모바일, 태블릿 이상 즉시 로드 링크 클릭 영역 제한
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
            </head>
            <body className={`${nanum.variable} min-h-screen font-nanum bg-gray-50`}>
                <header className="bg-white px-4 py-2 border-b-[var(--color-slate200)] z-50 fixed top-0 left-0 right-0 h-[56px]">
                    <div className="max-w-7xl mx-auto ">
                        <div className="block tablet:hidden">
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/assets/logo/LogoSize=Small.svg"
                                    alt="logo"
                                    width={71}
                                    height={40}
                                    priority
                                />
                            </Link>
                        </div>
                        <div className="hidden tablet:block">
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/assets/logo/LogoSize=Large.svg"
                                    alt="logo"
                                    width={151}
                                    height={80}
                                    priority
                                />
                            </Link>
                        </div>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto  pt-[56px]">{children}</main>
            </body>
        </html>
    );
}
