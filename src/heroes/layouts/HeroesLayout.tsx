import { Link, Outlet } from "react-router";

export const HeroesLayout = () => {
  return (
    <div className="bg-red-100">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/heroes/1">Hero</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
      <section className="mt-40">
        <Outlet />
      </section>
    </div>
  );
};
