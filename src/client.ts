import { HoudiniClient } from '$houdini'

export default new HoudiniClient({
    url: 'http://localhost:3000/shop-api',
    fetchParams({ session }) {
        // Check if session and token exist
        //@ts-ignore
        const token = session?.user
        console.log(`token: ${token}`)
        return {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` })
            }
        }
    }
})