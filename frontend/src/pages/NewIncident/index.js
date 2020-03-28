import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function NewIncident(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const history = useHistory();

    const ongId = localStorage.getItem("ongId");

    async function handleRegisterIncident(event){
      event.preventDefault();

      const data = {
        title,
        description,
        value
      };      

      try {
        await api.post('incidents', data, {
          headers: {
            Authorization: ongId
          }
        });
        alert('Caso cadastrado com sucesso!');

        history.push('/profile');

      } catch (error) {
        alert('Erro ao realizar o cadastro do caso, tente novamente');
      }
    }

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
  
          <form onSubmit={handleRegisterIncident}>
            <input 
            value={title}
            onChange={event => setTitle(event.target.value)}
            placeholder="Título do caso" />
            <textarea 
            value={description}
            onChange={event => setDescription(event.target.value)}
            name="descricao" cols="30" rows="10" placeholder="Descrição"></textarea>
            <input value={value}
            onChange={event => setValue(event.target.value)}
            placeholder="Valores em reais" />
  
            <button className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
}