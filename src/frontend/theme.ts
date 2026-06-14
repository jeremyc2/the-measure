export type ColorScheme = "dark" | "light";

const colorSchemeStorageKey = "the-measure-color-scheme";

export const readStoredColorScheme = (): ColorScheme | undefined => {
	const stored = localStorage.getItem(colorSchemeStorageKey);
	return stored === "dark" || stored === "light" ? stored : undefined;
};

export const resolveColorScheme = (): ColorScheme => {
	const stored = readStoredColorScheme();
	if (stored !== undefined) {
		return stored;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

export const applyColorScheme = (colorScheme: ColorScheme): void => {
	document.documentElement.classList.toggle("dark", colorScheme === "dark");
	localStorage.setItem(colorSchemeStorageKey, colorScheme);
};

export const toggleColorScheme = (colorScheme: ColorScheme): ColorScheme => {
	const nextColorScheme = colorScheme === "dark" ? "light" : "dark";
	applyColorScheme(nextColorScheme);
	return nextColorScheme;
};
