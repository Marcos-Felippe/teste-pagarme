'use client';


interface HeaderProps {
    text: string;
}

export default function Header({ text }: HeaderProps) {

    return (
        <header className="bg-gradient-to-b from-blue-950 via-gray-400 to-white py-4">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-start p-6 lg:px-8 md:py-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Ecclesia</span>
                        <img alt="" src="/logo.png" className="h-8 w-auto" />
                    </a>
                </div>
            </nav>
        </header>
    )
}
