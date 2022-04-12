const roles = {
	admin: 2314,
	editor: 4221,
	user: 5924,
};

const rolesFull = (roleArr = ["User"]) => {
	let _full = {};
	roleArr.forEach((role) => {
		_full[role] = roles[role.toLowerCase()];
	});
	return _full;
};

module.exports = { roles, rolesFull };
