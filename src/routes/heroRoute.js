import { once } from "node:events";
import Hero from "../entities/hero.js";
import { DEFAULT_HEADER } from "../util/util.js";

const routes = ({ heroService }) => ({
  "/heroes:get": async (request, response) => {
    const heros = await heroService.find();

    response.write(JSON.stringify({results: heros}));
    response.end();
  },
  "/heroes:post": async (request, response) => {
    const data = await once(request, "data");
    const item = JSON.parse(data);
    const hero = new Hero(item);

    const id = await heroService.create(hero);
    response.writeHead(201, DEFAULT_HEADER);
    response.write(
      JSON.stringify({
        id,
        success: "User created with success!!",
      })
    );
    response.end();
  },
});

export { routes };
