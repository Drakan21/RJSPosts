// --- IMPORTS --- //
import { FaCompactDisc } from "react-icons/fa";

// --- DECLARATIONS --- //
const Process = ({ msg }) => {
	return (
		<div className="processing">
			<div className="spinningArrow">
				<FaCompactDisc />
			</div>
			<p className="processMsg">{msg}</p>
		</div>
	);
};

export default Process;
