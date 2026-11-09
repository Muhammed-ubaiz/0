# B2B and Wholesale UX Patterns for a Hybrid Retail-Plus-Wholesale Packaging Store

**Evidence labels used below.** [INDEPENDENT] = usability or research firm with no platform to sell. [ANALYST] = consultancy or analyst survey (independent of commerce software, but sells advisory services). [VENDOR-RESEARCH] = survey commissioned or published by a company selling related software or payments. [VENDOR-OPINION] = vendor or agency blog with no data. [PLATFORM-DOCS] = platform documentation; reliable for what a feature does, not for whether it works. [RETAILER] = a retailer's own site or help content, showing what it does, not whether it performs.

**Verification levels.** "Read" means the page itself was opened. "Snippet" means only a search-result extract was seen, so check the figure before quoting it. WebstaurantStore (403), Gartner's newsroom (403) and McKinsey (timeout) could not be opened directly. Baymard's detailed B2B guidelines and NN/g's B2B report are paywalled.

**Date flags.** NN/g items are from 2006 and 2019, older than the 2022 preference, and are marked. Everything else is 2023 onward or undated documentation, and undated items are marked where it matters.

## What are the best patterns for tiered or volume pricing, case-pack quantities and minimum order quantities?

### Takeaway
Show the quantity-break ladder, pack size and minimum on the product and listing views, before the cart, and enforce pack multiples in the quantity control. Independent research supports the general need (price, MOQ and stock visible early), but I found no independent study comparing specific tier-table designs, so the detailed patterns are inferred from platform behaviour and retailer practice.

### Cited Findings
- [INDEPENDENT, 2024, read] Baymard's B2B electronic components and machinery study used 168+ moderated think-aloud sessions with industry professionals on 15 US and global sites, desktop only, and produced 275+ guidelines. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [INDEPENDENT, 2024, read] Baymard says product table entries should include price, including MOQ, as a key attribute. Price and availability are among the most-used sort options. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [INDEPENDENT, 2024, read] Product pages should provide pricing tables along with shipping and stock status. When key information was missing, participants often abandoned the product, and sometimes the site. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [INDEPENDENT, 2024, read] Surfacing quantity limits late caused failures: adding 200 units at STMicroelectronics triggered an error because stock limits were not visible before the cart. Users had to click Add to Cart at RS Components to find a restock date. Mouser's "View Dates" overlay, showing ship dates for quantities above stock, was found useful. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [INDEPENDENT, 2024, read] One participant preferred a part with 1,000 in stock over one with 30, even at nearly double the price, which is a single observation but shows stock depth can outweigh price for a volume buyer. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [PLATFORM-DOCS, read] Shopify B2B quantity rules cover increment (order in set multiples), minimum and maximum, and apply per variant: "Customers can't combine 5 gray hats and 5 blue hats" to meet a threshold. The theme should display the minimum on the product page. — [Shopify Help](https://help.shopify.com/en/manual/b2b/catalogs/quantity-pricing)
- [PLATFORM-DOCS, read] Shopify volume pricing allows up to 10 breaks per product, applied per variant. Break quantities must exceed the minimum and be multiples of the increment. Once volume pricing applies, the catalog's overall percentage adjustment does not apply. — [Shopify Help](https://help.shopify.com/en/manual/b2b/catalogs/quantity-pricing)
- [RETAILER, snippet] WebstaurantStore listings show quantity breakpoints such as "1 - 2 | 3 - 9 | 10+", "3 - 7 | Lots of 8" and "Lots of 4" with the price falling as quantity rises, often priced per case. — [WebstaurantStore listing](https://www.webstaurantstore.com/search/catering-petites.html); [WebstaurantStore listing](https://www.webstaurantstore.com/search/blue-glass.html)
- [RETAILER, snippet] WebstaurantStore listings show a Plus member price beside the regular price, for example $99.70/Case against $116.49. — [WebstaurantStore Plus discounts](https://www.webstaurantstore.com/feature/18358/webstaurantplus-member-discount/?page=16)
- [RETAILER, snippet] Uline offers quantity price breaks across its catalog, giving as an example a 30% saving for buying 1,000 rather than 25 of a model, and directs volumes above the largest tier to phone or an online quote form. — [Uline FAQ](https://www.uline.com/CustomerService/ULINE_FAQ_Ans?FAQ_id=305)

### Inferences
- Packaging has a unit-confusion risk that Baymard's electronics study does not address: a "pack of 50" lid, a case of 500 and a per-piece cost can all be valid prices. Show one primary purchase unit (case or pack), the count inside it, and the per-piece price, using the same labels on listings, product page, cart and invoice.
- Use a compact ladder on the product page, for example Qty, price per case, per piece, saving, and highlight the row that matches the current quantity as the buyer changes it. Put the "next tier" nudge beside the stepper ("Add 2 more cases to pay X per case").
- Make the stepper move in pack multiples, so an invalid quantity cannot be entered. If typed input is allowed, snap to the nearest valid multiple and say so, instead of raising a cart error, which is the failure Baymard observed in a related form.
- Shopify's per-variant rule matters for this catalogue: if size or print is modelled as a variant, a cafe buying a mix of 8 oz and 12 oz cups cannot pool them to reach a tier. Decide deliberately whether tiers are per SKU or mix-and-match per product family. Mix-and-match would need custom logic or an app, which I did not verify.
- Show stock and dispatch date against the requested quantity, not just "in stock". For a restaurant running low on containers, the date can decide the order.

### Gaps
- No independent study found on tier-table layout, per-unit versus per-case price display, or the conversion effect of MOQs. Baymard's quantity-break and pack-size findings, if any, are in its paid catalog. The public launch article does not cover them.
- Baymard's evidence is from electronic components and machinery, on desktop. Transfer to foodservice packaging and to phone use is an assumption.

## How should quick order, bulk add-to-cart, reorder, saved lists and request-for-quote flows work?

### Takeaway
Treat repeat purchasing as a separate fast path: order history and saved lists first, typed or CSV entry second, and quotes reserved for off-ladder cases. The three major platforms converge on the same feature set, while independent evidence directly supports shareable lists and fast paths for buyers who already know the item.

### Cited Findings
- [INDEPENDENT, 2024, read] Baymard describes two user groups: those who know the part number and want to check stock, price and checkout quickly, and those who need deeper specs and resources. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [INDEPENDENT, 2024, read] Arrow's cart had no way to share with a purchasing team, so one participant copied and pasted contents and then gave up. Participants also found no way to save a list and send it to colleagues. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [PLATFORM-DOCS, snippet] BigCommerce B2B Edition's Quick Order Pad accepts partial or complete SKUs, selection from previous orders, or a CSV upload. — [BigCommerce B2B Edition buyer functions](https://support.bigcommerce.com/articles/en_US/Knowledge/B2B-Edition-Buyer-Functions)
- [PLATFORM-DOCS, snippet] BigCommerce shopping lists can be shared, turned into quotes or added to cart, and can have a "Ready for approval" status. — [BigCommerce B2B Edition buyer functions](https://support.bigcommerce.com/articles/en_US/Knowledge/B2B-Edition-Buyer-Functions)
- [PLATFORM-DOCS, snippet] BigCommerce sales reps can masquerade as a company to access its shopping lists, add to cart and place the order, with some restrictions by role. — [BigCommerce sales rep functions](https://support.bigcommerce.com/articles/en_US/Knowledge/B2B-Edition-Sales-Representative-Functions)
- [PLATFORM-DOCS, read] Adobe Commerce B2B provides multiple requisition lists per customer, Quick Order by product name or SKU for logged-in customers, and negotiable quotes where buyer and seller adjust items, quantities and discounts with a communication history. — [Adobe Commerce B2B](https://experienceleague.adobe.com/en/docs/commerce-admin/b2b/introduction)
- [RETAILER, snippet] Uline offers a Quick Order option by model number, and order history for reorders in a signed-in account. — [Uline packaging](https://www.uline.com/s/packaging); [Uline account](https://www.uline.com/Ordering/EditAddress?EditFrom=MyUline)
- [RETAILER, snippet] Uline lets a buyer generate a written pricing request at checkout, including applicable taxes. — [Uline FAQ](https://www.uline.ca/CustomerService/ULINE_FAQ_Ans?FAQ_ID=305)
- [VENDOR-OPINION, snippet] Sana Commerce argues a repeat buyer needs a list, a quantity field and one button while a first-time buyer needs to browse and compare, so the flows should be separate. — [Sana Commerce](https://www.sana-commerce.com/blog/commercial-distance/)
- [VENDOR-OPINION, snippet] A glossary-style article describes quick order forms as suited to knowledgeable buyers and large repeat orders, usually alongside a standard cart. — [Racklify](https://racklify.com/encyclopedia/quick-order-form-vs-traditional-cart-when-b2b-buyers-prefer-it/)
- [VENDOR-OPINION, snippet, do not cite as fact] A blog claims a 30-40% rise in reorder frequency for distributors adding quick order. I found no primary source. — [BTNG Studio](https://btng-studio.pages.dev/articles/the-ultimate-guide-to-ux-design-for-b2b)

### Inferences
- Restaurant owners are unlikely to know SKUs the way Baymard's engineers know part numbers. Quick order should therefore lead with name search with thumbnails and "items you've bought before", with SKU and CSV as secondary inputs. Adobe's name-or-SKU behaviour is the better model than a SKU-only pad.
- Suggested reorder flow: a "Buy again" entry in the header for signed-in buyers, opening past items with last quantity pre-filled, current price, stock, one-click add, and a warning when price has changed or an item is discontinued with a substitute offered.
- Saved lists map well to how kitchens work ("Weekly – Outlet 2", "Catering events"). Make lists shareable, so a manager or owner can review without copy and paste. This is the gap Baymard saw.
- Bulk add should be a table view (image, name, pack, price, quantity stepper, single "Add all"), with partial failures reported per line, never an all-or-nothing error.
- Quote flow: an RFQ should be the exception. Trigger it above the top tier or for custom-printed packaging, and allow quoting from a cart or list so the buyer does not re-enter items. Give a promised response time, and let an accepted quote convert to an order. Uline's "above the largest tier" trigger and BigCommerce's list-to-quote path are the two useful precedents.
- A printable or downloadable quote from the cart, as Uline offers, is a low-cost feature that lets a small business get approval or compare suppliers without a sales conversation.

### Gaps
- No independent measurement found of the effect of quick order, reorder or lists on repeat rate or order value. The only figure found is unverified.
- I did not get direct evidence of how WebstaurantStore's reorder tools work, because its site refused automated access. A manual review is worthwhile.

## Should wholesale pricing be public or gated behind an account, and what is the evidence on each approach?

### Takeaway
There is no controlled evidence either way. I found no study comparing conversion, margin or leakage. Older NN/g guidance and the practice of large foodservice sellers favour showing prices, while the case for gating comes from vendors and applies mainly to negotiated contract prices. The best-supported compromise is a public quantity ladder with negotiated account pricing gated.

### Cited Findings
- [INDEPENDENT, 2019, OLDER THAN 2022, read] NN/g argues hiding prices adds a step, can make a product seem unaffordable, and "[m]akes the organization seem dubious". Its recommendation is "Show the price; and if the price is variable, offer common pricing scenarios." This is an expert synthesis without reported sample sizes. — [NN/g, 2019](https://www.nngroup.com/articles/b2b-trust-from-b2c/)
- [INDEPENDENT, 2006, OLDER THAN 2022, read] NN/g recommends sample prices for typical orders where exact pricing is hard to give, and found a simple table worked better than a calculator that was "much too complex and error prone". This rests on an unspecified B2B usability study and examples of a shipping service. — [NN/g, 2006](https://www.nngroup.com/articles/show-prices-for-common-scenarios/)
- [INDEPENDENT, undated topic page, snippet] NN/g states prospects want price as their top information need, yet B2B sites often hide or obscure it. — [NN/g B2B topic page](https://www.nngroup.com/topic/b2b-websites/)
- [ANALYST, 2025, snippet] Gartner reported that 73% of B2B buyers actively avoid suppliers who send irrelevant outreach. This is indirect, but relevant to forcing contact before showing a price. — [Gartner, June 2025](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience)
- [RETAILER, snippet] WebstaurantStore's quantity tiers appear on search-indexed listing pages, so its ladder is visible without an account login in those pages. Its subscription adds a further member price on top. — [WebstaurantStore listing](https://www.webstaurantstore.com/search/catering-petites.html); [WebstaurantStore Plus FAQ](https://catalog.webstaurantstore.com/article/272/webstaurant-plus-faq.html)
- [RETAILER, snippet] A Fisher Scientific listing notes that contract pricing may differ from web pricing, which is the "public list price plus account contract price" pattern. — [Fisher Scientific listing](https://www.fishersci.com/shop/products/12x12x6-shipping-box/NC0222529)
- [VENDOR-OPINION, snippet] WizCommerce argues open pricing can break MAP agreements and ease competitor scraping, and proposes login-gated pricing with per-catalog modes. — [WizCommerce](https://wizcommerce.com/blog/b2b-ecommerce-website/)
- [VENDOR-OPINION, snippet] An agency SEO analysis argues that hiding catalogs behind login loses organic traffic to competitors with public product pages, recommends public product pages with gated pricing, and says Google's spam policies prohibit showing crawlers different content from users. It cites no data for the claim that this is the typical setup. — [1Digital Agency](https://www.1digitalagency.com/blog/gated-vs-ungated-content-for-b2b-ecommerce-an-seo-analysis/)
- [VENDOR-OPINION, snippet] Another guide says most gated-price leaks come from misconfigured access rules rather than the login itself. — [Presta](https://wearepresta.com/shopify-b2b-wholesale-login-setup-the-complete-guide/)
- [PLATFORM-DOCS, snippet] Spree describes login-required as the strictest default for a wholesale portal, with a separate public channel for consumers. — [Spree docs](https://spreecommerce.org/docs/developer/storefront/nextjs/wholesale)

### Inferences
- Recommended model, in three levels:
  1. **Public:** retail price and the standard volume ladder on every product page, indexable and needing no login.
  2. **Registered business, instant or light approval:** extra benefits such as GST or tax handling, invoices, saved lists.
  3. **Approved account:** negotiated catalog prices and credit terms, gated.
- The argument for public ladders is strongest for a store like this: small restaurants and cloud kitchens are often price-comparing and may not register just to see a number, and comparable packaging is easy to price-check anyway. The scraping argument has little force against a price already designed to be public.
- MAP concerns apply if the store resells third-party brands under pricing agreements. Check that per supplier. It would not apply to own-brand or unbranded stock.
- If some customers have negotiated prices below the public ladder, keep them gated. If the ladder is public, a negotiated tier needs a clear added value (price, terms, or both) or there is little reason to apply.
- A test on a subset of products is the only way to get real evidence for this store.

### Gaps
- No controlled study, public dataset or case study found comparing public and gated wholesale pricing on conversion, margin or leakage. Vendor claims in both directions lack data.
- I could not confirm whether Uline's logged-out pages show the full tier table.
- Whether showing a low bulk price reduces retail-sized orders (cannibalisation) was not addressed by any source found.

## How do business buyers' needs differ from consumers' (invoices, tax documents, credit terms, multiple users)?

### Takeaway
Business buyers add organisational requirements: tax-compliant documents, exemption handling, terms, and more than one person involved in an order. Platforms treat these as core features. Survey support is mostly from payments vendors, so its direction is more trustworthy than its percentages.

### Cited Findings
- [INDEPENDENT, 2019, OLDER THAN 2022, read] NN/g notes "B2B consumers often have additional constraints compared to their B2C counterparts", such as switching costs and purchase complexity, while still bringing expectations formed on consumer sites. — [NN/g, 2019](https://www.nngroup.com/articles/b2b-trust-from-b2c/)
- [PLATFORM-DOCS, read] Shopify requires B2B customers to be set up as companies, and each company's pricing, currency, products, payment and shipping methods, and store content can be tailored. — [Shopify Help](https://help.shopify.com/en/manual/b2b)
- [PLATFORM-DOCS, read] Adobe Commerce B2B covers company accounts with divisions and users, admin-assigned roles controlling ordering, quoting, purchasing and credit access, parent and subsidiary hierarchies, purchase orders, approval rules based on role and order, and Pay on Account against a merchant-managed credit line. — [Adobe Commerce B2B](https://experienceleague.adobe.com/en/docs/commerce-admin/b2b/introduction)
- [PLATFORM-DOCS, snippet] BigCommerce's default roles include Company Administrator (manage users and addresses, approve lists, purchase), Senior Buyer and Junior Buyer (create lists and view company order history). Role names came from documentation that may be older. — [BigCommerce buyer functions](https://support.bigcommerce.com/articles/en_US/Knowledge/B2B-Edition-Buyer-Functions)
- [RETAILER, snippet] Uline requires an exemption certificate, accepts upload, email or fax, and typically updates accounts within one business day. IRS letters, W-9s and permits generally are not accepted, the name must match the account, and tax already charged can be adjusted before invoicing or otherwise via a credit request. — [Uline Tax Information](https://www.uline.com/MyAccount/TaxInformation); [Uline Tax FAQ](https://www.uline.com/CustomerService/ULINE_FAQ_Ans?FAQ_id=32)
- [RETAILER, snippet] WebstaurantPlus costs $99 a month for priority processing and free standard ground and common-carrier shipping on eligible items, with a $29 minimum order for free shipping. It requires a saved card and a contiguous-US address. — [WebstaurantPlus FAQ](https://catalog.webstaurantstore.com/article/272/webstaurant-plus-faq.html)
- [RETAILER, snippet] Orders placed through SAP Ariba receive "last column" pricing on Uline model numbers starting with S, showing that procurement channels can carry their own pricing logic. This applies to that punch-out arrangement, and is more relevant to institutions than small kitchens. — [University of Nebraska guide](https://nebraska.edu/offices/procure-to-pay/_files/docs/procurement-resources/sap-ariba-resources/uline-ordering-guide.pdf)
- [VENDOR-RESEARCH, TreviPay and Murphy Research, n=300, snippet, 2023 and later] 85% of buyers want the option to pay on net terms, and 68% now prefer suppliers offering invoice terms, up from 51% in 2023. TreviPay sells B2B payment services. — [TreviPay 2023 PDF](https://www.trevipay.com/wp-content/uploads/2023/10/The-Data-Is-InB2B-Buyers-Expect-a-Better-Payments-Experience.pdf); [TreviPay blog](https://www.trevipay.com/resource-center/blog/b2b-sales-strategy-where-buyers-say-sellers-are-falling-short/)
- [VENDOR-RESEARCH, Censuswide, hosted by TreviPay, EMEA, 2026 per URL, snippet] Buyers report pain from approval workflow delays (34%), limited ERP integration (31%), inconsistent invoice formats (31%) and incorrect invoices (30%). — [Censuswide summary](https://www.trevipay.com/wp-content/uploads/2026/03/Censuswide-Executive-Summary-EMEA-How-to-Win-and-Keep-B2B-Buyers.pdf)
- [VENDOR-RESEARCH, Balance, undated, snippet] 60% of buyers named slow or lengthy terms approval as the main reason they would switch ecommerce brands, and online credit applications are described as commonly a long PDF with a wait of days or weeks. Balance sells B2B payment and terms products. — [Balance](https://www.getbalance.com/post/know-your-b2b-customers-26-ecommerce-payment-stats-to-help-you-grow-your-digital-channel/)

### Inferences
- Priority for small food businesses is probably: compliant tax invoice at checkout and in order history first, business details saved on the account second, reorder and lists third, multi-user fourth, credit terms last and by approval. The cited payment surveys sample larger or unspecified firms and should not be assumed to describe a single-site cafe.
- Capture business identity at the moment it pays off, such as an optional "Buying for a business?" step at checkout that captures the business name and tax number and issues the right invoice, instead of a registration wall.
- Multi-user need is likely small at first: an owner plus a manager per outlet, and a cloud-kitchen group with several delivery addresses. Plan for one company with multiple locations and two roles (orders, admin), and add approval rules only if multi-site customers ask.
- Credit terms carry collection risk. Offer them only after approval and order history, and make the application a short form with a stated decision time, since the slow-approval complaint is the common thread.
- Keep order history, invoices and statements in one place, downloadable, because accounts staff often need them without placing orders.

### Gaps
- Target market was not specified. All tax evidence here is US-centred. If the store sells in India or elsewhere, requirements such as GST invoices and GSTIN capture need separate research, and none of the sources above cover them.
- Shopify payment terms, tax-exemption handling and the feature-by-plan breakdown were not confirmed. The pages opened say only that B2B is available on Basic, Grow, Advanced and Plus, and not Starter or Retail. — [Shopify Help](https://help.shopify.com/en/manual/b2b)
- No foodservice-specific data found on what share of small operators use credit terms or need multiple users.

## What do B2B buyer surveys and usability studies show about what drives or blocks online purchase?

### Takeaway
Buyers increasingly prefer to buy without a rep and will place large orders online, while data accuracy, missing product information and checkout or terms friction are the commonly reported blockers. Preference data is stated intent from enterprise-weighted samples, so it indicates direction for small foodservice buyers rather than proving their behaviour.

### Cited Findings
- [ANALYST, Gartner, n=646, fielded Aug-Sep 2025, snippet of Gartner release] 67% of B2B buyers prefer a rep-free experience. — [Gartner, March 2026](https://www.gartner.com/en/newsroom/press-releases/2026-03-09-gartner-sales-survey-finds-67-percent-of-b2b-buyers-prefer-a-rep-free-experience)
- [ANALYST, Gartner, n=632, fielded Aug-Sep 2024, snippet of Gartner release] The prior year's figure was 61%. — [Gartner, June 2025](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience)
- [ANALYST, Gartner, secondary report, snippet] 45% of respondents reported using AI during a recent purchase. — [Demand Gen Report](https://demandgenreport.com/industry-news/news-brief/gartner-67-of-b2b-buyers-prefer-a-rep-free-experience/52142)
- [ANALYST, Gartner, snippet] Buyers favour self-service for general information but seek seller input for contextual questions such as fit for their company, and 69% reported inconsistencies between a seller's website and what its sellers told them. — [Gartner, June 2025](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-sales-survey-finds-61-percent-of-b2b-buyers-prefer-a-rep-free-buying-experience)
- [ANALYST, McKinsey B2B Pulse 2024, n=3,942 decision makers in US and 12 other countries, read via Digital Commerce 360] 73% would spend over $50,000 per order through self-service or remote channels (59% two years earlier), and 39% would spend over $500,000 (28% earlier). — [Digital Commerce 360, Sept 2024](https://www.digitalcommerce360.com/2024/09/12/more-b2b-buyers-are-willing-to-spend-big-bucks-per-online-order/)
- [ANALYST, McKinsey via Digital Commerce 360, read] In-person sales accounted for 17% of revenue, down from 22%, and ecommerce is the top revenue channel among firms offering it. 71% of respondents sell through at least one form of B2B ecommerce, while a McKinsey partner separately said 75% of B2B companies offer ecommerce, so these figures differ. — [Digital Commerce 360, Sept 2024](https://www.digitalcommerce360.com/2024/09/12/more-b2b-buyers-are-willing-to-spend-big-bucks-per-online-order/)
- [INDEPENDENT, 2024, read] Missing datasheets led participants to leave one site for another distributor. Lifecycle status, inventory and lead time were rated primary factors in judging suitability. — [Baymard, May 2024](https://baymard.com/blog/b2b-electronic-components-machinery-launch)
- [VENDOR-RESEARCH, Sapio for Sana Commerce, 2024, snippet] 77% of manufacturing buyers are hesitant to buy online because of too many order errors. — [Industrial Distribution](https://www.inddist.com/e-commerce/news/22911929/b2b-web-store-woes-drive-manufacturing-buyers-elsewhere-survey-finds)
- [VENDOR-RESEARCH, Sana Commerce 2025 B2B Buyer Report, snippet, page attribution not confirmed] 73% of buyers prefer buying online, while 81% face significant barriers from outdated systems and inaccurate data. — [Food Logistics](https://www.foodlogistics.com/home/news/22931989/sana-commerce-realtime-data-is-the-secret-for-winning-over-frustrated-b2b-buyers-survey)
- [VENDOR-RESEARCH, Balance, undated, snippet] 73% of respondents said they would likely abandon a purchase after friction at checkout. — [Balance](https://www.getbalance.com/post/know-your-b2b-customers-26-ecommerce-payment-stats-to-help-you-grow-your-digital-channel/)

### Inferences
- Common blockers across independent and vendor sources: wrong or missing data (stock, specs, price), friction at checkout or terms, and no way to involve a colleague. For packaging, the matching "datasheet" is the spec set: dimensions, capacity in ml, material, grease or heat resistance, microwave and freezer suitability, lid compatibility, and food-contact information.
- McKinsey's dollar thresholds come from large enterprises and tell us little about a cafe ordering a few cases. The transferable point is confidence in buying online without a rep, not order size.
- Gartner's nuance suggests keeping a lightweight human route (WhatsApp, phone, or chat) for fit questions such as "which container for hot curry?", rather than removing people altogether.
- Sample orders may be a meaningful purchase driver for packaging, given that fit and quality are hard to judge online, but I have no source for this. Treat it as a hypothesis.

### Gaps
- I found no survey or usability study focused on restaurant, cafe, caterer or cloud-kitchen packaging buyers. All findings are extrapolated from other B2B sectors.
- Two widely repeated figures could not be traced to a primary page, so they are left out of the findings: a 10.2-channel average and "56% would switch or abandon after poor omnichannel experience", both attributed to McKinsey in secondary summaries.
- A survey of 1,006 B2B buyers reporting technical checkout problems as the top abandonment cause (31%) appeared in search results without a page I could confirm.
- One blog claims rep-free journeys cause more purchase regret, citing Gartner. This was not confirmed.
- McKinsey and Gartner primary pages could not be opened. McKinsey numbers come through Digital Commerce 360, and Gartner's through search extracts of its press releases.

## How should wholesale and retail be combined on one storefront?

### Takeaway
Use one catalog and one storefront, with the experience changed by account state and quantity rather than by separate sites. Platform support for this is established, but I found no independent evidence that blended stores outperform separate ones. Design should keep retail simple by default and reveal business tools progressively.

### Cited Findings
- [PLATFORM-DOCS, read] Shopify supports a single store for both B2B and direct-to-consumer sales, or a separate B2B-only store. B2B customers must be set up as companies, and available B2B features depend on plan. — [Shopify Help](https://help.shopify.com/en/manual/b2b/blended-stores)
- [PLATFORM-DOCS, read] Shopify B2B is available on Basic, Grow, Advanced and Plus, and not on Starter or Retail. — [Shopify Help](https://help.shopify.com/en/manual/b2b)
- [PLATFORM-DOCS, read] Adobe Commerce shared catalogs set custom per-product pricing for different companies across one or more websites. — [Adobe Commerce B2B](https://experienceleague.adobe.com/en/docs/commerce-admin/b2b/introduction)
- [VENDOR-OPINION, snippet] WooCommerce and Shopify tooling commonly supports public retail pricing alongside approved wholesale pricing. — [Barn2](https://barn2.com/wholesale-product-table/); [Presta](https://wearepresta.com/shopify-b2b-wholesale-login-setup-the-complete-guide/)
- [VENDOR-OPINION, snippet] Separately, a wholesale-only catalog is often hidden from search engines because shoppers who find products they cannot buy experience friction. — [1Digital Agency](https://www.1digitalagency.com/blog/b2b-edition-customer-groups-plus-price-list-seo/)
- [RETAILER, snippet] WebstaurantStore serves both small and professional buyers on one public site, with quantity tiers open to all and a paid membership layered on top. — [WebstaurantStore listing](https://www.webstaurantstore.com/search/catering-petites.html); [WebstaurantPlus FAQ](https://catalog.webstaurantstore.com/article/272/webstaurant-plus-faq.html)
- [INDEPENDENT, 2019, OLDER THAN 2022, read] Business users shop on consumer sites too and "form their expectations from the majority of sites they visit", so B2B tools should not depart from familiar ecommerce conventions. — [NN/g, 2019](https://www.nngroup.com/articles/b2b-trust-from-b2c/)

### Inferences
Suggested structure, based on the evidence above and my judgement:

| Element | Guest or retail shopper | Registered business | Approved wholesale account |
|---|---|---|---|
| Price shown | Pack price plus public ladder | Same, with tax treatment | Account price, ladder as negotiated |
| Quantity control | Small packs, stepper | Case multiples prominent | Case multiples, MOQ if any |
| Navigation | Browse by use (cups, boxes, bags) | Adds Buy Again, Lists | Adds Quick Order, Quotes, Invoices |
| Checkout | Card or wallet, guest allowed | Business details, tax invoice | Adds terms or PO if approved |
| Help | Standard | Bulk enquiry | Named contact |

- Keep one product page per item, with pack options as purchase choices (for example pack of 50, case of 500) so retail and trade traffic strengthens one URL. A separate wholesale catalog would duplicate content and split search traffic. This is consistent with the SEO argument, which is vendor-sourced.
- Offer a low-friction route to trade status: a visible "For business" link, a short application, and instant access to low-risk benefits. Keep manual review only for pricing and credit.
- Use wholesale-only products sparingly and hide them from guests to avoid dead ends, as the 1Digital article suggests.
- Do not show wholesale tools (quick order pads, CSV upload) to casual shoppers. They add clutter for retail users and mean nothing to them. A small "Buying in bulk?" prompt is sufficient.
- If the store is on Shopify, the blended model is available natively, subject to plan checks, but confirm which plan includes quantity rules, volume pricing and payment terms before committing to these designs.

### Gaps
- No independent study or verified case study found comparing a single blended storefront with separate retail and wholesale sites. I did not find usable Shopify, BigCommerce or Adobe customer case studies with measured results in this research pass, so that part of the brief is unmet.
- Mobile evidence is missing. Baymard's cited study was desktop only, while kitchen staff may reorder by phone, so the phone experience should be tested with real buyers.
- Foodservice examples are thin: WebstaurantStore could be seen only through search extracts, and Uline is general packaging rather than foodservice-specific. A manual review of WebstaurantStore, Uline's foodservice range and any local competitors would strengthen this.
