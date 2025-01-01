/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    "watchSchema": {
        "url": "http://localhost:3000/shop-api"
    },
    "runtimeDir": ".houdini",
    "plugins": {
        "houdini-svelte": {
            forceRunesMode: true
        }
    },
    scalars: {
		DateTime: {
			type: 'string',
		},
        Money: {
            type: 'any'
        }
	},
    defaultFragmentMasking: true,
}

export default config
