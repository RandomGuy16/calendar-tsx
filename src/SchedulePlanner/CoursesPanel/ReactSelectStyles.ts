import { StylesConfig } from "react-select";

const selectColor= "#6faaf7"
const menuColor = "#4f82c4"
const reactSelectStyles: StylesConfig = {
// github copilot generated styles
	control: (baseStyles, state) => ({
		...baseStyles,
		backgroundColor: `${selectColor}`,
		border: "1px solid transparent",
		boxShadow: state.isFocused ? "0 0 0 1px var(--color-blue-500)" : "none",
		"&:hover": {
			borderColor: "blue",
		},
		color: "white",
	}),
	indicatorSeparator: (baseStyles) => ({
		...baseStyles,
		display: "none",
	}),
	indicatorsContainer: (baseStyles) => ({
		...baseStyles,
		"svg": {
		height: "0.75rem",
		width: "0.75rem"
		}
	}),
	dropdownIndicator: (baseStyles) => ({
		...baseStyles,
		color: "var(--color-blue-500)",
		"&:hover": {
			color: "var(--color-blue-500)",
		},
	}),
	menu: (baseStyles) => ({
		...baseStyles,
		zIndex: 9999,
		backgroundColor: `${menuColor}`,
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		borderRadius: "0.25rem",
		marginTop: "0px",
	}),
	option: (baseStyles, state) => ({
		...baseStyles,
		backgroundColor: state.isFocused ? "var(--color-blue-100)" : "var(--color-white)",
		color: state.isFocused ? "var(--color-blue-700)" : "var(--color-gray-900)",
		cursor: "pointer",
		padding: "8px 12px",
		"&:active": {
			backgroundColor: "var(--color-blue-200)",
		}
	}),
	singleValue: (baseStyles) => ({
		...baseStyles,
		color: "white",
	}),
	input: (baseStyles) => ({
		...baseStyles,
		color: "white",
	})
}

export default reactSelectStyles