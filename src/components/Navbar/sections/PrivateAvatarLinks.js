import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {useAuth} from "../../../contexts/AppProvider";

const privateRoutes = [
	{id: "home", title: "Home", path: "/"},
	{id: "profile", title: "Profile", path: "profile"},
	{id: "logout", title: "Logout", path: "logout"},
];

export const PrivateAvatarLinks = () => {
	const {setIsLoggedIn} = useAuth();
	const [anchorElUser, setAnchorElUser] = useState(null);

	const navigate = useNavigate();

	const handleLogout = (event) => {
		if (event.target.id === "logout") {
			localStorage.clear();
			setIsLoggedIn(false);
			navigate("/", {replace: true});
		}
	};

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{flexGrow: 0}} onClick={handleLogout}>
			<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
				</IconButton>
			</Tooltip>
			<Menu
				sx={{mt: "45px"}}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
			>
				{privateRoutes.map((setting) => (
					<Link key={setting.id} to={setting.path} className="dropdown-btn">
						<MenuItem
							id={setting.id}
							key={setting.id}
							onClick={handleCloseUserMenu}
							textAlign="center"
						>
							{setting.title}
						</MenuItem>
					</Link>
				))}
			</Menu>
		</Box>
	);
};
