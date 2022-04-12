const REF_CK = {
	httpOnly: true,
	sameSite: "None",
	secure: true,
	maxAge: 1000 * 60 * 10, // ms * s * m * H * D * W * M * Y
};

module.exports = { REF_CK };
