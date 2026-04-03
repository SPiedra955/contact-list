const contactApi = {}
const url = 'https://playground.4geeks.com/contact'

contactApi.getUser = async () => {
    try {
        const resp = await fetch(`${url}/agendas`)
        if (!resp.ok) throw new Error('Something went wrong')
        const data = await resp.json()
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}

contactApi.getAgenda = async (slug) => {

    try {
        const resp = await fetch(`${url}/agendas/${slug}`)
        if (!resp.ok) throw new Error('Something went wrong')
        const data = await resp.json()
        console.log(data)

        return data
    } catch (error) {
        return error
    }
}

contactApi.createNewAgenda = async ({ slug }) => {
    try {
        const resp = await fetch(`${url}/agendas/${slug}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!resp.ok) throw new Error('Error fetching posts')
        const data = await resp.json()
        return data

    } catch (error) {
        return error
    }
}

contactApi.deleteAgenda = async (slug) => {
    try {
        const resp = await fetch(`${url}/agendas/${slug}`, {
            method: "DELETE",
        });
        if (!resp.ok) throw new Error("Error deleting ");
        const data = await resp.json()
        return data
    } catch (error) {
        return error
    }
}


contactApi.getUserContacts = async (slug) => {
    try {
        const resp = await fetch(`${url}/agendas/${slug}/contacts`)
        if (!resp.ok) throw new Error('Something went wrong')
        const data = await resp.json()
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}

contactApi.createNewUserContact = async ({ slug, contact }) => {
    try {
        const resp = await fetch(`${url}/agendas/${slug}/contacts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });
        if (!resp.ok) throw new Error('Error fetching posts')
        const data = await resp.json()
        return data

    } catch (error) {
        return error
    }
}

contactApi.UpdateUserContact = async ({ slug, contactId, formData }) => {
    try {
        const resp = await fetch(`${url}/agendas/${slug}/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!resp.ok) throw new Error('Error updating posts')
        const data = await resp.json()
        return data

    } catch (error) {
        return error
    }
}
export default contactApi