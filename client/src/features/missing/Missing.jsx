// --- IMPORTS --- //
import { Link } from "react-router-dom";

// --- DECLARATIONS --- //
const Missing = () => {
    return (
        <main className="missing">
            <h1>404</h1>
            <h2>Page not found</h2>
            <small id="tm">
                <Link to="/">&lt; Home page</Link>
            </small>
        </main>
    );
}

export default Missing;
