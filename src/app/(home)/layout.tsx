

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <main>

            <div className="min-h-screen">

                {children}
            </div>

        </main>
    );
}

export default Layout;