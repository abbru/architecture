import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, r as renderTemplate, d as renderHead, e as renderComponent } from '../chunks/astro/server_D9_NXcyX.mjs';
import 'kleur/colors';
import 'clsx';
import { a as actions } from '../chunks/_astro_actions_D8Wr8XK3.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$UserProfile = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$UserProfile;
  const result = Astro2.getActionResult(actions.createUser);
  return renderTemplate`${maybeRenderHead()}<div id="user-form"> <form method="POST"${addAttribute(actions.createUser, "action")}> <input name="name" placeholder="Nombre" required> <input name="email" placeholder="Email" required> <button type="submit">Crear Usuario</button> </form> ${result && result.error && renderTemplate`<div class="error"> ${result.error.message} </div>`} ${result && result.data && renderTemplate`<div class="user-display"> <h3>Usuario Creado</h3> <p>ID: ${result.data.user.id}</p> <p>Nombre: ${result.data.user.name}</p> <p>Email: ${result.data.user.email}</p> </div>`} </div>`;
}, "/var/www/html/architecture/hexagonal-frontend-example/src/components/form/ui/UserProfile.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="es"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Hexagonal Frontend Example</title>${renderHead()}</head> <body> <h1>Ejemplo de Arquitectura Hexagonal en Frontend</h1> ${renderComponent($$result, "UserProfile", $$UserProfile, {})} </body></html>`;
}, "/var/www/html/architecture/hexagonal-frontend-example/src/pages/index.astro", void 0);

const $$file = "/var/www/html/architecture/hexagonal-frontend-example/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
