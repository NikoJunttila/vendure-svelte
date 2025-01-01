import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { i18n } from '$lib/i18n';
import { setSession } from '$houdini';

const AUTH_TOKEN_KEY = 'vendure-auth-token';

async function authenticateUser(event: any) {
    try {
        // Initial logging
        //console.log('Starting authentication process');

        // Get existing token from cookies
        const existingToken = event.cookies.get(AUTH_TOKEN_KEY);
        console.log('Existing token from cookies:', existingToken);

        // Set up headers
        const headers: Record<string, string> = {
            'Content-Type': 'application/json'
        };

        if (existingToken) {
            headers['Authorization'] = `Bearer ${existingToken}`;
            //console.log('Added authorization header with existing token');
        }

        // Make the API request
        //console.log('Making request to:', import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/shop-api');
        const response = await fetch(
            import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/shop-api',
            {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
                        query {
                        activeOrder {
                            totalQuantity
                        }
                        }
                    `,
                    variables: {}
                })
            }
        );

        //Check response status
        //console.log('Response status:', response.status);

        // Handle the auth token from response
        const newAuthToken = response.headers.get(AUTH_TOKEN_KEY);
        console.log('New auth token received:', newAuthToken ? 'Yes' : 'No');

        if (newAuthToken) {
            console.log('Setting new auth token in cookies');
            event.cookies.set(AUTH_TOKEN_KEY, newAuthToken, {
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            });
            return newAuthToken;
        }

        // If no new token, return existing token
        console.log('Returning existing token:', existingToken);
        return existingToken || null;

    } catch (error) {
        console.error('Authentication error:', error);
        return null;
    }
}

const handleParaglide: Handle = i18n.handle();

const handleHoudini: Handle = async ({ event, resolve }) => {
    const user = await authenticateUser(event);
    setSession(event, { user });
    return await resolve(event);
};

export const handle: Handle = sequence(handleParaglide, handleHoudini);