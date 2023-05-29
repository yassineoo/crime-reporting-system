// component
import SvgColor from "../../components/svg-color";
import { AiOutlineFileText, AiOutlineFileSearch } from "react-icons/ai";
import {
	FaUser,
	FaSignOutAlt,
	FaChartBar,
	FaBalanceScale,
} from "react-icons/fa";

// ----------------------------------------------------------------------

const navConfig = [
	{
		title: "Reports",
		path: "/reports",
		icon: <AiOutlineFileText size={20} />,
	},
	{
		title: "Investigations",
		path: "/investigations",
		icon: <AiOutlineFileSearch size={20} />,
	},
	{
		title: "Court Cases",
		path: "/courtCases",
		icon: <FaBalanceScale size={20} />,
	},
	{
		title: "Statistics",
		path: "/statistics",
		icon: <FaChartBar size={20} />,
	},
	{
		title: "Profile",
		path: "/profile",
		icon: <FaUser size={20} />,
	},
	{
		title: "Log Out",
		path: "/",
		icon: <FaSignOutAlt size={20} />,
	},
];

export default navConfig;
