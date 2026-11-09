# Packaging and foodservice-disposables storefront teardown (UAE/GCC and global benchmarks)

> **Evidence status (research date 2026-11-09). Read this first.**
> Findings carry one of three tags:
> - **[LIVE]** the page was fetched on 2026-11-09 through a text-extraction tool. It shows page text only, with no visual layout, and long pages were truncated. Labels are as reported by that tool, so treat "verbatim" labels as near-verbatim. Column counts, sticky behaviour, colours and mobile layout could NOT be observed for any site.
> - **[INDEX]** the content comes from a search-engine extract of the page, which was not opened. Age varies and is often old (the tool flagged some WebstaurantStore and Uline pages as roughly 400 to 3,500 days old). Treat these as older material, not confirmed 2026 state.
> - **[3P]** third-party commentary, usually agency listicles and therefore opinion.
>
> **Access log**
> | Site | Result |
> |---|---|
> | hotpackwebstore.com (UAE) | Homepage, aluminium collection, wholesale collection and one product page read [LIVE]. An earlier product URL returned 429 |
> | hotpack.bh (Bahrain) | Homepage read [LIVE], about 92% of the text. Collection page returned 429 |
> | superiorpackuae.com, caterpack.co, multipackinternational.com | One page each read [LIVE] |
> | restaurantware.com | Homepage read [LIVE], truncated. Collection pages returned 429, so no listing or product page was seen |
> | falconpackonline.com (Falcon Pack UAE store) | **Fetch returned only the title "Falcon Pack"** (three URLs tried; the page content did not come through). Evidence is [INDEX] only |
> | falconpack.com, hotpackglobal.com | **Could not be accessed** (fetch tool could not verify the domain) |
> | webstaurantstore.com | **Could not be read.** Domain check failed, then a product page returned 403. Evidence is [INDEX] and [3P] only |
> | uline.com | **Could not be read** (fetch tool could not verify the domain). Evidence is [INDEX] and [3P] only |
> | web.archive.org | **Unavailable** to the fetch tool, so no archive snapshots were used |
> | shop.cosmoplast.com, emaratshop.com | 429 on fetch. Evidence is [INDEX] only |
>
> Headers, homepages and carts of Uline, WebstaurantStore and Falcon Pack were not observed in this research. Nothing below describes them unless it is explicitly sourced. No forms were submitted, no accounts created and nothing was added to a cart.

## How do these sites structure the header, category navigation, search, and cart?

### Takeaway
The observed UAE/GCC stores use a stacked header: promo or free-delivery strip, contact details, logo plus search, utility links, cart. Beneath it sit a merchandising nav and a separate material-led category menu. Hotpack is the only store where "Wholesale" and "Shop Retail" were observed as side-by-side top-level links. The quote-led regional suppliers replace the cart with an enquiry list or WhatsApp.

### Cited Findings

#### Hotpack Webstore, UAE
- [LIVE] The top strip carries phone, email and a repeating "FREE Delivery!" / "On ALL ORDERS" message. Below it are logo, hours ("Available from 8:00AM to 3:00PM Mon - Sat") and a "Search the store" box — [Hotpack Webstore homepage](https://www.hotpackwebstore.com/)
- [LIVE] Utility links are "Corporate Website", "Rewards", "Wish Lists", "Sign In", "Cart", plus an EN/AR toggle — [Hotpack Webstore homepage](https://www.hotpackwebstore.com/)
- [LIVE] Main nav is "Home", "Deals", "Wholesale", "Shop Retail", "E-Catalogue", "Customization", "Locate Us", "Feedback and Inquiry", "About Us". The Feedback menu holds "Return Request Form", "TRN Invoice Request" and "FAQs", among others — [Hotpack Webstore homepage](https://www.hotpackwebstore.com/)
- [LIVE] The separate category mega-menu has 17 entries, mostly material or product-family: Paper Products, Tissue Products, Plastic Products, Hygiene & Protection, Baking & Decoration, New Arrivals, Bio-Degradable products, Aluminium Products, Wooden Products, Dispensers, Combo Packs, Dessert & Pudding, Eco Store, Labels & Stickers, Gift Boxes, Glass Products, Miscellaneous Products — [Hotpack Webstore homepage](https://www.hotpackwebstore.com/)

#### Hotpack Bahrain
- [LIVE] Same promo strip pattern, plus social links and EN/AR. Nav is "Home", "Categories", "Deals", "Shop Retail", "NEW IN", "Pages", "Quick Links". Account area has "LOGIN", "Register Now", "Wishlist" and a cart icon — [Hotpack Bahrain](https://hotpack.bh/)
- [LIVE] 14 top-level categories, more task-led than the UAE store: Paper Cups & Essentials, Paper Takeaway Boxes, Tissue Products, Plastic Products, Hygiene and Protection, Takeaway Containers, Baking and Decoration Range, Aluminium Products, Wooden Products, Biodegradable Products, Cutleries and Essentials, Paper Bags, Other Paper Products, Garbage Bag — [Hotpack Bahrain](https://hotpack.bh/)

#### Falcon Pack Online, UAE ([INDEX] only)
- [INDEX] The store has a "shop by usage" category path, for example bags and restaurant, alongside a cart page — [Bags](https://falconpackonline.com/en/category/shop-by-usage/bags), [Restaurant](https://falconpackonline.com/en/category/shop-by-usage/restaurant), [Cart](https://falconpackonline.com/en/cart/)
- Header and navigation could not be observed (see access log).

#### Multipack International, UAE
- [LIVE] Promo strip offers "Receive AED 10 Coupon for first shopping." Utility bar has "Store Locator", "Track Your Order", "Multipack Shop", "My Account" — [Multipack aluminium containers](https://multipackinternational.com/product-category/aluminium-products/containers/)
- [LIVE] Main menu is "Home", "About", "Contact Us", "Todays Offer", "Top 10 Offers", "New Arrivals", then product-category menus. Sales phone and email sit by the "Search for:" field, with icons for account, wishlist, compare and a cart showing a running AED total ("0 د.إ0.00") — [Multipack aluminium containers](https://multipackinternational.com/product-category/aluminium-products/containers/)
- [LIVE] Footer groups include a "We Serve" list; a breadcrumb and an expandable category sidebar are present — [Multipack aluminium containers](https://multipackinternational.com/product-category/aluminium-products/containers/)

#### Superior Pack UAE (quote-led)
- [LIVE] Top bar has phone, email, "Made with ❤️ in UAE" and socials. The header has an **enquiry cart** icon, the menu Home/About/Blogs/Products/Contact/FAQ's, secondary links "Shop Online", "E-Brochure", "Instant Quote", "Login", and a WhatsApp icon — [Superior Pack kraft category](https://superiorpackuae.com/products/category/kraft-box-and-containers)
- [LIVE] A vertical "Categories" sidebar is organised by product form (Bags, Cups, Lid & Cup Holder, Boxes & Meal Boxes, Bowl & Bucket) — [Superior Pack kraft category](https://superiorpackuae.com/products/category/kraft-box-and-containers)

#### Cater Pack, Dubai (brochure site)
- [LIVE] Header is logo, "Home", "About Us", "Our Products", "Careers", "Contact Us" and a "Get a Quote" button that opens WhatsApp. There is no cart or checkout — [Cater Pack](https://caterpack.co/)

#### Restaurantware, US
- [LIVE] Phone number, "Sign up for FREE Shipping!" (RW Max), "Log in", "Create Account", "Cart". The search bar states catalogue scale: "SEARCH 20,000+ PRODUCTS" — [Restaurantware](https://www.restaurantware.com/)
- [LIVE] Nav is Disposables, Smallwares, Food & Beverage, Tabletop, Equipment, Storage / Transport, Janitorial, Industrial, Customizable Products, **Business Type**, with secondary REWARDS, CONTACT, ORDERS — [Restaurantware](https://www.restaurantware.com/)

#### Uline, US ([INDEX] and [3P])
- [3P] "A quick order form accepts Uline model numbers and quantities." (Elogic, entry last checked 2026-09-25) — [Elogic B2B examples](https://elogic.co/blog/b2b-ecommerce-website-examples/)
- [INDEX] Food service has its own industry hub as well as class and group pages, so one product family is reachable by industry or by catalogue tree — [Uline Food Service](https://www.uline.com/industry/FoodandBeverage), [Food Service and Packaging](https://www.uline.com/Cls_35/Food-Service-and-Packaging), [Take-Out Containers](https://www.uline.com/Grp_413/Take-Out-Containers)

#### WebstaurantStore, US ([INDEX] only)
- [INDEX] Category names are shopper-language and specific, e.g. clear hinged take-out containers, sushi containers, paper take-out boxes, catering lunch boxes — [Clear Hinged](https://www.webstaurantstore.com/775/clear-hinged-take-out-containers.html), [Sushi Containers](https://www.webstaurantstore.com/56777/sushi-containers.html), [Paper Take-Out](https://www.webstaurantstore.com/11987/paper-take-out-boxes.html), [Catering Lunch Boxes](https://www.webstaurantstore.com/68183/catering-lunch-boxes.html?vendor=Choice)

### Inferences
- A contact-forward header is the regional norm. Phone, email or WhatsApp appears in the header of every UAE/GCC site that could be read, and at Hotpack it is paired with stated service hours. Ideal Pack should treat WhatsApp and phone as header-level elements.
- EN/AR was seen only at Hotpack. The smaller UAE stores read showed no language toggle in the captured text, so Arabic is a differentiator against small players but only parity against Hotpack.
- Two navigation axes recur: material or form (aluminium, paper, plastic) and audience or usage (Falcon "shop by usage", Restaurantware "Business Type", Multipack "We Serve", Uline industry hub). With 377 products, Ideal Pack's material categories can be the primary menu, with a small "shop by business" set as the second axis. Hotpack's 17-entry menu, which mixes materials with "New Arrivals" and "Miscellaneous Products", is the version to avoid.
- Model-number quick order suits Uline's scale and print-catalogue habit. At about 377 SKUs, a reorder list or "order again" is likely more proportionate than a paste-SKU tool. This is a judgement, not an observed result.

### Gaps
- Actual headers, search autosuggest and mini-cart or drawer behaviour for Uline, WebstaurantStore and Falcon Pack could not be observed.
- Search behaviour (typeahead, SKU search, Arabic query handling) was not testable on any site, because the tool reads static text only.
- Cart contents and checkout steps were not examined on any site. Doing so would have meant adding items, which was out of bounds.
- Sticky headers and mobile navigation could not be determined.

## How are homepage, category listing and product detail pages laid out?

### Takeaway
Regional homepages are promotion-led: image banners, then category or price-point tiles, then tabbed product shelves. Listing pages expose pack and size facets at Hotpack but only price at the smaller stores. Hotpack's product page is the fullest regional template observed, and its specification tab carries the carton data.

### Cited Findings

#### Homepages
- [LIVE] Hotpack UAE order: promotional banners; seasonal banners linking to collections; category tiles ("UNDER 9 AED STORE", "GLOVES & HYGIENE", "CONTAINERS & LIDS", "ECO-FRIENDLY PACKAGING", "GARBAGE BAGS & CLEANING", "PAPER BAGS", "PET CLEAR RANGE", "STICKERS"); "Trending Now"; product grid. The capture was truncated after that — [Hotpack Webstore homepage](https://www.hotpackwebstore.com/)
- [LIVE] Hotpack Bahrain order: banners; quick-link tiles including "Special Price Drop", "All Under BHD 10", "Pet Clear Range"; "Explore" tabs ("On Demand", "New Arrivals", "Best Buy", "Value Pack", "Under 10 BHD"); category image tiles including "Black Base Containers" and a WhatsApp tile; "Essentials" tabs; audience tiles linking to cafe/restaurant, office/pantry, hospital/clinics, homecare and e-commerce packaging collections; "Aluminium Products" tabs ("Containers", "Foils", "Pots", "Platters") — [Hotpack Bahrain](https://hotpack.bh/)
- [LIVE] Restaurantware order: app banner; holiday banners; four discount codes; category tiles; "NEW ARRIVALS"; tree-planting promise ("WE PLANT A TREE FOR EVERY ORDER YOU PLACE"); own-brand collection banners; "YOUR BRAND, YOUR WAY" customisation; RW Rewards and RW Max; "RECOMMENDATIONS" carousel with category filter tabs — [Restaurantware](https://www.restaurantware.com/)
- [LIVE] Cater Pack order: hero; services; offerings; eight category cards; "Why Choose Cater Pack" with client logos; CTA; FAQ with six questions; closing CTA. No products or prices — [Cater Pack](https://caterpack.co/)

#### Category listings
- [LIVE] Hotpack "Aluminium Containers" (37 results): filters for Price (AED range), Color, Product type, **Quantity** ("10 Pieces", "1000 Pieces", "1 Packet (20 Pieces)", "50 Sets"), **Size** ("130x102x35 mm", "690 ml", "Deep (320x260x60mm)"), **Option** ("Base", "Base + Lid", "Lid") and Product rating count — [Hotpack aluminium containers](https://www.hotpackwebstore.com/collections/aluminium-containers)
- [LIVE] Sort has nine options defaulting to "Featured". "Items per page" offers 10 to 50, set to 50 in the capture — [Hotpack aluminium containers](https://www.hotpackwebstore.com/collections/aluminium-containers)
- [LIVE] Hotpack cards carry image, "Add to wishlist", "Quick View", "Add to cart", "Compare", size-variant links with "+ N" overflow, name, SKU, short description, "From" price with a struck-through value, and a "Unit price / per" line whose value was blank in the capture — [Hotpack aluminium containers](https://www.hotpackwebstore.com/collections/aluminium-containers)
- [LIVE] Multipack: breadcrumb, category sidebar, min/max price filter, four view toggles ("Grid View", "Grid Extended View", "List View", "List View Small"), five sort options, 24 of 26 shown across two pages. Cards show category tags, discount badge, rating, "Product Code", "Packing", often "SKU: n/a", "Add to cart", "Compare" — [Multipack aluminium containers](https://multipackinternational.com/product-category/aluminium-products/containers/)
- [LIVE] Superior Pack cards: image, name, "MOQ: 5 ctn", "View Detail", "Add To Enquiry", with numbered pagination and no prices — [Superior Pack kraft category](https://superiorpackuae.com/products/category/kraft-box-and-containers)
- [INDEX] WebstaurantStore listings show case total and computed unit price together, such as "$19.99/Case" and "$0.10/Each" — [Condiment Packets](https://www.webstaurantstore.com/85/condiment-portion-control-packs.html)

#### Product detail pages
- [LIVE] Hotpack order: title with dimensions and count ("Aluminium Container 3 Compartment 225x177x30mm 500 Pieces"); SKU; "Availability: In Stock"; product type; price pair (220.00 / 190.00); "Unit price"; "Subtotal: 190.00"; "Hurry up! only 5 left"; "Ask An Expert"; "Option: Base + Lid" selector (Base + Lid, Base, Lid); "Estimated Shipping"; quantity stepper; "Add to cart"; "Add to wishlist"; back-in-stock signup; tabs "Description", "Specifications", "Shipping & Return", "Review"; Related Products — [Hotpack 3-compartment product](https://www.hotpackwebstore.com/products/aluminium-container-3-compartment-225x177x30mm-500-pieces)
- [LIVE] Defects visible in the capture: Related Products showed placeholder cards labelled "Example product title", and "Get it between" had no dates. Either may be content that loads only with JavaScript, so confirm before citing as a live bug — [Hotpack 3-compartment product](https://www.hotpackwebstore.com/products/aluminium-container-3-compartment-225x177x30mm-500-pieces)
- [INDEX] WebstaurantStore's "Product Overview" block lists "Quantity: 3,000/Case", "Package Size: 0.6 gram" and "Total Case Size: 3.97 lb." — [Salt packet product](https://www.webstaurantstore.com/salt-6-gram-portion-packet-case/125PCSA4003.html)
- [INDEX] Uline product pages put model number, dimensions and tiered prices together; the corrugated box page gives outside dimensions separately from inside dimensions — [S-4201](https://www.uline.com/Product/Detail/S-4201/Corrugated-Boxes-200-Test/20-x-20-x-20-Corrugated-Boxes)
- [3P] "Product pages show quantity price breaks and stock with shipping cutoff messages." (Uline) — [Elogic](https://elogic.co/blog/b2b-ecommerce-website-examples/)

### Inferences
- Hotpack's filter set is the most useful regional model. Quantity, Size and Option (base, lid, or both) are the facets that match how a kitchen buyer actually chooses, and they should translate directly to Ideal Pack. Size values should be normalised, because Hotpack mixes mm, ml and "Deep (...)" in one facet.
- With about 377 products, category pages will be short. Hotpack's 37-result aluminium collection shows that seven facet groups is already plenty at that scale. Ideal Pack needs fewer facets, not more.
- Regional homepages lean on price-point entry ("UNDER 9 AED STORE", "All Under BHD 10"), which is a cheap, distinctive idea for small buyers. Audience tiles (Hotpack Bahrain) are the natural route for trade buyers and are a good complement.
- Banner text embedded in images was noted on Hotpack's homepage. That hurts search, accessibility and bilingual maintenance, so it is better avoided.

### Gaps
- Visual hierarchy, grid column counts, image sizes and mobile layouts could not be observed.
- Full WebstaurantStore and Uline page order is unknown, only the extracted fragments.
- The lower halves of the Hotpack and Restaurantware homepages were truncated.
- No Falcon Pack page content could be read beyond search extracts.

## How do they present pack sizes, case quantities, dimensions, materials and per-unit pricing?

### Takeaway
The global benchmarks make unit economics explicit: WebstaurantStore shows case and per-each side by side, and Uline shows a model-by-model grid of dimensions, carton quantity and tiered price. UAE stores mostly price the pack or carton, put the count in the product title or a spec tab, and leave the per-piece maths to the buyer. This is the clearest gap Ideal Pack can close.

### Cited Findings
- [INDEX] WebstaurantStore: "$114.49/Case" beside "$0.45/Each" on a clear hinged listing — [Clear Hinged Containers](https://www.webstaurantstore.com/775/clear-hinged-take-out-containers.html)
- [INDEX] WebstaurantStore tiers by case quantity, e.g. "3 - 19: $8.29 $0.01/Each" and "Lots of 20: $7.79 $0.01/Each" — [Salt packet product](https://www.webstaurantstore.com/salt-6-gram-portion-packet-case/125PCSA4003.html)
- [INDEX] WebstaurantStore offers a full-case or smaller-pack choice with separate prices, e.g. a #2 kraft container at "200/Case $34.99 $8.75/Pack" and "50/Pack $12.99" — [Choice #2 kraft](https://www.webstaurantstore.com/choice-8-1-2-x-6-x-2-kraft-microwavable-folded-paper-2-take-out-container-case/795PTOKFT2.html). By calculation, $0.175 per piece by the case against about $0.26 per piece by the pack.
- [INDEX] WebstaurantStore titles lead with dimensions and end with case quantity, e.g. 'Choice 7 3/4" x 5 1/2" x 2 1/2" Customizable Kraft Microwavable Folded Paper #3 Take-Out Container - 200/Case'. The extract lists "Customizable Microwavable No PFAS Added Recyclable", top and bottom dimensions, capacity and shipping weight — [Choice #3 kraft](https://www.webstaurantstore.com/choice-8-1-2-x-6-x-2-1-2-kraft-microwavable-folded-paper-3-take-out-container-case/795PTOKFT3.html)
- [INDEX] The same #3 listing gives 66 oz in specs and 71 fl. oz in title and description, an example of spec inconsistency even at the benchmark — [Choice #3 kraft](https://www.webstaurantstore.com/choice-8-1-2-x-6-x-2-1-2-kraft-microwavable-folded-paper-3-take-out-container-case/795PTOKFT3.html)
- [INDEX] Uline foil container S-25386: gauge 25, 250 per carton, $80 or $75 at 3+ cartons, top outside 7 1/8", bottom 5 1/2", depth 1 15/32", oven and freezer safe with base rated -20° to 450° F and lid -20° to 180° F — [S-25386](https://www.uline.com/Product/Detail/S-25386/Take-Out-Containers/Aluminum-Foil-Take-Out-Containers-7-Round)
- [INDEX] Uline box charts use columns such as "INSIDE DIM. L x W x H", "PRICE PER BOX" and "BUNDLE/ BALE QTY", with tiers "25 100 250 500 1,000+" — [Multi-Depth Boxes](https://www.uline.com/BL_407/Multi-Depth-Boxes). Tier breaks change by product: the carton sizer uses "1 2 6+" — [Carton Sizer](https://www.uline.com/Product/Detail/H-101/Carton-Tool/Carton-Sizer)
- [LIVE] Hotpack's Specifications tab is a table: SKU, Material, Product Type, Length (22.5 cm), Width (17.7 cm), Height (3 cm), "Quantity Per Carton" (500 Pieces) — [Hotpack 3-compartment product](https://www.hotpackwebstore.com/products/aluminium-container-3-compartment-225x177x30mm-500-pieces)
- [INDEX] Hotpack component pricing as variants: a 225x177x30mm 500-piece listing shows AED 143.00 for base plus lid and AED 32.00 for lid alone — [Hotpack search extract, product page](https://www.hotpackwebstore.com/products/aluminium-container-3-compartment-225x177x30mm-500-pieces). The [LIVE] capture of that same page showed 220.00 / 190.00, so the prices conflict and may reflect age or variant.
- [INDEX] Hotpack shipping boxes are sold as size-and-count variants: AED 35.00 for 20 pieces and AED 155.00 for 100 pieces — [Hotpack shipping boxes](https://www.hotpackwebstore.com/products/multipurpose-cardboard-corrugated-e-commerce-shipping-boxes). By calculation, AED 1.75 against AED 1.55 per piece, a saving the extract does not show being stated.
- [LIVE] Hotpack wholesale cards sampled did not show a pack count; "From" prices were shown and pack sizes appeared only in the Quantity facet — [Hotpack wholesale](https://www.hotpackwebstore.com/collections/wholesale)
- [INDEX] Falcon Pack encodes pack structure in titles: "WHOLESALE-FALCON ALUM. Container Rectangle With Lid 8357/155 (1 Carton X 1000 Pieces)". Specs read "Material: Aluminium Type: Aluminum Containers Size: 430 cc Number of Pieces: 1000 Pieces", with price AED 200.55 and stock 65 — [Falcon product](https://falconpackonline.com/product/wholesale-falcon-alum-container-rectangle-with-lid-8357-155-1-carton-x-1000-pieces/)
- [INDEX] Falcon also shows inner-pack structure: "20 Packs x 100 Pieces" — [Falcon souffle container](https://falconpackonline.com/product/souffle-container-clear-with-lid-1-oz-20-packs-x-100-pieces/)
- [LIVE] Multipack uses a "Packing" field in several formats on one page: "Packing : 1×500", "Packing : 1×1,000", "Packing: 10 Pcs", "Packing : 1x10Pcs". AED is shown with the Arabic abbreviation "د.إ" — [Multipack aluminium containers](https://multipackinternational.com/product-category/aluminium-products/containers/)
- [LIVE] Restaurantware's unit line is the sold unit, e.g. "/ 100 count box" under a $73.99 price, and the page does not use the word "case" — [Restaurantware](https://www.restaurantware.com/)
- [INDEX] Cosmoplast sells aluminium by carton, with counts from 50 to 1,000 and an example of 84.00 for 1,000 pieces of the 250 cc size. Every listing in the extract was sold out — [Cosmoplast wholesale aluminium](https://shop.cosmoplast.com/collections/aluminium-containers-wholesale)
- [3P] Rajapack: "The unit price falls in bands as quantity rises, and the page shows every band." — [Elogic](https://elogic.co/blog/b2b-ecommerce-website-examples/)

### Inferences
- Recommended Ideal Pack card line, combining what the benchmarks do best: "AED X / carton of 500 · AED 0.xx each · 225×177×30 mm · Base + Lid". No UAE store read showed all four on the listing card.
- Use one structured pack schema (pieces per pack, packs per carton) and render it consistently. Falcon's "20 Packs x 100 Pieces" holds the right data model, while Multipack's four formats on one page show the cost of free text.
- Base-only, lid-only and base-plus-lid should be variants, not separate products, as at Hotpack. Aluminium and clear containers depend on this, and Uline's separate base and lid temperature ratings show why lid data matters.
- Show mm and ml as the primary units for the UAE. Inch and ounce sizes appear at the US stores and at Falcon (oz), so a conversion or a dual label would help where suppliers name items in oz.
- Add material facts that actually affect buying: gauge or thickness, microwave/freezer/oven suitability, temperature limits, and PFAS or compostability claims. These claims need real supplier backing.

### Gaps
- Whether Hotpack's "Unit price" line ever renders a per-piece value could not be confirmed. It was blank or unlabelled in captures.
- Currency display on Hotpack cards is unconfirmed. The filter uses د.إ, but card prices had no symbol in the text.
- Current WebstaurantStore and Uline prices and tier structures may differ, as extracts were old.
- A Uline trash liner (S-13577) appeared in search as priced per carton at "1 · 3 · 6+", but its URL was not identified, so it is unverified.

## How do they serve both retail and wholesale buyers on one site?

### Takeaway
Four models were found: parallel retail and wholesale catalogues (Hotpack, Falcon Pack), one catalogue with pack-size and tier pricing (WebstaurantStore, Uline), an enquiry or quote flow with no public prices (Superior Pack, Cater Pack), and WhatsApp-led bulk contact sitting alongside retail prices (Hotpack Bahrain, Multipack). None observed in the UAE showed a formal public wholesale tier table.

### Cited Findings
- [LIVE] Hotpack UAE has top-level "Wholesale" and "Shop Retail" links, a 538-result Wholesale collection, and retains filters such as Quantity and Size within it — [Hotpack wholesale](https://www.hotpackwebstore.com/collections/wholesale)
- [INDEX] Hotpack's retail side is pitched as "available with no minimum order quantity at wholesale-friendly prices" and "Retail Quantities, wholesale prices" — [Shop Retail](https://www.hotpackwebstore.com/collections/retail-products), [New Arrivals retail](https://www.hotpackwebstore.com/collections/retail-products/new-arrivals)
- [LIVE] Hotpack adds B2B support around the catalogue: "Customization" with an inquiry form, "E-Catalogue", "TRN Invoice Request" — [Hotpack Webstore homepage](https://www.hotpackwebstore.com/)
- [INDEX] Hotpack also has a "Buy More, Save More" collection — [Buy More, Save More](https://www.hotpackwebstore.com/collections/buy-more-save-more)
- [INDEX] Falcon separates by product record, using title prefixes "WHOLESALE-" and "RETAIL-" and a "WHOLESALE" product category, e.g. "RETAIL-TPPSC169 Sweet Container Cup" — [Falcon wholesale category](https://falconpackonline.com/product-category/wholesale/page/15/), [Falcon retail example](https://falconpackonline.com/product/sweet-container-cup-with-lid-in-oval-box-1-pack-x-14-pieces/)
- [LIVE] Hotpack Bahrain has "Shop Retail" and a "Business & Bulk Inquiries" link that goes to WhatsApp, plus "Meeting Request". No wholesale tiers or terms appeared — [Hotpack Bahrain](https://hotpack.bh/)
- [LIVE] Multipack handles wholesale as free text on a product: "The whole Sale Price is AED 200 / Carton" with WhatsApp/call contact and "Ready Stock" — [Multipack aluminium containers](https://multipackinternational.com/product-category/aluminium-products/containers/)
- [LIVE] Superior Pack shows "MOQ: 5 ctn" and routes through "Add To Enquiry" and "Instant Quote", with a "Shop Online" link offered separately — [Superior Pack kraft category](https://superiorpackuae.com/products/category/kraft-box-and-containers)
- [LIVE] Cater Pack's FAQ says it serves B2B and B2C and offers "food packaging wholesale solutions for restaurants, catering companies, and SMEs", but lists no tiers or MOQs — [Cater Pack](https://caterpack.co/)
- [INDEX] WebstaurantPlus gives free shipping on eligible orders of $29 or more, flagged by a blue Plus box beside the price — [WebstaurantPlus](https://www.webstaurantstore.com/plus/). The same extract states a fee of $99 per month. This looks unusual and should be checked on the live page before it is reused.
- [3P] WebstaurantPlus "bundles free shipping on eligible orders"; "Prices change with quantity and case packs, so buyers see the unit economics." — [Elogic](https://elogic.co/blog/b2b-ecommerce-website-examples/)
- [LIVE] Restaurantware has "RW Rewards" and "RW Max" and a "Business Type" nav entry. The captured text showed no wholesale wording, though the page was truncated — [Restaurantware](https://www.restaurantware.com/)
- [3P] METRO's online shop is described as open to business customers, with quantity discounts on selected products; Sysco and US Foods centre on order guides for repeat kitchens — [Elogic](https://elogic.co/blog/b2b-ecommerce-website-examples/)

### Inferences
- Splitting retail and wholesale into parallel catalogues duplicates products and hides the saving (Hotpack's 538-item wholesale collection; Falcon's duplicate-prefixed titles). At 377 SKUs Ideal Pack can run a single catalogue where each product offers "Pack" and "Carton" options, with a visible per-piece saving, plus a Wholesale page explaining trade terms.
- The Wholesale offer needs concrete content, which is where UAE sites are weakest: MOQ, tier thresholds, TRN invoicing, delivery by carton, and credit or payment terms. Any term shown must come from Ideal Pack's real commercial policy.
- Publish the tiers Ideal Pack can honour and keep a WhatsApp or quote route for orders above them. That combines the WebstaurantStore-style transparency with the regional contact habit.
- TRN Invoice Request is a low-cost UAE-specific trust feature worth copying.

### Gaps
- How Hotpack and Falcon set wholesale eligibility or whether accounts unlock different prices could not be determined; no login was attempted.
- Hotpack's delivery terms conflict: the header says free delivery on all orders, while search extracts of its product pages mention a threshold that varies by listing (the individual pages were not identified). Live terms need checking.
- Whether Uline requires approval for terms was only seen in an unattributed listicle extract, so it is not reported as fact.

## Which patterns are common across most sites, and which are distinctive and worth copying or avoiding?

### Takeaway
Common ground is promo-led merchandising, pack count in the title, and direct-contact routes in the UAE. The strongest ideas to copy are per-piece price beside carton price (WebstaurantStore), a compact spec-and-tier model grid (Uline), and base/lid variants with quantity and size facets (Hotpack). The main things to avoid are free-text pack formats, unlabelled strikethrough prices and parallel catalogues.

### Cited Findings
Each row is drawn from the sourced findings in the sections above; the links identify the main source page.

| Pattern | [Hotpack UAE](https://www.hotpackwebstore.com/) | [Falcon](https://falconpackonline.com/product-category/wholesale/page/15/) [INDEX] | [Multipack](https://multipackinternational.com/product-category/aluminium-products/containers/) | [Superior](https://superiorpackuae.com/products/category/kraft-box-and-containers) | [Restaurantware](https://www.restaurantware.com/) | [WebstaurantStore](https://www.webstaurantstore.com/775/clear-hinged-take-out-containers.html) [INDEX] | [Uline](https://www.uline.com/BL_407/Multi-Depth-Boxes) [INDEX] |
|---|---|---|---|---|---|---|---|
| Public prices | Yes | Yes | Yes | No, enquiry | Yes | Yes | Yes |
| Pack count in title | Yes | Yes | Some | Not seen | Not seen | Yes | Not seen |
| Per-piece price visible | Unconfirmed | Not seen | Not seen | No | Not seen | Yes | Per box on charts |
| Quantity tiers shown | Not seen | Not seen | Not seen | No | Not seen | Yes | Yes |
| Usage or audience route | Not seen (seen at Hotpack Bahrain) | Yes | Footer "We Serve" | Not seen | Yes | Not seen | Yes |
| Wholesale labelled | Yes, collection | Yes, prefix | Free text | MOQ only | Not seen | Not seen | Not seen |
| AR language | Yes | Unknown | Not seen | Not seen | n/a | n/a | n/a |

"Not seen" means absent from the captured text, not proven absent from the site.

Additional distinctive observations:
- [INDEX] Uline's same-day promise is stated on food service pages, with a 6 p.m. cut-off and 15 locations — [Uline Take-Out Containers](https://www.uline.com/Grp_413/Take-Out-Containers)
- [INDEX] Uline publishes buying tools, including a Box Guide and a Carton Sizer — [Box Guide](https://www.uline.com/guide/BoxGuides.htm), [Carton Sizer](https://www.uline.com/Product/Detail/H-101/Carton-Tool/Carton-Sizer)
- [LIVE] Restaurantware uses a non-price brand promise ("WE PLANT A TREE FOR EVERY ORDER YOU PLACE") and a customisation route ("YOUR BRAND, YOUR WAY") — [Restaurantware](https://www.restaurantware.com/)
- [LIVE] Hotpack's "Ask An Expert" on the product page and "Hurry up! only 5 left" urgency message — [Hotpack 3-compartment product](https://www.hotpackwebstore.com/products/aluminium-container-3-compartment-225x177x30mm-500-pieces)
- [LIVE] Hotpack Bahrain's discount cards show crossed-out "Regular price" and "Sale" badges, for example "23.410 BHD16.800 BHD" — [Hotpack Bahrain](https://hotpack.bh/)
- [INDEX] Falcon lists stock counts (e.g. 65 in stock), and category and product pages showed different prices for the same fork carton, AED 56.70 and AED 49.35 — [Falcon fork](https://falconpackonline.com/product/falcon-plastic-fork-black-pp-1-carton-x-1000-pieces/)

### Inferences
**Common patterns to meet as baseline**
- Top strip with delivery message, visible phone or WhatsApp, material-led categories, carton or pack count in the title, SKU on the product, spec table with L/W/H and quantity per carton.

**Worth copying, in priority order**
1. Case price and per-piece price together on every card and product page (WebstaurantStore). No UAE store read did this visibly, so it is the most direct point of difference.
2. Multi-size comparison on one page: a Uline-style table of size, capacity, carton quantity, price and add-to-cart. Ideal Pack's aluminium and clear ranges fit this well.
3. Quantity, Size and Option facets (Hotpack), with cleaner value formats.
4. Base, lid and base-plus-lid variants (Hotpack).
5. Pack-or-carton selector with explicit savings (WebstaurantStore pack-versus-case).
6. A "shop by business" row for cafes, restaurants, catering and bakeries (Hotpack Bahrain, Restaurantware).
7. "TRN Invoice Request", or simply TRN capture at checkout (Hotpack).
8. A price-point entry tile such as "Under AED 10" (Hotpack).
9. Stated delivery cut-off, if operations can honour one (Uline).

**Worth avoiding**
- Free-text pack formats (Multipack) and pack data held only in titles (Falcon).
- Duplicate "WHOLESALE-" and "RETAIL-" product records (Falcon), which also create price inconsistencies.
- Blank or unlabelled unit price fields and "From" prices without saying what the price buys (Hotpack). A "From 25.00" card is ambiguous when packs range from 10 to 1,000 pieces.
- Dense filter lists on small categories, since rating-count facets add little at this scale (Hotpack).
- Placeholder related-product blocks and empty estimated-delivery text, if those are confirmed live (Hotpack).
- Scarcity messaging that is not tied to real stock (Hotpack shows "only 5 left"; whether it is accurate could not be verified).
- Enquiry-only flows for standard stock (Superior Pack, Cater Pack), except as a route for large or custom orders.

### Gaps
- Search extracts of Hotpack aluminium listings mentioned a return charge of up to AED 50 above 5 cartons and a 15 AED cancellation fee for dispatched orders. The specific pages were not identified, so these are unverified.
- No conversion data, A/B results or published teardown specific to these packaging stores was found. Listicle commentary is opinion and the recommendations above are design judgement.
- No direct UAE benchmark for mobile or Arabic UX could be assessed from text extraction.
- A visual review of Uline, WebstaurantStore and Falcon Pack in a normal browser would be needed to confirm layout claims and fill the "Not seen" cells.
