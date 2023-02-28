/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Collapsible from '../components/Collapsible';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Map the "collapsible" tag to our <Collapsible /> component!
  // `Collapsible` will receive all props that were passed to `collapsible` in MDX
  Collapsible,
};