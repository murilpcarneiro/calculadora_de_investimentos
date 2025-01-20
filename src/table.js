const isNonEmptyArray = (array) => {
  return Array.isArray(array) && array.length > 0;
}

const createTable = (columnsArray, dataArray, tableId) => {
  if (!isNonEmptyArray(columnsArray) || !isNonEmptyArray(dataArray) || !tableId) {
    throw new Error('Para a correta execução, precisamos de um array com as colunas, outro com as linhas e também o id do elemento tabela selecionado');
  }
  const tableElement = document.getElementById(tableId);
  if (!tableElement || tableElement.nodeName !== 'TABLE') {
    throw new Error("Id informado não corresponde a nenhum elemento table");
  }

  createTableHeader(tableElement, columnsArray);
  createTableBody(tableElement);
}

function createTableHeader(tableReference, columnsArray) {
  function createTheadElement(tableReference) {
    const thead = document.createElement('thead');
    tableReference.appendChild(thead);
    return thead;
  }
  const tableHeaderReference = tableReference.querySelector('thead') ?? createTheadElement(tableReference);
  const headerRow = document.createElement('tr');
  for (const tableColumnObject of columnsArray) {
    const headerElement =/*html*/`<th class='text-center' >${tableColumnObject.columnLabel}</th>`
    headerRow.innerHTML += headerElement;
  }
  tableHeaderReference.appendChild(headerRow);
}

function createTableBody(tableReference) {

}

export default createTable;