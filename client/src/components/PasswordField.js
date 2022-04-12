import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";

const PasswordField = ({ id, value, setValue }) => {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(false);
	}, [setVisible]);

	return (
		<div
			style={{
				margin: "0",
				padding: "0",
				width: "100%",
				position: "relative",
				display: "grid",
			}}
		>
			<input
				type={visible ? "text" : "password"}
				id={id}
				required
				autoComplete="current-password"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				style={{
					width: "100%",
					paddingInlineEnd: "3rem",
				}}
			/>
			<button
				type="button"
				onClick={() => setVisible(!visible)}
				style={{
					position: "absolute",
					right: "10px",
					top: "50%",
					background: "transparent",
					border: "none",
					fontSize: "1rem",
					color: "gray",
					cursor: "pointer",
					width: "min-content",
					height: "min-content",
					transform: "translateY(-40%)",
				}}
			>
				{visible && <FaEye />}
				{!visible && <FaEyeSlash />}
			</button>
		</div>
	);
};

export default PasswordField;
