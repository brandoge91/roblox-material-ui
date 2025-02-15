/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CorePalette } from './palettes/core_palette';

/**
 * Represents a Material color scheme, a mapping of color roles to colors.
 */
export default class Scheme {
	/**
	 * @return Light Material color scheme, based on the color's hue.
	 */
	static light(color3: Color3): Scheme {
		const core = CorePalette.of(color3);
		return new Scheme({
			primary: core.a1.tone(40),
			onPrimary: core.a1.tone(100),
			primaryContainer: core.a1.tone(90),
			onPrimaryContainer: core.a1.tone(10),
			secondary: core.a2.tone(40),
			onSecondary: core.a2.tone(100),
			secondaryContainer: core.a2.tone(90),
			onSecondaryContainer: core.a2.tone(10),
			tertiary: core.a3.tone(40),
			onTertiary: core.a3.tone(100),
			tertiaryContainer: core.a3.tone(90),
			onTertiaryContainer: core.a3.tone(10),
			error: core.error.tone(40),
			onError: core.error.tone(100),
			errorContainer: core.error.tone(90),
			onErrorContainer: core.error.tone(10),
			background: core.n1.tone(99),
			onBackground: core.n1.tone(10),
			surface: core.n1.tone(99),
			onSurface: core.n1.tone(10),
			surfaceVariant: core.n2.tone(90),
			onSurfaceVariant: core.n2.tone(30),
			outline: core.n2.tone(50),
			shadow: core.n1.tone(0),
			inverseSurface: core.n1.tone(20),
			inverseOnSurface: core.n1.tone(95),
			inversePrimary: core.a1.tone(80),
		});
	}

	/**
	 * @return Dark Material color scheme, based on the color's hue.
	 */
	static dark(color3: Color3): Scheme {
		const core = CorePalette.of(color3);
		return new Scheme({
			primary: core.a1.tone(80),
			onPrimary: core.a1.tone(20),
			primaryContainer: core.a1.tone(30),
			onPrimaryContainer: core.a1.tone(90),
			secondary: core.a2.tone(80),
			onSecondary: core.a2.tone(20),
			secondaryContainer: core.a2.tone(30),
			onSecondaryContainer: core.a2.tone(90),
			tertiary: core.a3.tone(80),
			onTertiary: core.a3.tone(20),
			tertiaryContainer: core.a3.tone(30),
			onTertiaryContainer: core.a3.tone(90),
			error: core.error.tone(80),
			onError: core.error.tone(20),
			errorContainer: core.error.tone(30),
			onErrorContainer: core.error.tone(80),
			background: core.n1.tone(10),
			onBackground: core.n1.tone(90),
			surface: core.n1.tone(10),
			onSurface: core.n1.tone(90),
			surfaceVariant: core.n2.tone(30),
			onSurfaceVariant: core.n2.tone(80),
			outline: core.n2.tone(60),
			shadow: core.n1.tone(0),
			inverseSurface: core.n1.tone(90),
			inverseOnSurface: core.n1.tone(20),
			inversePrimary: core.a1.tone(40),
		});
	}

	public constructor(
		public readonly Colors: {
			primary: Color3;
			primaryContainer: Color3;
			onPrimary: Color3;
			onPrimaryContainer: Color3;
			secondary: Color3;
			secondaryContainer: Color3;
			onSecondary: Color3;
			onSecondaryContainer: Color3;
			tertiary: Color3;
			tertiaryContainer: Color3;
			onTertiary: Color3;
			onTertiaryContainer: Color3;
			error: Color3;
			errorContainer: Color3;
			onError: Color3;
			onErrorContainer: Color3;
			background: Color3;
			onBackground: Color3;
			surface: Color3;
			onSurface: Color3;
			surfaceVariant: Color3;
			onSurfaceVariant: Color3;
			outline: Color3;
			shadow: Color3;
			inverseSurface: Color3;
			inverseOnSurface: Color3;
			inversePrimary: Color3;
		},
	) {}
}
