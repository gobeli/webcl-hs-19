import { Person, People } from './model';

export { PersonController };

/**
 * @typedef {{
 *  getPeople:    Function,
 *  addPerson:    Function,
 *  removePerson: Function,
 *  onPeopleAdd:  Function,
 *  onPeopleDel:  Function,
 * }} PersonController
 */

/**
 * @returns {PersonController}
 */
const PersonController = () => {
  const peopleModel = People();


  const addPerson = () => {
    const person = Person();
    peopleModel.add(person);
    return person;
  }

  return {
    getPeople:    peopleModel.getAll,
    addPerson,
    removePerson: peopleModel.del,
    onPeopleAdd:  peopleModel.onAdd,
    onPeopleDel:  peopleModel.onDel,
  }
}