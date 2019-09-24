(function () {
    'use strict';

    const Observable = value => {
        const listeners = [];
        return {
            onChange: callback => {
                listeners.push(callback);
                callback(value, value);
            },
            getValue: ()       => value,
            setValue: newValue => {
                if (value === newValue) return;
                const oldValue = value;
                value = newValue;
                listeners.forEach(callback => callback(value, oldValue));
            }
        }
    };


    const ObservableList = list => {
        const addListeners = [];
        const delListeners = [];
        const removeAt     = array => index => array.splice(index, 1);
        const removeItem   = array => item  => { const i = array.indexOf(item); if (i>=0) removeAt(array)(i); };
        const listRemoveItem     = removeItem(list);
        const delListenersRemove = removeAt(delListeners);
        return {
            onAdd: listener => addListeners.push(listener),
            onDel: listener => delListeners.push(listener),
            add: item => {
                list.push(item);
                addListeners.forEach( listener => listener(item));
            },
            del: item => {
                listRemoveItem(item);
                const safeIterate = [...delListeners]; // shallow copy as we might change listeners array while iterating
                safeIterate.forEach( (listener, index) => listener(item, () => delListenersRemove(index) ));
            },
            removeDeleteListener: removeItem(delListeners),
            count:   ()   => list.length,
            countIf: pred => list.reduce( (sum, item) => pred(item) ? sum + 1 : sum, 0),
            get:     index => list[index],
            getAll:  ()    => list,
        }
    };

    const Person = ({ name = '', age = 0 } = {}) => {
      const nameAttr = Observable(name);
      const ageAttr  = Observable(age);

      return {
        getName:       nameAttr.getValue,
        setName:       nameAttr.setValue,
        onNameChanged: nameAttr.onChange,

        getAge:        ageAttr.getValue,
        setAge:        ageAttr.setValue,
        onAgeChanged:  ageAttr.onChange
      }
    };

    const People = (people = []) => ObservableList(people);

    const PersonController = () => {
      const peopleModel = People();


      const addPerson = () => {
        const person = Person();
        peopleModel.add(person);
        return person;
      };

      return {
        getPeople:    peopleModel.getAll,
        addPerson,
        removePerson: peopleModel.del,
        onPeopleAdd:  peopleModel.onAdd,
        onPeopleDel:  peopleModel.onDel,
      }
    };

    const AddView = (controller, $root) => {
      const $button = document.createElement('button');
      $button.innerText = '+';
      $button.addEventListener('click', controller.addPerson);
      $root.appendChild($button);
    };

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
      };

      controller.onPeopleDel(render);
      controller.onPeopleAdd(render);
    };

    const controller = PersonController();
    TableView(controller, document.getElementById('table'));
    AddView(controller,   document.getElementById('add'));

    controller.addPerson();

}());
//# sourceMappingURL=bundle.js.map
