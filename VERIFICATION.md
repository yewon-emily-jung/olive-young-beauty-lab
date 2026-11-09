# Current verification register

Catalog checked 2026-11-08: 32 requested Olive Young US families, 52 curated options. All selectable items have clean US product URLs, exact retailer option IDs, official local product photos and source provenance. Category family counts: cushion 6, eyeshadow 5, blush 6, lip 4, toner/mask 3, serum 4, cream 4.

The official 2025 Korean Awards hub supports 22 requested product families. Exact awarded shades, related shades/editions and unconfirmed products are distinguished in the interface. Full applicability and source mapping: AWARDS_2025_SOURCES.md; product links and image sources: PRODUCT_SOURCES.md and src/data/usProducts.ts. No award is inferred from a brand name, a bestseller badge or a differently named product.

The Dr.G set is retained as explicitly requested, with “out of stock when checked” disclosure. It remains playable. Other selected options were not out of stock in the retrieved retailer data; inventory may change. Biodance is a mask alternative in the first skincare step, previewed after removal; it is not relabeled as a toner formulation.

Chloe’s starting options follow warm styling; Rin’s follow cool styling. The specifically requested Lilybyred Nutty Beam/Grape Pink, dasique Rose Petal/Love Angel, rom&nd Jujube/Bare Grape/Peach Peach Me, and colorgram 04/29/17 are included. Styling labels are fictional creative directions, not a diagnosis. All shades remain available through the shade picker.

Native transparent product assets retain alpha. White or textured official source backgrounds are preserved; no claim that every image is a transparent cutout. The Anua toner’s near-white backdrop is lifted in CSS to blend with the shelf. Each cushion also has a local PNG photo retry if WebP fails. A missing official photo is not silently replaced by a fake packaging illustration. Historical demo records can still render illustrations and preserve their identity.

Validation: 21 domain/data tests plus the complete four-client JSDOM journey, including family shelves, shade selection without confirmation, award descriptions, real photos, PNG retry, reference tabs, replay, restart, wishlist and rewards. Build passes. Official image files decoded and packaging/guide contact sheets inspected. Browser visual QA remains pending because the managed browser-control runtime is unavailable.
