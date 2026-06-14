export const buttonBaseClass =
	"inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:cursor-not-allowed disabled:border-neutral-200 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:shadow-none disabled:active:scale-100 dark:disabled:border-zinc-700 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-500";

export const primaryButtonClass = `${buttonBaseClass} border-pink-600 bg-pink-600 text-white shadow-sm hover:border-pink-500 hover:bg-pink-500 dark:border-pink-400 dark:bg-pink-400 dark:text-zinc-950 dark:hover:border-pink-300 dark:hover:bg-pink-300`;

export const secondaryButtonClass = `${buttonBaseClass} border-neutral-300 bg-white text-neutral-950 hover:border-pink-400 hover:bg-pink-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-pink-400 dark:hover:bg-pink-950/40`;

export const ghostButtonClass = `${buttonBaseClass} border-transparent bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100`;

export const surfaceCardClass =
	"rounded-lg border border-neutral-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900";

export const appShellClass =
	"min-h-screen bg-white font-sans text-neutral-950 antialiased dark:bg-zinc-950 dark:text-zinc-100";

export const displayTitleClass = "font-display font-semibold";

export const hotPinkBoundaryClass =
	"rounded-lg border-4 border-pink-500 bg-white p-4 shadow-[0_0_0_1px_rgba(236,72,153,0.18)] dark:bg-zinc-950";

export const provenancePillClass =
	"inline-flex items-center rounded-full border border-pink-200 bg-pink-50 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-pink-700 dark:border-pink-800 dark:bg-pink-950/50 dark:text-pink-200";
