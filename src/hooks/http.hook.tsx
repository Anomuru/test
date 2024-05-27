import {TypesOfMethods} from "constants/constants";

export const useHttp = () => {

    const request = async (url: string, method: TypesOfMethods = TypesOfMethods.GET, body?: string, headers = {'Content-Type': 'application/json'}) => {

        try {
            let response = await fetch(url, {method, mode: 'cors', body, headers})

            if (!response.ok) {
                throw new Error(`Error... fetch ${url}, status: ${response.status}`)
            }

            const data = await response.json()

            return data
        } catch (e) {
            throw e
        }
    }

    return {request}
}