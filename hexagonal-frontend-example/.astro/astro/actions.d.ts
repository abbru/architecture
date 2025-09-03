declare module "astro:actions" {
	type Actions = typeof import("/var/www/html/architecture/hexagonal-frontend-example/src/actions")["server"];

	export const actions: Actions;
}