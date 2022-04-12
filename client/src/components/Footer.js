import React from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import useWindowSize from "../hooks/useWindowSize";

function Footer() {
	const { width } = useWindowSize();
	const today = new Date();
	return (
		<footer>
			<div className="footerContent">
				<figure className="deviceIcon">
					{width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
				</figure>
				<p>
					<small>
						{width > 400 ? "Copyright " : ""}&copy; {today.getFullYear()} |{" "}
						<a
							href="https://github.com/Drakan21"
							target="_blank"
							rel="noreferrer"
							aria-label="Navigate to Drakan21 profile on GitHub"
						>
							Drakan21
						</a>
					</small>
				</p>
				<p>
					<small>
						Built with{" "}
						<a
							href="https://www.reactjs.org"
							target="_blank"
							rel="noreferrer"
							aria-label="Navigate to ReactJS.org home page"
						>
							ReactJS
						</a>
					</small>
				</p>
			</div>
		</footer>
	);
}

export default Footer;
