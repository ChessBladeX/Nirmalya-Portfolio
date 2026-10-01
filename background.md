# Integrate <PredictiveArcCanvas /> from ThreeUI using its exact source

You are working in an existing application. Implement this component from the exact source linked or included below. Do not recreate it from the preview, screenshot, description, or filename.

Component: `PredictiveArcCanvas`
Variant: **Predictive Arc** (`predictive`)
Runtime: Canvas 2D + Raw WebGL + Three.js r128
Source revision: `SHA-256 fa86582fc870`

Reference brief:
The violet predictive pixel arch with a luminous animated core.

## Current configured usage

```tsx
import { PredictiveArcCanvas } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame">
      <PredictiveArcCanvas
        mode="dark"
        speed={1.00}
        hue={0}
        saturation={1.00}
        brightness={1.00}
      />
    </div>
  );
}
```

## Exact implementation source

Complete registered source bundle: [https://threeui.com/source-code/predictive-arc.json](https://threeui.com/source-code/predictive-arc.json)

Required registered files:

- `src/shaders/predictive-arc/PredictiveArcCollection.tsx` — component · SHA-256 `b77a845ab2fa8e8ef8d9b6812d71efe6f320d865d97ec97b2e15253b5950fd63`
- `src/shaders/predictive-arc/PredictiveArcCanvas.tsx` — variant-component · SHA-256 `ebaa5a1b1f785c7772aaedc2b195318fd63bd9c3e5e5d8e175600968b245dae7`
- `src/shaders/predictive-arc/predictiveArcRenderer.ts` — renderer-source · SHA-256 `fc08c66b13c4a8173c8a88845926b72266d1b1a4fc345c84f44ee61fbfaba92b`
- `src/shaders/data-pixel-arc/DataPixelArcCanvas.tsx` — variant-component · SHA-256 `2e25156d43dfd1bf0fb47384f75df240cd0c4038deae75a8dacae7c213269c5b`
- `src/shaders/data-pixel-arc/dataPixelArcRenderer.ts` — variant-renderer-source · SHA-256 `65bdfb98424996d935923f39f163e1667f0bc2b8faa458d900f4450beabba0eb`
- `src/shaders/neuform-isolated/NeuformBatchEffects.tsx` — variant-component · SHA-256 `dc68c51bea26b922965de44b4fb8d6c432607508fb2b61e16ed60d245da1a69f`
- `src/shaders/neuform-isolated/sources/amber-halftone.html` — canonical-source · SHA-256 `3d9ebb64a15a1985c4cef1f01457281a49b2d9900405fd674e8748cac8af00a0`
- `src/shaders/neuform-isolated/sources/signal-particles.html` — canonical-source · SHA-256 `613a2005d18795dbc25a5d0f93c3ae4dfecdfcb939ea6e2c5702b82eb1e4bfff`
- `src/shaders/neuform-isolated/sources/override-grid.html` — canonical-source · SHA-256 `dc7800f2b6b6329b8b71ea4a06b82af91cff8379701c6a7fa4c9a92d47f89d6c`
- `src/shaders/ribbon-field/RibbonFieldBackground.tsx` — variant-component · SHA-256 `fab02cb57c44c7307afd29cd03d01141372ad90163632b9a6a77910a245a5996`
- `src/shaders/ribbon-field/ribbonFieldShaders.ts` — variant-renderer-source · SHA-256 `ab578acab44bbff7f3cf67f1c82b3e2e1d03689de3fcbdc23681e8b5a0a3536c`
- `src/shaders/neuform-isolated/NeuformIsolatedEffects.tsx` — variant-component · SHA-256 `fe9856234253bc3c1a13b3afb84f3d84644dfa6d578e7203bb3e1dd5eced1b75`
- `src/shaders/neuform-isolated/sources/void-protocol.html` — variant-source · SHA-256 `affd21553ba951c0ff0f5a8e40a84ae70d49aaff3c4c69ea4ae1ec897dec21e3`
- `src/shaders/neuform-isolated/NeuformCraftEffects.tsx` — variant-component · SHA-256 `0a1680c3c119dba8c61d946322afa0b64d36dfd80956fb5e7c3fd017d7bfa450`
- `src/shaders/neuform-isolated/sources/nexus-unified-flow.html` — variant-source · SHA-256 `fa1a015ae407dc2091c3c96239d28107e973cbc03aa7abef37dd5da791d5428b`
- `src/shaders/threeui.css` — shared-style · SHA-256 `efe4447139f1358dd8e9be68edf6fa46cbefbd1de423a4d6c439ca61d2c8eccf`

## Implementation requirements

- Preserve the authored structure, styling, shaders, motion, interactions, responsive behavior, dependencies, and asset paths described by the source.
- Use the configured `<PredictiveArcCanvas />` usage above, including the selected variant and props.
- Build directly in the destination project. Do not embed the ThreeUI documentation page and do not approximate the result from its rendered appearance.
- Fetch and read the complete source before editing. If the source cannot be retrieved, stop and report that instead of recreating it.
- After implementation, verify the rendered result and its interactions in the browser.

