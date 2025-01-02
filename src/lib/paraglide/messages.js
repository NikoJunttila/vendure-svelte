/* eslint-disable */
import { languageTag } from "./runtime.js"
import * as en from "./messages/en.js"
import * as fi from "./messages/fi.js"


/**
 * This message has been compiled by [inlang paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs).
 *
 * - Don't edit the message's code. Use [Sherlock (VS Code extension)](https://inlang.com/m/r7kp499g/app-inlang-ideExtension),
 *   the [web editor](https://inlang.com/m/tdozzpar/app-inlang-finkLocalizationEditor) instead, or edit the translation files manually.
 * 
 * - The params are NonNullable<unknown> because the inlang SDK does not provide information on the type of a param (yet).
 * 
 * @param {{ name: NonNullable<unknown> }} params
 * @param {{ languageTag?: "en" | "fi" }} options
 * @returns {string}
 */
/* @__NO_SIDE_EFFECTS__ */
export const hello_world = (params , options = {}) => {
	return {
		en: en.hello_world,
		fi: fi.hello_world
	}[options.languageTag ?? languageTag()](params)
}



/**
 * This message has been compiled by [inlang paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs).
 *
 * - Don't edit the message's code. Use [Sherlock (VS Code extension)](https://inlang.com/m/r7kp499g/app-inlang-ideExtension),
 *   the [web editor](https://inlang.com/m/tdozzpar/app-inlang-finkLocalizationEditor) instead, or edit the translation files manually.
 * 
 * - The params are NonNullable<unknown> because the inlang SDK does not provide information on the type of a param (yet).
 * 
 * @param {{}} params
 * @param {{ languageTag?: "en" | "fi" }} options
 * @returns {string}
 */
/* @__NO_SIDE_EFFECTS__ */
export const test = (params = {}, options = {}) => {
	return {
		en: en.test,
		fi: fi.test
	}[options.languageTag ?? languageTag()]()
}



/**
 * This message has been compiled by [inlang paraglide](https://inlang.com/m/gerre34r/library-inlang-paraglideJs).
 *
 * - Don't edit the message's code. Use [Sherlock (VS Code extension)](https://inlang.com/m/r7kp499g/app-inlang-ideExtension),
 *   the [web editor](https://inlang.com/m/tdozzpar/app-inlang-finkLocalizationEditor) instead, or edit the translation files manually.
 * 
 * - The params are NonNullable<unknown> because the inlang SDK does not provide information on the type of a param (yet).
 * 
 * @param {{}} params
 * @param {{ languageTag?: "en" | "fi" }} options
 * @returns {string}
 */
/* @__NO_SIDE_EFFECTS__ */
export const why = (params = {}, options = {}) => {
	return {
		en: en.why,
		fi: fi.why
	}[options.languageTag ?? languageTag()]()
}

