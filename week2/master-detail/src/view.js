export { TableView, AddView };

/**
 * @param {import('./controller').PersonController} controller
 * @param {HTMLElement} $root
 */
const AddView = (controller, $root) => {
  const $button = document.createElement('button');
  $button.innerText = '+';
  $button.addEventListener('click', controller.addPerson);
  $root.appendChild($button);
}

/**
 * @param {import('./controller').PersonController} controller
 * @param {HTMLElement} $root
 */
const TableView = (controller, $root) => {
  const render = () => {
    const renderPerson = person => `
      <tr>
        <td>${person.getName()}</td>
        <td>${person.getAge()}</td>
      </tr>
    `;

    const view = `
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          ${controller.getPeople().map(renderPerson).join('')}
        </tbody>
      </table>
    `;

    $root.innerHTML = view;
  }

  controller.onPeopleDel(render);
  controller.onPeopleAdd(render);
}