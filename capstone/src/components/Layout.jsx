import { useSelector } from "react-redux";
import MyFooter from "./MyFooter";
import MyNavbar from "./MyNavbar";

function Layout({ child }) {
    const isLoading = useSelector(state => state.loading.loading)
    return (
        <>

            <div className="position-relative">
                <MyNavbar />
                {child}
                <MyFooter />
                {
                    isLoading && (
                        <div className=" position-absolute top-0 start-0 w-100 h-100 bg-white opacity-50 custom-z">
                            <h1 className=" visually-hidden">Invisible</h1>
                        </div>
                    )
                }

            </div>

        </>
    )
}

export default Layout