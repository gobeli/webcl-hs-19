import { PersonController  } from './controller';
import { TableView, AddView } from './view';
const controller = PersonController();
TableView(controller, document.getElementById('table'));
AddView(controller,   document.getElementById('add'));

controller.addPerson();
