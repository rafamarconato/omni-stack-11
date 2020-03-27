import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";

export default function NewIncident(){
    return(
        <div className="new-incident-container">
        <div className="content">
          <section className="cadastro">
            <img src={logoImg} alt="Be The Hero" />
            <h1>Cadastrar novo caso</h1>
            <p>
              Descreva o caso detalhadamente para encontrar um herói para resolver isso
            </p>
  
            <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#e02041" />
              Voltar para home
            </Link>
          </section>
  
          <form>
            <input placeholder="Título do caso" />
            <textarea name="descricao" cols="30" rows="10" placeholder="Descrição"></textarea>
            <input placeholder="Valores em reais" />
  
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
}