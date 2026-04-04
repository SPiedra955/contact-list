export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {

    case 'deleteContactInAgenda':
      return {
        ...store,
        contacts: store.contacts.filter(contact => contact.id != Number(action.payload.id))
      }

    case 'createNewAgendaContact':
      return {
        ...store,
        contacts: action.payload.contacts
      }
    case 'deleteAgenda':
      return {
        ...store,
        agendas: store.agendas.filter(agenda => agenda.slug != action.payload.slug)
      }

    case 'createAgenda':
      const { newSlug } = action.payload
      return {
        ...store,
        newSlug: [...store.agendas, newSlug]
      }

    case 'selectContact':
      const { selected } = action.payload
      return {
        ...store,
        selected
      }

    case 'setContacts':
      return {
        ...store,
        contacts: action.payload.contacts
      }

    case 'selectAgenda':
      const { agenda } = action.payload
      return {
        ...store,
        agenda
      }


    case 'getAgendas':
      const { agendas } = action.payload
      return {
        ...store,
        agendas
      }


    case 'add_task':

      const { id, color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }
}
