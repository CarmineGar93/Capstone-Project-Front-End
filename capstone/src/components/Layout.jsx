import MyFooter from "./MyFooter";
import MyNavbar from "./MyNavbar";

function Layout({ child }) {
    return (
        <>
            <MyNavbar />
            <>{child}</>
            <MyFooter />
        </>
    )
}

export default Layout