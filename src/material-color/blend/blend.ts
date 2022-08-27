/**
 * @license
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

// This file is automatically generated. Do not modify it.

import { Int } from '@rbxts/colour-utils';
import { Cam16 } from '../hct/cam16';
import { Hct } from '../hct/hct';
import * as colorUtils from '../utils/color_utils';
import * as mathUtils from '../utils/math_utils';

// libmonet is designed to have a consistent API across platforms
// and modular components that can be moved around easily. Using a class as a
// namespace facilitates this.
//
// tslint:disable:class-as-namespace

/**
 * Functions for blending in HCT and CAM16.
 */
export class Blend {
	/**
	 * Blend the design color's HCT hue towards the key color's HCT
	 * hue, in a way that leaves the original color recognizable and
	 * recognizably shifted towards the key color.
	 *
	 * @param designColor Color3 representation of an arbitrary color.
	 * @param sourceColor Color3 representation of the main theme color.
	 * @return The design color with a hue shifted towards the
	 * system's color, a slightly warmer/cooler variant of the design
	 * color's hue.
	 */
	static harmonize(designColor: Color3, sourceColor: Color3): Color3 {
		const fromInt = Int.toInt(designColor);
		const fromHct = Hct.fromInt(fromInt);
		const toInt = Int.toInt(sourceColor);
		const toHct = Hct.fromInt(toInt);
		const differenceDegrees = mathUtils.differenceDegrees(fromHct.getHue(), toHct.getHue());
		const rotationDegrees = math.min(differenceDegrees * 0.5, 15.0);
		const outputHue = mathUtils.sanitizeDegreesDouble(
			fromHct.getHue() + rotationDegrees * mathUtils.rotationDirection(fromHct.getHue(), toHct.getHue()),
		);
		const outputInt = Hct.from(outputHue, fromHct.getChroma(), fromHct.getTone()).toInt();
		return Int.fromInt(outputInt);
	}

	/**
	 * Blends hue from one color into another. The chroma and tone of
	 * the original color are maintained.
	 *
	 * @param from Color3 representation of color
	 * @param to Color3 representation of color
	 * @param amount how much blending to perform; 0.0 >= and <= 1.0
	 * @return from, with a hue blended towards to. Chroma and tone
	 * are constant.
	 */
	static hctHue(from: Color3, to: Color3, amount: number): Color3 {
		const fromInt = Int.toInt(from);
		const ucs = Int.toInt(Blend.cam16Ucs(from, to, amount));
		const ucsCam = Cam16.fromInt(ucs);
		const fromCam = Cam16.fromInt(fromInt);
		const blended = Hct.from(ucsCam.hue, fromCam.chroma, colorUtils.lstarFromArgb(fromInt));
		const outputInt = blended.toInt();
		return Int.fromInt(outputInt);
	}

	/**
	 * Blend in CAM16-UCS space.
	 *
	 * @param from Color3 representation of color
	 * @param to Color3 representation of color
	 * @param amount how much blending to perform; 0.0 >= and <= 1.0
	 * @return from, blended towards to. Hue, chroma, and tone will
	 * change.
	 */
	static cam16Ucs(from: Color3, to: Color3, amount: number): Color3 {
		const fromInt = Int.toInt(from);
		const toInt = Int.toInt(to);
		const fromCam = Cam16.fromInt(fromInt);
		const toCam = Cam16.fromInt(toInt);
		const fromJ = fromCam.jstar;
		const fromA = fromCam.astar;
		const fromB = fromCam.bstar;
		const toJ = toCam.jstar;
		const toA = toCam.astar;
		const toB = toCam.bstar;
		const jstar = fromJ + (toJ - fromJ) * amount;
		const astar = fromA + (toA - fromA) * amount;
		const bstar = fromB + (toB - fromB) * amount;
		const outputInt = Cam16.fromUcs(jstar, astar, bstar).toInt();
		return Int.fromInt(outputInt);
	}
}