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

export default contactApi