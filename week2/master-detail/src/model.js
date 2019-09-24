import { Observable, ObservableList } from './lib/observable';

export { Person, People };

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