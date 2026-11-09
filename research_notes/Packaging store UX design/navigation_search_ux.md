# Evidence-based UX for header, navigation, search and product finding (mid-sized, spec-heavy catalog: packaging store, about 377 products)

> **Read this first: limits on the evidence (researched 2026-11-09).** Every attempt to open a full page failed: WebFetch returned "unable to verify domain" for baymard.com, nngroup.com, web.dev, pubsonline.informs.org and informs.org. I did not try to get around that check. All findings below therefore come from **search-result excerpts and search-tool summaries of those pages**, not from a full read. Sample sizes, dates and context are often missing, and a few figures could not be tied to one exact URL. In those cases the most likely page is cited and marked "(URL match approximate)". Verify any figure against the original before quoting it publicly.
>
> **Evidence labels:**
> - **[Field]** = randomized or live-traffic experiment
> - **[Lab]** = controlled or moderated user study
> - **[Benchmark]** = Baymard's prevalence or severity ratings of sites. These show how common a problem is, **not** how much it costs in conversion
> - **[Expert]** = practitioner guidance without published data in the excerpt
> - **[Case study]** = self-reported by the company or publisher
> - **[Vendor]** = marketing content
> - **[Secondary]** = a restatement of someone else's figure
> - **[Older]** = before 2022, or undated and probably older
>
> Baymard sells research and audits, and web.dev case studies are published to promote performance work. Both have an interest in the results they report.

## What does usability research say about header layout, sticky headers, and mega-menus versus horizontal category bars, including what to do when items overflow?

### Takeaway
Keep the main categories visible and open them with a delayed hover (300-500 ms) on desktop. Avoid a horizontally scrolling category strip, because NN/g reports consistently negative reactions to horizontal scrolling on desktop and says hidden items get harder to find. Sticky headers are supported only when compact and opaque. I found no controlled study comparing a mega-menu with a category bar, or testing overflow patterns directly.

### Cited Findings
**Visible versus hidden navigation**
- [Lab] [Older: recalled as 2016, date not confirmed in the excerpt] On desktop, people used hidden menus in only 27% of cases and used visible or combo navigation almost twice as much. — [NN/g, Hamburger Menus and Hidden Navigation](https://www.nngroup.com/articles/hamburger-menus/)
- [Expert] NN/g treats combined navigation, with some options exposed and the rest collapsed, as a viable mobile pattern. Its BBC example pairs a visible bar with a "More" menu. — [NN/g, Basic Patterns for Mobile Navigation](https://www.nngroup.com/articles/mobile-navigation-patterns/) (URL match approximate)
- [Expert] Where a site has more than four top-level links, NN/g says hiding some links is the only reasonable solution on mobile and judges expandable menus more usable than the alternatives. — [NN/g, Basic Patterns for Mobile Navigation](https://www.nngroup.com/articles/mobile-navigation-patterns/) (URL match approximate)

**Overflow and horizontal scrolling**
- [Expert] Horizontal scrolling on desktop is described as one of the few interactions that consistently generate negative responses from users. If arrows are visible only on hover, people might never discover there is more content. — [NN/g, Beware Horizontal Scrolling](https://www.nngroup.com/articles/horizontal-scrolling/)
- [Expert] When tabs overflow, the bar often becomes a carousel, hidden tabs become harder to find, and reaching them takes more effort. Fewer tabs and short labels are recommended. These findings concern tabs and apply to category bars only by analogy. — [NN/g, Tabs, Used Right](https://www.nngroup.com/articles/tabs-used-right/)
- [Expert, weak] "Beyond about seven items the bar starts feeling crowded" is a rule of thumb from a vendor guide with no data. — [Lovable, website menu examples](https://lovable.dev/de/guides/website-menu-examples)

**Mega-menus and dropdowns**
- [Benchmark] In desktop testing, hover-based dropdowns outperformed other main navigation menus. — [Baymard, Homepage & Navigation UX Best Practices 2026](https://baymard.com/research-articles/ecommerce-navigation-best-practice) (URL match approximate)
- [Benchmark] Hover-based dropdowns should have a 300-500 ms delay to prevent flickering when the cursor crosses the navigation. 62% of sites lack one according to the 2026 article; an older article says 60%. — [Baymard 2026](https://baymard.com/research-articles/ecommerce-navigation-best-practice); [Baymard, hover delay](https://baymard.com/blog/dropdown-menu-flickering-issue)
- [Secondary] 88% of top US e-commerce sites are said to use hover-based mega-menus. This is a Baymard figure seen only through a vendor guide. It shows prevalence, not effectiveness. — [Lovable guide](https://lovable.dev/de/guides/website-menu-examples)
- [Benchmark] Up to 64% of leading US and European sites perform "mediocre" to "poor" on homepage and category navigation. — [Baymard 2026](https://baymard.com/research-articles/ecommerce-navigation-best-practice)
- [Benchmark, headline only] 33% of mobile sites do not make product categories the top-level navigation items. — [Baymard](https://baymard.com/blog/main-navigation-product-categories)
- [Benchmark] Mobile users are at a disadvantage because they lack hover-based overviews. — [Baymard 2026](https://baymard.com/research-articles/ecommerce-navigation-best-practice) (URL match approximate)
- [Benchmark, headline only] Native dropdowns should never be used for navigation on mobile. — [Baymard](https://baymard.com/research-articles/mobile-dropdown-navigation)

**Sticky headers**
- [Expert] Keep the header as short as readable text and usable tap targets allow, roughly 1 cm targets and 16 pt text on touchscreens. It should be opaque and distinct from the content behind it. — [NN/g, Sticky Headers: 5 Ways](https://www.nngroup.com/articles/sticky-headers/)
- [Expert] For partially persistent headers, use a slide-in of about 300-400 ms triggered by a small upward scroll. — [NN/g, Sticky Headers](https://www.nngroup.com/articles/sticky-headers/)
- [Expert] A sticky department bar or header helps users reorient and move between major categories without scrolling back up. — [Baymard, Category Pages](https://baymard.com/blog/ecommerce-category-page)
- [Expert] Place fixed elements only on screen axes with room to spare, and use height-based media queries for top-fixed toolbars. — [Baymard, Responsive Upscaling](https://baymard.com/blog/responsive-upscaling)
- [Benchmark] Sticky chat elements on mobile often block critical content. — [Baymard, 35 Best Practices](https://baymard.com/blog/ecommerce-ux-best-practices)

### Inferences
- The store has two routes to the same content: an "All Categories" mega-menu and a category bar. The evidence favours one visible row of the main categories. It should show as many as fit, then a labelled "More" dropdown, and it should never scroll sideways. Measure the available width and move items into "More" rather than clipping them.
- With 377 products, a shallow set of top-level categories, each opening a simple grouped panel (for example by type, material or size range), is likely enough. A catalog this size should not need deep menu trees. This is my judgement, not a tested finding.
- If the sticky header is the full two-row design, it uses a lot of vertical space. Collapse it on scroll to one row: logo, search, cart. On mobile, the Chat control should not float over the sticky add-to-cart or filter button.

### Gaps
- I found no controlled study (lab or A/B) directly comparing a mega-menu with a horizontal category bar.
- I found no study testing "More"/priority-plus overflow against wrapping or scroll. NN/g has no article using that term in the results.
- I found no measured conversion effect from sticky headers. Baymard has no dedicated sticky-header guideline in the results. Frequently repeated A/B claims on this topic could not be traced to a primary source and are left out.
- I found no research on the header placement of Chat or wishlist, or on showing the cart total versus an item count.

## What search patterns (autocomplete, synonyms, handling of sizes and units, no-results pages) work best for spec-driven products?

### Takeaway
Size and unit handling is the most relevant documented weakness: more than half of benchmarked sites have trouble with abbreviations and symbols. A small catalog can fix this with a mapping table of units, symbols and synonyms, plus curated autocomplete and a no-results page that always offers a way forward.

### Cited Findings
**Benchmarks**
- [Benchmark] 2026 Search UX benchmark (170+ sites and apps, 10,000+ usability scores): 56% of sites are mediocre or worse overall, made up of 46% of desktop sites, 58% of mobile sites and 64% of apps. — [Baymard, Ecommerce Search UX 2026](https://baymard.com/blog/ecommerce-search-query-types)
- [Benchmark] A third of tested sites are mediocre or worse on exact searches such as model names or numbers, even though these are the easiest to support technically. — [Baymard 2026](https://baymard.com/blog/ecommerce-search-query-types)
- [Benchmark] 66% of sites have issues with non-product searches such as "return policy". — [Baymard 2026](https://baymard.com/blog/ecommerce-search-query-types)

**Sizes, units and symbols**
- [Benchmark] 54% of sites have issues with abbreviation and symbol searches, such as "13in laptop sleeve". Users may assume a product is not stocked if these fail. — [Baymard 2026](https://baymard.com/blog/ecommerce-search-query-types)
- [Benchmark] [Older benchmark, undated] 60% of sites returned different results depending on whether a symbol, text or abbreviation was used, tested with "inch" versus the " symbol. — [Baymard, guideline #344](https://baymard.com/guidelines/344-search-queries-that-include-abbreviations-and-symbols)
- [Benchmark] Abbreviations are described as the easiest type to support technically, because they mainly need term mapping, such as "mm" with millimeters. Symbols are harder: "-" can mean a minus sign or a range. — [Baymard, guideline #344](https://baymard.com/guidelines/344-search-queries-that-include-abbreviations-and-symbols)

**Autocomplete**
- [Benchmark] Only 19% of sites get every autocomplete pattern right. 69% do not handle misspellings well in suggestions. — [Baymard, misspellings in autocomplete](https://baymard.com/blog/offer-autocomplete-suggestions-for-misspellings) (URL match approximate for the 19%)
- [Benchmark, headline] 58% of sites do not copy the active suggestion into the search field, which blocks users from refining it. — [Baymard](https://baymard.com/blog/copy-search-suggestion-to-search-field)
- [Expert] Suggestions should lead only to queries with good results; those returning zero or irrelevant results are worse than unhelpful. Curate suggestions rather than exposing raw query logs. On smaller devices, offer simple text suggestions. — [NN/g, Site Search Suggestions](https://www.nngroup.com/articles/site-search-suggestions/)

**No-results and scope**
- [Lab: eye-tracking] [Older: about 2014-2017] Users often skipped the no-results message because it was small and lightweight. Make the state unmistakable, restate the query in an editable box, offer spelling corrections, and auto-retrieve results for a corrected spelling while saying so. — [NN/g, "No Results" pages](https://www.nngroup.com/articles/search-no-results-serp/)
- [Expert] [Older] Default to whole-site search, state any scope limit, offer one-click expansion, and consider whether results-page filters would do the job of an upfront scope selector. — [NN/g, Scoped Search](https://www.nngroup.com/articles/scoped-search/)

**Search-bar experiments**
- [Field, peer-reviewed] Trending keywords prepopulated in the search bar raised purchase incidence 10.4% and spending 8.8% versus an empty bar (72,587 consumers, major Asian platform). — [INFORMS release on the Marketing Science study](https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/New-Study-Finds-Prepopulated-Search-Bars-Can-Significantly-Boost-Online-Sales)
- [Field, working paper, not peer-reviewed] A refined-query suggestion tool on a large Chinese platform had no immediate effect on orders or spending, though it changed search behavior. — [NBER conference paper](https://conference.nber.org/conf_papers/f200588.pdf)

### Inferences
- Build a normalization layer before buying a search engine. Map `"`, `in`, `inch`, `inches`; `ml`, `milliliter`, `cc`; `l`, `ltr`, `litre`; `oz`, `ounce`; `g`, `gm`, `gram`; `mm`, `cm`. Treat `8x10`, `8 x 10`, `8*10` and `8 by 10` as one form, and convert between metric and imperial where listings use only one.
- Add trade synonyms from real search logs (for example, box/carton, pouch/bag, tub/container, kraft/brown paper). NN/g's search-log article is relevant here, but only its title was seen: [Search-Log Analysis](https://www.nngroup.com/articles/search-log-analysis/).
- Autocomplete should show real products with thumbnail, size and pack quantity, plus category links. With 377 products this is cheap to do well. On no-results pages, relax one size or attribute constraint and show the closest sizes, labelled as near matches.
- Support non-product queries such as "shipping", "custom printing" and "minimum order", which link to help content.
- The prepopulated-bar result comes from a very large marketplace and may not transfer to a 377-product store. Treat it as an idea to test.

### Gaps
- I found no study specifically measuring search handling of dimension formats such as "8x10", or of unit conversion, on conversion.
- I found no retrievable Baymard data on no-results pages or product-type synonyms. The common "search users convert 2x" statistic was not found in a credible primary source and is excluded.
- I found no packaging-specific search research.

## Which filters and sort options matter for products defined by size, capacity, material and pack quantity?

### Takeaway
Category-specific filters are the priority, and each category should filter on the attributes shown in its product lists. For packaging, pack-based pricing means price per unit is a key piece of information, and most sites omit it.

### Cited Findings
- [Benchmark] [Older, undated] 60% of sites have an inadequate number of filter types. They lack category-specific filters (42%), thematic filters (20%) or compatibility filters. — [Baymard, state of filters](https://baymard.com/research-articles/external-article-state-of-ecommerce-filters) (URL match approximate)
- [Benchmark] [Older] 84% of sites had a mediocre or poor filtering experience, with missing key filters a main cause. — [Baymard, state of filters](https://baymard.com/research-articles/external-article-state-of-ecommerce-filters) (URL match approximate)
- [Secondary] 78% of mobile sites offer poor to mediocre filtering, versus 58% of desktop sites. Attributed to Baymard's 2025 benchmark, but not confirmed on Baymard's own page. — [WisePIM](https://wisepim.com/blog/ecommerce-product-filters-ux-best-practices)
- [Benchmark] Without attribute filters, shoppers must sift through too many irrelevant products. At Etsy's Rugs category, size was the crucial filter that was missing. — [Baymard, filters](https://baymard.com/blog/have-filters-for-list-item-info) (URL match approximate)
- [Benchmark, headline] 38% of sites do not have filters for all information displayed in list items. Displayed attributes are described as so foundational that they must be filters. — [Baymard](https://baymard.com/research-articles/have-filters-for-list-item-info)
- [Benchmark] 86% of sites fail to provide price per unit, which causes users to abandon suitable items. Show it beside the total package price in list items. When pack sizes differ widely, finding the best value matters even more (2023 article). — [Baymard, Price per unit](https://baymard.com/blog/price-per-unit)
- [Expert] Use multi-select checkboxes, show result counts per refinement, and make sure sorting and filtering values are relevant. This comes from an intranet search article, so it is indirect. — [NN/g, Intranet-Search Essentials](https://www.nngroup.com/articles/intranet-search/)
- [Lab, peer-reviewed] Restricting available filters made 1,200 participants (searching wireless headphones) explore more broadly, weigh attributes more evenly, and choose more diverse, higher-priced products. Interface design can shape preferences. Conversion was not the measure. — [Marketing Science, 2025.0261](https://pubsonline.informs.org/doi/10.1287/mksc.2025.0261)
- [Preprint, not confirmed peer-reviewed] Recommending filters is reported to have produced incremental booking conversion in A/B tests at Airbnb. No magnitude was seen, and this is a very different domain. — [arXiv 2602.23717](https://arxiv.org/html/2602.23717v1)
- [Workshop paper] Filter ranking produced a statistically significant improvement in filter interactions in an A/B test on a large e-commerce platform. It measured engagement, not purchases. — [CEUR-WS Vol-3589](https://ceur-ws.org/Vol-3589/paper_16.pdf)

### Inferences
- Suggested filters, based on the evidence above and adapted to packaging. Use only those that actually split a given category:
  - Dimensions or size range, in real buckets or range inputs (L x W x H)
  - Capacity (ml, L, oz)
  - Material (kraft, PET, HDPE, corrugated, foil and so on)
  - Pack quantity
  - Closure or feature (lid, zip, window), food-safe or compostable, color
  - Price and availability
- Suggested sorts: relevance, **price per unit** (low to high), pack price, capacity or size (small to large), newest. Size and capacity sorts are especially useful for this catalog. Baymard has an article on category-specific sorting, but its content was not retrieved: [Baymard](https://baymard.com/blog/category-specific-sorting).
- Many categories will have fewer than 50 products. Hide filters where every product shares one value or a filter would return nothing, and keep the list short. The Marketing Science result is a reason not to assume more filters is always better.

### Gaps
- I found no peer-reviewed field experiment isolating filter design and measuring conversion on a live store.
- I found no filter or sort research specific to packaging. The attribute list is my inference.
- Evidence on the ideal number of filters for small catalogs was not found.

## How should product listing and product detail pages present specifications, and what are the main mobile considerations?

### Takeaway
Show the decision-critical specs and pack information directly in list items, including unit price, and avoid making buyers open each product. On product pages, use a clear spec table with units and plain labels. On mobile, filters need their own layer with a sticky apply control, and chat must not block content.

### Cited Findings
**Listing pages**
- [Benchmark] Five essential list item attributes are price, product title or type, thumbnail, rating average with count, and product variations. Users tend to skip products lacking them. Keep titles within about 3-4 lines on mobile. — [Baymard, Product Listing UX](https://baymard.com/blog/product-listing-information) (headline says 50% get it wrong)
- [Benchmark] For spec-driven products, add category-specific attributes such as technical specs, dimensions or capacities. — [Baymard, Product Listing UX](https://baymard.com/blog/product-listing-information)
- [Benchmark] Contextual list items add the attribute the user has filtered or sorted by. This helps most with multi-value and scale attributes. — [Baymard, Contextual List Item Information](https://baymard.com/research-articles/contextual-list-item-information)
- [Benchmark, headline] Always include contents and quantities in the list item for sets and bundles. — [Baymard](https://baymard.com/blog/include-contents-quantities-list-item-sets-bundles)
- [Benchmark, headline] In B2B electronics, use product tables for desktop listings. Baymard's B2B components study says tables suit buyers comparing many precise specifications. — [Baymard, product tables](https://baymard.com/blog/use-product-tables-for-desktop-product-listings); [Baymard, B2B Components & Machinery](https://baymard.com/industries/b2b-electronic-components-machinery-ux)
- [Benchmark, headline] Avoid quick views for spec-driven product types; 21% of sites use them. — [Baymard](https://baymard.com/blog/ecommerce-quick-views)
- [Secondary] [Older] Sites with mediocre list usability saw abandonment of 67-90%. Restated from Baymard testing; the original context was not seen. — [WisePIM](https://wisepim.com/blog/ecommerce-product-filters-ux-best-practices) (URL match approximate)

**Product detail pages**
- [Expert/Benchmark] Always append units of measure to numeric values. Testing regularly finds problems with jargon and unclear labels in specs. — [Baymard, Product Spec Sheet](https://baymard.com/blog/product-spec-sheet-ux-design)
- [Benchmark] Mobile product pages often have highly severe usability issues, and the small screen makes it hard for users to get an overview of what content is available. — [Baymard, mobile product page benchmark](https://baymard.com/mcommerce-usability/benchmark/mobile-page-types/product-page)

**Mobile filtering**
- [Expert/Benchmark] Filters should use their own layer (full screen or bottom sheet), opened by a clearly labelled button that stays visible while scrolling. — [Baymard, Filter UI](https://baymard.com/blog/ecommerce-filter-ui)
- [Benchmark] Provide sticky "Apply" buttons, because auto-submitted filters slow users choosing several options. A "Show X Results" button with a live count is suggested. Guideline #1125. — [Baymard, Filter UI](https://baymard.com/blog/ecommerce-filter-ui); [Baymard, Button Design](https://baymard.com/blog/button-design)
- [Benchmark] Promote the most important filters on mobile. Macy's app is the example given. — [Baymard, Filter UI](https://baymard.com/blog/ecommerce-filter-ui) (URL match approximate)

**Performance (affects all of the above)**
- [Standard] "Good" Core Web Vitals are LCP at or below 2.5 s, INP at or below 200 ms, and CLS at or below 0.1, at the 75th percentile of real-user visits. — [web.dev, Web Vitals](https://web.dev/articles/vitals) (figures seen via secondary results)
- [Case study, A/B] Rakuten 24 ran a month-long 50/50 test on one landing page: revenue per visitor +53.37%, conversion +33.13%, average order value +15.20%. [Older: about 2021-22] A single-page test with a very large result; treat as an upper-end anecdote. — [web.dev, Rakuten 24](https://web.dev/case-studies/rakuten)
- [Case study, A/B] Vodafone's landing page with 31% better LCP got 8% more sales. [Older: about 2021] — [web.dev, Vodafone](https://web.dev/case-studies/vodafone)
- [Case study] Nuvemshop's LCP pass rate rose from 57% to 96% and its overall Core Web Vitals pass rate from 48% to 72%. Conversion on mobile Google organic traffic rose 8.9% (January 2025 to January 2026). This appears to be a period comparison, not a randomized test, which I could not confirm. The cause was how dynamic layouts affected LCP element selection, not image weight or server latency as first assumed. — [web.dev, Nuvemshop](https://web.dev/case-studies/nuvemshop)
- [Secondary] Farfetch: conversion is said to fall 1.3% for each additional 100 ms of LCP. Not confirmed on web.dev. — [web.dev, Farfetch](https://web.dev/case-studies/farfetch) (figure seen only in a secondary source)

### Inferences
- For list items, show size or capacity, material, pack quantity, pack price and price per unit, for example "500 ml, PET, pack of 50, $12.00 ($0.24 each)". Where a category is mostly compared on numbers, offer a desktop table view. It is worth testing against a grid.
- On product pages, make pack quantity and unit price visible beside the price, and pick the variant by size or pack with clear selectors. Put a complete spec table with units close to the top, and do not bury dimensions in description text. Clarify whether dimensions are internal or external, since this decides whether a product fits.
- The sticky elements (header, filter button, add to cart, chat) compete for mobile space. Decide on one priority per page. Avoid layout shifts when mega-menus, promotional bars or autocomplete load, since these affect CLS, and keep menu and filter interactions within the INP target.

### Gaps
- Baymard's detailed mobile guidance on spec sheets is paywalled and was not retrievable.
- NN/g's [Mobile Tables](https://www.nngroup.com/articles/mobile-tables/) and [Comparison Tables](https://www.nngroup.com/articles/comparison-tables/) articles appeared in results but their content was not seen. They are worth reading for spec-table design.
- I found no INP-specific conversion result, and no experiment on grid versus table listings for packaging.

## What are the biggest measured conversion or usability problems in this area?

### Takeaway
Measured prevalence is high for missing unit pricing, weak site search and poor filtering. Conversion effects, however, are documented mainly for page speed and one search-bar experiment. Most of the UX figures show how common a problem is, not how much revenue it costs.

### Cited Findings
**Prevalence of problems (from Baymard; ranked by how directly they apply to this store)**
- [Benchmark] 86% of sites do not provide price per unit. — [Baymard](https://baymard.com/blog/price-per-unit)
- [Benchmark] 54% have issues with abbreviation and symbol queries. — [Baymard 2026](https://baymard.com/blog/ecommerce-search-query-types)
- [Benchmark] 56% of sites are mediocre or worse on search, including 58% of mobile sites. — [Baymard 2026](https://baymard.com/blog/ecommerce-search-query-types)
- [Benchmark] [Older] 60% have too few filter types, with 42% lacking category-specific filters. — [Baymard](https://baymard.com/research-articles/external-article-state-of-ecommerce-filters) (URL match approximate)
- [Benchmark] 62% have no hover delay on dropdowns. — [Baymard 2026](https://baymard.com/research-articles/ecommerce-navigation-best-practice)
- [Benchmark] Up to 64% are mediocre to poor on homepage and category navigation. — [Baymard 2026](https://baymard.com/research-articles/ecommerce-navigation-best-practice)
- [Benchmark] Only 19% get all autocomplete patterns right. — [Baymard](https://baymard.com/blog/offer-autocomplete-suggestions-for-misspellings) (URL match approximate)

**Measured effects on behaviour or revenue**
- [Field, peer-reviewed] Prepopulated search bar: +10.4% purchase incidence, +8.8% spending. — [INFORMS](https://www.informs.org/News-Room/INFORMS-Releases/News-Releases/New-Study-Finds-Prepopulated-Search-Bars-Can-Significantly-Boost-Online-Sales)
- [Lab] [Older] Hidden desktop navigation was used about half as often as visible navigation (27% of cases). — [NN/g](https://www.nngroup.com/articles/hamburger-menus/)
- [Case study, A/B] Speed: Vodafone +8% sales; Rakuten 24 +33.13% conversion. [Older] — [Vodafone](https://web.dev/case-studies/vodafone); [Rakuten](https://web.dev/case-studies/rakuten)
- [Survey, Vendor] Only 33% of B2B buyers said they can reorder with a single click. The original survey methodology was not confirmed. — [Modern Distribution Management](https://www.mdm.com/article/technology/digital-commerce/what-the-latest-b2b-buyer-data-says-about-digital-distribution-in-2025/); [Oro report](https://oroinc.com/b2b-ecommerce/b2b-buyer-perspectives-report/)

**Claims reviewed and not relied on**
- [Vendor] Quick-order features are claimed to raise reorder frequency 30-40%. No source was visible, so it should not be cited. — [WisePIM, B2B features](https://wisepim.com/blog/b2b-ecommerce-features) (URL match approximate)

### Inferences
- Likely priority for this store, based on relevance and low cost rather than on measured lift:
  1. Add unit price and pack quantity to lists and product pages.
  2. Normalize size and unit search terms.
  3. Add category-specific filters.
  4. Replace the overflowing category bar with visible categories plus "More".
  5. Add a hover delay and compact the sticky header.
  6. Check Core Web Vitals field data.
- Because repeat purchasing is common for consumables like packaging, reorder features may matter. The evidence for this is weak and comes from vendor surveys.
- The store should run its own A/B tests or before/after analytics on search exits, zero-result queries and filter use, because no cited study reports the effect size for a catalog of this type and size.

### Gaps
- I found no conversion data for UX changes specific to packaging stores or to catalogs of a few hundred SKUs. Most evidence comes from large retailers, marketplaces or general benchmarks.
- Baymard's cost-of-problem or revenue-impact figures were not available, and its benchmarks should not be read as conversion estimates.
- All figures need verification against full source pages, since no page could be opened in this session.
