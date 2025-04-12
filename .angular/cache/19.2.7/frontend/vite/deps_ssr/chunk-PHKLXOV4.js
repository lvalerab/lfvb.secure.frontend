import { createRequire } from 'module';const require = createRequire(import.meta.url);

// node_modules/@angular/animations/fesm2015/animations.mjs
function trigger(name, definitions) {
  return {
    type: 7,
    name,
    definitions,
    options: {}
  };
}
function animate(timings, styles = null) {
  return {
    type: 4,
    styles,
    timings
  };
}
function style(tokens) {
  return {
    type: 6,
    styles: tokens,
    offset: null
  };
}
function transition(stateChangeExpr, steps, options = null) {
  return {
    type: 1,
    expr: stateChangeExpr,
    animation: steps,
    options
  };
}
function animation(steps, options = null) {
  return {
    type: 8,
    animation: steps,
    options
  };
}
function useAnimation(animation2, options = null) {
  return {
    type: 10,
    animation: animation2,
    options
  };
}

export {
  trigger,
  animate,
  style,
  transition,
  animation,
  useAnimation
};
/*! Bundled license information:

@angular/animations/fesm2015/animations.mjs:
  (**
   * @license Angular v14.3.0
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/animations/fesm2015/animations.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)

@angular/animations/fesm2015/animations.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)

@angular/animations/fesm2015/animations.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)

@angular/animations/fesm2015/animations.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)

@angular/animations/fesm2015/animations.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)

@angular/animations/fesm2015/animations.mjs:
  (**
   * @license
   * Copyright Google LLC All Rights Reserved.
   *
   * Use of this source code is governed by an MIT-style license that can be
   * found in the LICENSE file at https://angular.io/license
   *)
*/
//# sourceMappingURL=chunk-PHKLXOV4.js.map
