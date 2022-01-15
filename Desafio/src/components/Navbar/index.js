import React from "react";
import { Link } from "react-router-dom";

//Motivo da não utilização do useMemo 
//e não conseguir replicar ele dentro do projeto.

const Navbar = () => {
  return (
    <div className="col-md-12 bg-dark py-2">
      <nav className="navbar bg-dark navbar-dark">
        <Link to={"/"} className="navbar-brand ml-5">
              Desafio × Trin.ca
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
