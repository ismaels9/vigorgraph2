import React from 'react';

function ProductRow({ analise, toggleDetails, isExpanded }) {
  const analiseId = analise[0];
  const dadosAnalise = analise[1][0];

  return (
    <div className="row">
      <div>{dadosAnalise.analise}</div>
      <div>{dadosAnalise.analista}</div>
      <div>{dadosAnalise.lote}</div>
      <div>{dadosAnalise.data}</div>
      <div>{dadosAnalise.especie}</div>
      <div>
        <button className="button button-flat" onClick={() => toggleDetails(analiseId)}>
          {isExpanded ? "-" : "+"}
        </button>
      </div>
    </div>
  );
}

export default ProductRow;
