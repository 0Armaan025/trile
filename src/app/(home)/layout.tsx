import { Navbar } from "./navbar/navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    );
}

export default Layout;