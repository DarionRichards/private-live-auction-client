import {useState} from "react";
import {Link} from "react-router-dom";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";

const publicRoutes = [
	{id: "home", title: "Home", path: "/"},
	{id: "login", title: "Login", path: "login"},
	{id: "signup", title: "Signup", path: "signup"},
];

export const PublicHamburgerMenu = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};
	return (
		<Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleOpenNavMenu}
				color="inherit"
			>
				<MenuIcon />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorElNav}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
				sx={{
					display: {xs: "block", md: "none"},
				}}
			>
				{publicRoutes.map((page, i) => (
					<Link
						key={i}
						to={page.path}
						textAlign="center"
						className="dropdown-btn"
					>
						<MenuItem id={page.id} onClick={handleCloseNavMenu}>
							{page.title}
						</MenuItem>
					</Link>
				))}
			</Menu>
		</Box>
	);
};
