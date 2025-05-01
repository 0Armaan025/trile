interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <main>
            <div className="min-h-screen">

                {children}
            </div>
        </main>
    );
}

export default Layout;