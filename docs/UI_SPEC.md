\# UI SPECIFICATION



\# Digital Electronics E-commerce



\## 0. Document Purpose



This document defines WHAT the Digital Electronics E-commerce application must contain.



It defines:



\* Pages

\* Routes

\* Page responsibilities

\* Sections

\* Components

\* User flows

\* UI states

\* Responsive requirements

\* Navigation

\* Commerce flows

\* Customer account

\* Content/blog

\* Support

\* Admin dashboard

\* Error and empty states



This document defines the functional UI scope.



Visual identity, colors, typography, spacing, visual style, and brand direction are defined separately in:



`BRAND\_GUIDELINES.md`



Both documents must be followed.



\---



\# 1. Project Scope



The application is a Persian RTL digital electronics e-commerce platform.



The application is UI/UX only.



The current phase does NOT implement:



\* Backend

\* Database

\* Real API

\* Real authentication

\* Real payment

\* Real inventory

\* Real order processing

\* Real shipping integration

\* Real business logic



Use realistic centralized mock data.



All flows should look and behave like a real commercial application from a UI perspective.



The architecture must remain ready for future backend integration.



\---



\# 2. Main Product Categories



The initial catalog should focus on digital and electronic products.



Primary categories:



1\. Mobile Phones

2\. Laptops

3\. Tablets

4\. Monitors

5\. Headphones \& Earbuds

6\. Smart Watches

7\. Smart Bands

8\. Gaming Consoles

9\. Gaming Accessories

10\. Cameras

11\. Computer Accessories

12\. Mobile Accessories

13\. Chargers \& Power Adapters

14\. Power Banks

15\. Cables \& Adapters

16\. Storage

17\. Flash Drives

18\. SSD

19\. Hard Drives

20\. Computer Components

21\. Networking

22\. Smart Home

23\. Speakers

24\. TV \& Home Entertainment

25\. Content Creation Equipment

26\. Printers \& Office Electronics

27\. Other Digital Accessories



Category depth should support:



Category

→ Subcategory

→ Product



\---



\# 3. Application Structure



The application should conceptually contain these areas:



```text

Public Storefront

Authentication

Customer Account

Commerce

Content / Blog

Support / Information

Admin Dashboard

System / Error Pages

```



\---



\# 4. Global Layout



All storefront pages should use:



\* Global Header

\* Optional Announcement Bar

\* Main Content

\* Optional Breadcrumb

\* Footer



Some pages may intentionally use a specialized layout.



Examples:



\* Authentication layout

\* Checkout layout

\* Customer dashboard layout

\* Admin dashboard layout

\* Full-screen product gallery

\* Article layout



\---



\# 5. Global Header



Route-independent component.



Desktop header should contain:



\* Brand/logo

\* Main search

\* Account

\* Wishlist

\* Compare

\* Cart

\* Main navigation

\* Category access



Potential navigation:



\* فروشگاه

\* دسته‌بندی‌ها

\* تخفیف‌ها

\* پرفروش‌ها

\* مقایسه

\* راهنمای خرید

\* بلاگ



Do not overload the header.



\---



\# 6. Announcement Bar



Optional global announcement bar.



Examples:



\* ارسال رایگان

\* تخفیف ویژه

\* کمپین جدید

\* ضمانت اصالت کالا



Requirements:



\* Dismissible where appropriate

\* Responsive

\* Does not consume excessive vertical space



\---



\# 7. Mega Menu



Desktop category navigation.



Sections:



\* Main categories

\* Subcategories

\* Popular brands

\* Featured products

\* Promotional area

\* View all



Example:



```text

موبایل

&#x20; Apple

&#x20; Samsung

&#x20; Xiaomi

&#x20; Google

&#x20; Honor



لپ‌تاپ

&#x20; Asus

&#x20; Lenovo

&#x20; HP

&#x20; Acer

&#x20; Apple



هدفون

&#x20; Sony

&#x20; JBL

&#x20; Apple

&#x20; Samsung

```



Mega menu must support RTL.



\---



\# 8. Mobile Navigation



Mobile navigation must NOT be a compressed desktop navigation.



Include:



\* Search

\* Categories

\* Account

\* Wishlist

\* Cart

\* Main menu drawer



Mobile drawer may contain:



\* Categories

\* Brands

\* Offers

\* Blog

\* Help

\* About



\---



\# 9. Homepage



Route:



`/`



The homepage is the primary commercial landing page.



\## Sections



\### 9.1 Hero



Large promotional area.



Possible content:



\* Product image

\* Campaign headline

\* Supporting text

\* CTA

\* Secondary CTA

\* Promotional badge



Hero should support multiple slides if appropriate.



\---



\### 9.2 Featured Categories



Show major categories:



\* Mobile

\* Laptop

\* Tablet

\* Headphones

\* Smart Watch

\* Gaming

\* Accessories



Each category:



\* Image/icon

\* Name

\* Product count optional



\---



\### 9.3 Popular Brands



Examples:



\* Apple

\* Samsung

\* Xiaomi

\* Sony

\* Lenovo

\* Asus

\* JBL

\* Anker

\* HP

\* Huawei



Brand cards should be simple and premium.



\---



\### 9.4 Flash Sale



Show:



\* Countdown

\* Product cards

\* Discount

\* Old price

\* Current price

\* Stock indicator

\* CTA



UI only.



\---



\### 9.5 Best Sellers



Product carousel/grid.



\---



\### 9.6 New Arrivals



Product carousel/grid.



\---



\### 9.7 Recommended Products



Mock personalized section.



Example:



`پیشنهادهای مناسب برای شما`



\---



\### 9.8 Category Promotional Banner



Example:



```text

دنیای گیمینگ

کنسول + لوازم جانبی

مشاهده محصولات

```



\---



\### 9.9 Editorial Section



Content-driven product discovery.



Examples:



\* بهترین گوشی‌های سال

\* لپ‌تاپ مناسب برنامه‌نویسی

\* راهنمای خرید هدفون

\* تجهیزات تولید محتوا



\---



\### 9.10 Trust Section



Examples:



\* ضمانت اصالت

\* ارسال سریع

\* پشتیبانی

\* پرداخت امن

\* ضمانت بازگشت



\---



\### 9.11 Blog Preview



Show:



\* Latest articles

\* Buying guides

\* Tutorials

\* News



\---



\### 9.12 Newsletter / CTA



Optional:



\* Email input

\* CTA

\* Promotional message



\---



\# 10. All Products



Route:



`/products`



Purpose:



Show entire catalog.



Sections:



\* Breadcrumb

\* Page title

\* Product count

\* Sort

\* Filter

\* Product grid

\* Pagination



Sorting:



\* جدیدترین

\* پرفروش‌ترین

\* ارزان‌ترین

\* گران‌ترین

\* بیشترین تخفیف

\* بالاترین امتیاز



\---



\# 11. Category Landing Page



Route:



`/category/\[slug]`



Example:



`/category/mobile`



Sections:



\* Breadcrumb

\* Category title

\* Category description

\* Category image/banner

\* Subcategories

\* Popular brands

\* Featured products

\* Product listing

\* FAQ



\---



\# 12. Subcategory Page



Route:



`/category/\[category]/\[subcategory]`



Example:



`/category/mobile/smartphones`



Sections:



\* Breadcrumb

\* Title

\* Description

\* Filters

\* Sorting

\* Product grid

\* Pagination



\---



\# 13. Category Landing With Use Cases



Some categories require alternative discovery.



Example:



Laptop:



\* دانشجویی

\* گیمینگ

\* مهندسی

\* طراحی

\* برنامه‌نویسی

\* اداری

\* اقتصادی



This pattern is inspired by the useful category segmentation approach used in electronics commerce content/catalog structures.



\---



\# 14. Search Page



Route:



`/search`



Query:



`/search?q=iphone`



Sections:



\* Search input

\* Search title

\* Search query

\* Result count

\* Suggested categories

\* Filters

\* Sorting

\* Product grid

\* Pagination



\---



\# 15. Search Suggestions



While typing:



Show:



\* Products

\* Categories

\* Brands

\* Recent searches

\* Popular searches



\---



\# 16. Search Empty State



When no query exists:



Show:



\* Search illustration

\* Search prompt

\* Popular searches

\* Popular categories



\---



\# 17. Search No Results



Show:



\* No result message

\* Search correction suggestions

\* Related categories

\* Recommended products

\* Clear filters button



\---



\# 18. Brand Listing



Route:



`/brands`



Show:



\* Search brands

\* Popular brands

\* Alphabetical/grouped brands

\* Brand logo cards



\---



\# 19. Brand Detail



Route:



`/brand/\[slug]`



Example:



`/brand/apple`



Sections:



\* Brand hero

\* Brand logo

\* Brand description

\* Popular categories

\* Brand products

\* Filters

\* Sorting

\* Pagination



\---



\# 20. Collection Pages



Route:



`/collections`



Individual:



`/collections/\[slug]`



Examples:



\* Best Sellers

\* New Arrivals

\* Gaming

\* Student Essentials

\* Work From Home

\* Creator Setup

\* Smart Home

\* Apple Collection



Each collection has:



\* Hero

\* Description

\* Featured products

\* Product grid

\* Filters where useful



\---



\# 21. Sale Page



Route:



`/sale`



Sections:



\* Sale hero

\* Flash sale

\* Discount categories

\* Products

\* Sorting

\* Filters



\---



\# 22. Deals Page



Route:



`/deals`



Sections:



\* Current campaigns

\* Limited-time offers

\* Discount products

\* Countdown

\* Product cards



\---



\# 23. Product Detail



Route:



`/product/\[slug]`



This is one of the most important pages.



\## Above the fold



\* Breadcrumb

\* Product gallery

\* Product title

\* Brand

\* Rating

\* Review count

\* Short summary

\* Price

\* Discount

\* Availability

\* Variant selection

\* Warranty

\* Shipping information

\* Add to cart

\* Wishlist

\* Compare



\---



\# 24. Product Gallery



Support:



\* Main image

\* Thumbnail gallery

\* Multiple images

\* Zoom

\* Fullscreen

\* Next/previous



Responsive behavior:



Desktop:



Gallery + thumbnails



Mobile:



Swipe gallery + thumbnails/indicator



\---



\# 25. Product Variants



Depending on product category:



\* Color

\* Storage

\* RAM

\* CPU

\* GPU

\* Size

\* Model

\* Capacity



Variant states:



\* Available

\* Selected

\* Disabled

\* Out of stock



\---



\# 26. Product Price Section



Show:



\* Current price

\* Original price

\* Discount percentage

\* Installment/mock payment information

\* Price information

\* Availability



Do not create actual payment logic.



\---



\# 27. Seller Information



Product page may show:



\* Seller name

\* Seller rating

\* Seller badge

\* Warranty

\* Availability

\* Shipping



If marketplace behavior is enabled.



\---



\# 28. Delivery Information



Show:



\* Estimated delivery

\* Shipping method

\* Availability

\* Pickup option if relevant



UI only.



\---



\# 29. Product Highlights



Example:



```text

Highlights



• 6.7-inch display

• 256GB storage

• 8GB RAM

• 5000mAh battery

• 5G

```



\---



\# 30. Technical Specifications



This is a major component.



Group specifications.



Example:



```text

Display

&#x20; Size

&#x20; Resolution

&#x20; Refresh Rate

&#x20; Panel Type



Processor

&#x20; CPU

&#x20; GPU

&#x20; Architecture



Memory

&#x20; RAM

&#x20; Storage



Connectivity

&#x20; Wi-Fi

&#x20; Bluetooth

&#x20; USB



Battery

&#x20; Capacity

&#x20; Charging

```



Must be highly scannable.



\---



\# 31. Product Description



Sections:



\* Overview

\* Features

\* Detailed description

\* Technical explanation

\* Images



\---



\# 32. Product Reviews



Show:



\* Overall rating

\* Rating distribution

\* Review count

\* Review cards

\* Verified purchase indicator

\* Helpful action

\* Filters

\* Sort



\---



\# 33. Product Questions



Section:



`سوالات کاربران`



Show:



\* Question

\* Answer

\* Date

\* User type

\* Ask question CTA



UI only.



\---



\# 34. Related Products



Show:



\* Similar products

\* Related accessories

\* Compatible products



\---



\# 35. Frequently Bought Together



Show:



\* Product

\* Compatible accessory

\* Combined price

\* Add selection



UI only.



\---



\# 36. Recently Viewed



Show recently viewed products.



Can appear:



\* Homepage

\* Product detail

\* Account



\---



\# 37. Compare



Route:



`/compare`



Purpose:



Compare selected electronics products.



Show:



\* Product headers

\* Images

\* Price

\* Rating

\* Key specifications

\* Full specifications

\* Highlight differences

\* Remove product

\* Add another product



\---



\# 38. Compare Selection



Users can add products to comparison from:



\* Product card

\* Product detail

\* Search

\* Category page



Comparison state is UI/mock only.



\---



\# 39. Compare Empty State



Show:



\* Explanation

\* Product search

\* Popular products

\* Category shortcuts



\---



\# 40. Wishlist



Route:



`/wishlist`



Show:



\* Wishlist products

\* Price

\* Availability

\* Discount

\* Remove

\* Add to cart



Empty state:



\* Illustration

\* Message

\* Browse products CTA



\---



\# 41. Cart



Route:



`/cart`



Show:



\* Cart items

\* Product image

\* Product title

\* Variant

\* Quantity

\* Price

\* Discount

\* Remove

\* Save for later



Sidebar/summary:



\* Subtotal

\* Discount

\* Shipping

\* Final price

\* Checkout CTA



\---



\# 42. Empty Cart



Show:



\* Empty cart illustration

\* Message

\* Browse products CTA

\* Recommended products



\---



\# 43. Cart Drawer



Header cart icon can open a cart drawer.



Show:



\* Recent cart items

\* Quantity

\* Price

\* Remove

\* View cart

\* Checkout



\---



\# 44. Checkout



Route:



`/checkout`



Multi-step visual flow:



1\. Address

2\. Shipping

3\. Payment

4\. Review



\---



\# 45. Checkout Address



Show:



\* Saved addresses

\* Select address

\* Add address

\* Edit address

\* Delete address



Address form:



\* Full name

\* Phone

\* Province

\* City

\* Address

\* Postal code

\* Unit

\* Building



UI only.



\---



\# 46. Checkout Shipping



Show:



\* Delivery methods

\* Delivery date

\* Shipping cost

\* Estimated delivery



\---



\# 47. Checkout Payment



Show:



\* Payment methods

\* Card/payment UI

\* Wallet option

\* Mock payment gateway



Do NOT connect real payment.



\---



\# 48. Checkout Review



Show:



\* Products

\* Address

\* Shipping

\* Payment method

\* Discount

\* Total

\* Confirm order



\---



\# 49. Checkout Error



Show:



\* Payment failure

\* Retry

\* Change payment method

\* Return to cart



\---



\# 50. Checkout Success



Route:



`/checkout/success`



Show:



\* Success message

\* Order number

\* Order summary

\* Delivery information

\* Track order

\* Continue shopping



\---



\# 51. Checkout Cancelled



Route:



`/checkout/cancelled`



Show:



\* Cancellation message

\* Cart status

\* Retry checkout

\* Continue shopping



\---



\# 52. Authentication



Authentication pages:



```text

/login

/register

/verify

/forgot-password

/reset-password

```



\---



\# 53. Login



Show:



\* Phone/email

\* Password

\* Remember me

\* Forgot password

\* Login CTA

\* Register CTA



\---



\# 54. Register



Show:



\* Name

\* Phone/email

\* Password

\* Confirm password

\* Terms agreement

\* Register CTA



\---



\# 55. OTP Verification



Show:



\* Phone/email

\* OTP fields

\* Countdown

\* Resend

\* Edit contact information



\---



\# 56. Forgot Password



Show:



\* Email/phone

\* Submit

\* Back to login



\---



\# 57. Reset Password



Show:



\* New password

\* Confirm password

\* Password requirements

\* Success state



\---



\# 58. Customer Account



Route:



`/account`



Dashboard overview.



Show:



\* Welcome

\* Recent orders

\* Wishlist summary

\* Wallet/credits

\* Addresses

\* Notifications

\* Recommended products



\---



\# 59. Account Orders



Route:



`/account/orders`



Show:



\* Order list

\* Order number

\* Date

\* Status

\* Total

\* Product preview

\* View order



Filters:



\* All

\* Processing

\* Shipped

\* Delivered

\* Cancelled

\* Returned



\---



\# 60. Order Detail



Route:



`/account/orders/\[id]`



Show:



\* Order number

\* Date

\* Status timeline

\* Products

\* Prices

\* Address

\* Shipping

\* Payment

\* Invoice

\* Support

\* Return/cancel action



\---



\# 61. Order Tracking



Route:



`/account/orders/\[id]/tracking`



Show timeline:



```text

ثبت سفارش

↓

تایید سفارش

↓

آماده‌سازی

↓

تحویل به پست

↓

در مسیر

↓

تحویل شده

```



\---



\# 62. Returns



Route:



`/account/returns`



Show:



\* Return requests

\* Status

\* Product

\* Request date

\* Details



\---



\# 63. Return Request



Route:



`/account/returns/new`



Show:



\* Select order

\* Select product

\* Reason

\* Description

\* Optional image upload UI

\* Submit



UI only.



\---



\# 64. Addresses



Route:



`/account/addresses`



Show:



\* Address cards

\* Default address

\* Add

\* Edit

\* Delete



\---



\# 65. Profile



Route:



`/account/profile`



Show:



\* Name

\* Phone

\* Email

\* Birth date optional

\* Profile image

\* Edit



\---



\# 66. Security



Route:



`/account/security`



Show:



\* Change password

\* Login sessions UI

\* Two-factor authentication UI

\* Security notifications



No real security logic.



\---



\# 67. Notifications



Route:



`/account/notifications`



Show:



\* Order notifications

\* Promotions

\* System messages

\* Read/unread states

\* Mark all as read



\---



\# 68. Wallet



Route:



`/account/wallet`



UI only.



Show:



\* Balance

\* Transactions

\* Add credit

\* Usage history



No real payment.



\---



\# 69. Coupons



Route:



`/account/coupons`



Show:



\* Available coupons

\* Used coupons

\* Expired coupons

\* Coupon details



\---



\# 70. Reviews



Route:



`/account/reviews`



Show:



\* Reviewed products

\* Pending reviews

\* Write review

\* Edit review



\---



\# 71. Questions



Route:



`/account/questions`



Show:



\* Asked questions

\* Answers

\* Product

\* Date



\---



\# 72. Recently Viewed



Route:



`/account/recently-viewed`



Show:



\* Recently viewed products

\* Clear history



\---



\# 73. Support Center



Route:



`/support`



Show:



\* Search support

\* FAQ categories

\* Contact support

\* Order support

\* Shipping

\* Returns

\* Payment



\---



\# 74. FAQ



Route:



`/faq`



Categories:



\* Orders

\* Payment

\* Shipping

\* Returns

\* Products

\* Account

\* Warranty



Use searchable accordion UI.



\---



\# 75. Shipping Information



Route:



`/shipping`



Show:



\* Delivery methods

\* Delivery areas

\* Delivery times

\* Shipping costs

\* Tracking information



\---



\# 76. Returns \& Refunds



Route:



`/returns`



Show:



\* Return policy

\* Eligible products

\* Process

\* Refund process

\* FAQ



\---



\# 77. Warranty



Route:



`/warranty`



Show:



\* Warranty information

\* Warranty types

\* How to use warranty

\* Common questions



\---



\# 78. Payment Guide



Route:



`/payment`



Show:



\* Payment methods

\* Online payment

\* Installment/mock payment

\* Payment troubleshooting



\---



\# 79. Contact



Route:



`/contact`



Show:



\* Contact form

\* Phone

\* Email

\* Working hours

\* Address

\* Map placeholder

\* Social links



\---



\# 80. About



Route:



`/about`



Show:



\* Brand story

\* Mission

\* Values

\* Trust

\* Team optional

\* Statistics

\* CTA



\---



\# 81. Stores / Physical Locations



Route:



`/stores`



Optional.



Show:



\* Store locations

\* Map

\* Address

\* Phone

\* Working hours



\---



\# 82. Blog



Route:



`/blog`



The blog is part of the product discovery and SEO experience.



Categories:



\* راهنمای خرید

\* آموزش و ترفند

\* اخبار تکنولوژی

\* بررسی محصولات

\* مقایسه محصولات

\* دنیای موبایل

\* دنیای لپ‌تاپ

\* گیمینگ

\* لوازم جانبی

\* خانه هوشمند



The separation between buying guides and educational/tutorial content is intentional and follows a useful structure seen in Iranian electronics content sites.



\---



\# 83. Blog Category



Route:



`/blog/category/\[slug]`



Show:



\* Category title

\* Description

\* Featured article

\* Article grid

\* Pagination

\* Popular articles



\---



\# 84. Blog Article



Route:



`/blog/\[slug]`



Show:



\* Breadcrumb

\* Category

\* Title

\* Subtitle

\* Author

\* Publication date

\* Reading time

\* Hero image

\* Article content

\* Table of contents

\* Images

\* Related products

\* Related articles

\* Share actions

\* Tags

\* Comments section UI



\---



\# 85. Buying Guide



Route:



`/buying-guide`



Show:



\* Buying guide categories

\* Featured guides

\* Latest guides

\* Popular guides



\---



\# 86. Buying Guide Detail



Route:



`/buying-guide/\[slug]`



Examples:



\* Best phones under a price range

\* Best laptops for programming

\* Best headphones

\* Best gaming monitors



Show:



\* Intro

\* Buying criteria

\* Product recommendations

\* Comparison

\* Pros/cons

\* Final recommendation

\* Related products



\---



\# 87. Product Reviews / Editorial Reviews



Route:



`/reviews`



Show:



\* Editorial product reviews

\* Categories

\* Latest reviews

\* Popular reviews



\---



\# 88. Product Review Article



Route:



`/reviews/\[slug]`



Show:



\* Product

\* Score

\* Pros

\* Cons

\* Technical overview

\* Test/review content

\* Images

\* Verdict

\* Related products



\---



\# 89. Technology News



Route:



`/blog/category/technology-news`



Show technology news articles.



\---



\# 90. Tutorials



Route:



`/blog/category/tutorials`



Show:



\* How-to articles

\* Guides

\* Troubleshooting



\---



\# 91. Compare Articles



Route:



`/blog/category/comparisons`



Show articles such as:



\* iPhone vs Samsung

\* MacBook vs Windows laptop

\* Sony vs JBL headphones



\---



\# 92. Glossary



Route:



`/glossary`



Technical terminology.



Examples:



\* AMOLED

\* OLED

\* Refresh Rate

\* RAM

\* SSD

\* CPU

\* GPU

\* NFC

\* 5G



\---



\# 93. Glossary Detail



Route:



`/glossary/\[slug]`



Show:



\* Term

\* Definition

\* Explanation

\* Related products

\* Related articles



\---



\# 94. Landing Pages



Marketing landing pages should support:



`/landing/\[slug]`



Examples:



\* Back to School

\* Gaming Week

\* Apple Week

\* Smart Home

\* Creator Setup



Each landing page may contain:



\* Hero

\* Product sections

\* Campaign banner

\* Categories

\* Benefits

\* CTA



\---



\# 95. Static Legal Pages



Routes:



```text

/terms

/privacy

/conditions

/cookie-policy

```



Show structured legal content.



\---



\# 96. Cookie / Privacy UI



Include:



\* Cookie consent

\* Privacy information

\* Preferences UI



UI only.



\---



\# 97. Notifications Center



Optional global route:



`/notifications`



Show:



\* System notifications

\* Promotional notifications

\* Order notifications



\---



\# 98. Admin Dashboard



The project should include an admin UI so the frontend architecture is not limited to the customer storefront.



Route:



`/admin`



Admin UI is mock-only.



\---



\# 99. Admin Dashboard Overview



Route:



`/admin`



Show:



\* Revenue

\* Orders

\* Products

\* Customers

\* Conversion

\* Average order value

\* Sales chart

\* Recent orders

\* Top products

\* Low stock

\* Notifications



Use realistic mock analytics.



\---



\# 100. Admin Orders



Route:



`/admin/orders`



Show:



\* Order table

\* Search

\* Filters

\* Status

\* Customer

\* Date

\* Amount

\* Payment

\* Actions



\---



\# 101. Admin Order Detail



Route:



`/admin/orders/\[id]`



Show:



\* Order information

\* Customer

\* Products

\* Payment

\* Shipping

\* Status timeline

\* Internal notes UI

\* Actions



\---



\# 102. Admin Products



Route:



`/admin/products`



Show:



\* Product table

\* Search

\* Category

\* Brand

\* Stock

\* Price

\* Status

\* Actions



\---



\# 103. Admin Create Product



Route:



`/admin/products/new`



Multi-section form:



\* Basic information

\* Images

\* Category

\* Brand

\* Price

\* Discount

\* Inventory

\* Variants

\* Technical specifications

\* SEO information



UI only.



\---



\# 104. Admin Edit Product



Route:



`/admin/products/\[id]/edit`



Same structure as create product.



\---



\# 105. Admin Categories



Route:



`/admin/categories`



Show:



\* Category tree

\* Add

\* Edit

\* Delete

\* Reorder

\* Visibility



\---



\# 106. Admin Brands



Route:



`/admin/brands`



Show:



\* Brand table

\* Logo

\* Name

\* Product count

\* Status

\* Actions



\---



\# 107. Admin Inventory



Route:



`/admin/inventory`



Show:



\* Stock table

\* Low stock

\* Out of stock

\* SKU

\* Warehouse

\* Quantity



\---



\# 108. Admin Customers



Route:



`/admin/customers`



Show:



\* Customer table

\* Name

\* Orders

\* Total spending

\* Registration date

\* Status



\---



\# 109. Admin Customer Detail



Route:



`/admin/customers/\[id]`



Show:



\* Customer information

\* Orders

\* Addresses

\* Activity

\* Reviews

\* Support tickets



\---



\# 110. Admin Discounts



Route:



`/admin/discounts`



Show:



\* Coupons

\* Discount campaigns

\* Active/inactive

\* Expiration

\* Usage



\---



\# 111. Admin Campaigns



Route:



`/admin/campaigns`



Show:



\* Campaigns

\* Banner campaigns

\* Flash sales

\* Start/end dates

\* Status



\---



\# 112. Admin Reviews



Route:



`/admin/reviews`



Show:



\* Reviews

\* Rating

\* Product

\* Customer

\* Status

\* Moderation actions



\---



\# 113. Admin Questions



Route:



`/admin/questions`



Show:



\* Product questions

\* Answer status

\* Product

\* Customer

\* Moderation



\---



\# 114. Admin Blog



Route:



`/admin/blog`



Show:



\* Articles

\* Drafts

\* Published

\* Categories

\* Authors

\* Date



\---



\# 115. Admin Create Article



Route:



`/admin/blog/new`



Show:



\* Title

\* Subtitle

\* Cover image

\* Category

\* Author

\* Content editor UI

\* Tags

\* SEO

\* Publish status



UI only.



\---



\# 116. Admin Edit Article



Route:



`/admin/blog/\[id]/edit`



Same content-management structure.



\---



\# 117. Admin Media



Route:



`/admin/media`



Show:



\* Images

\* Product images

\* Blog images

\* Search

\* Filters

\* Upload UI



No real upload backend.



\---



\# 118. Admin Support



Route:



`/admin/support`



Show:



\* Tickets

\* Status

\* Priority

\* Customer

\* Order

\* Assigned staff



\---



\# 119. Admin Support Ticket



Route:



`/admin/support/\[id]`



Show:



\* Customer

\* Ticket history

\* Messages

\* Order context

\* Status

\* Priority

\* Reply UI



\---



\# 120. Admin Notifications



Route:



`/admin/notifications`



Show:



\* Notifications

\* System announcements

\* Promotional notifications

\* Read/unread

\* Create notification UI



\---



\# 121. Admin Settings



Route:



`/admin/settings`



Sections:



\* General

\* Store

\* Orders

\* Shipping

\* Payment

\* Notifications

\* SEO

\* Appearance

\* Security



UI only.



\---



\# 122. Admin Profile



Route:



`/admin/profile`



Show:



\* Admin information

\* Password UI

\* Sessions

\* Notifications



\---



\# 123. Admin Roles \& Permissions



Route:



`/admin/roles`



Show:



\* Roles

\* Permissions

\* Admin users

\* Permission matrix



Examples:



```text

Super Admin

Product Manager

Order Manager

Content Manager

Support Agent

```



UI only.



\---



\# 124. Admin Analytics



Route:



`/admin/analytics`



Show:



\* Revenue

\* Orders

\* Customers

\* Conversion

\* Product performance

\* Category performance

\* Traffic mock data

\* Charts

\* Date filters



\---



\# 125. Admin SEO



Route:



`/admin/seo`



Show:



\* Metadata

\* Sitemap status

\* Search preview

\* Canonical URL

\* Open Graph preview



UI only.



\---



\# 126. Admin Activity Log



Route:



`/admin/activity`



Show:



\* User

\* Action

\* Target

\* Date

\* Status



\---



\# 127. Seller / Marketplace Panel



This is optional for the initial version.



If marketplace functionality is included later:



`/seller`



Possible sections:



\* Dashboard

\* Products

\* Add product

\* Orders

\* Inventory

\* Pricing

\* Promotions

\* Reviews

\* Questions

\* Wallet

\* Reports

\* Profile



The architecture should allow this later without requiring it in the first UI-only release.



A seller/product management model is realistic for a marketplace: seller tooling can include product creation, variants, pricing, inventory, promotions and filtering.



\---



\# 128. Seller Dashboard



Route:



`/seller`



Show:



\* Sales

\* Orders

\* Products

\* Revenue

\* Inventory

\* Top products

\* Alerts



\---



\# 129. Seller Products



Route:



`/seller/products`



Show:



\* Product table

\* Search

\* Filters

\* Stock

\* Price

\* Status



\---



\# 130. Seller Product Creation



Route:



`/seller/products/new`



Show:



\* Category

\* Product

\* Variant

\* Warranty

\* Price

\* Stock

\* Images



\---



\# 131. Seller Orders



Route:



`/seller/orders`



Show:



\* Orders

\* Customer

\* Product

\* Amount

\* Status

\* Date



\---



\# 132. Seller Promotions



Route:



`/seller/promotions`



Show:



\* Active promotions

\* Eligible products

\* Discount

\* Duration



\---



\# 133. Seller Reports



Route:



`/seller/reports`



Show:



\* Sales

\* Products

\* Revenue

\* Performance



\---



\# 134. Error Pages



Implement proper UI for:



`404`



Not found.



Show:



\* Illustration

\* Message

\* Back

\* Homepage

\* Search



\---



\# 135. Server Error



`500`



Show:



\* Error message

\* Retry

\* Homepage



\---



\# 136. Unauthorized



`401`



Show:



\* Login CTA

\* Back



\---



\# 137. Forbidden



`403`



Show:



\* Access denied

\* Return to dashboard/home



\---



\# 138. Maintenance



`/maintenance`



Show:



\* Maintenance message

\* Expected return information

\* Support contact



\---



\# 139. Loading States



Every data-heavy UI should have loading states.



Examples:



\* Product skeleton

\* Product detail skeleton

\* Category skeleton

\* Dashboard skeleton

\* Table skeleton

\* Blog skeleton



Do not use a single generic loading spinner everywhere.



\---



\# 140. Empty States



Design specific empty states for:



\* Cart

\* Wishlist

\* Orders

\* Notifications

\* Reviews

\* Questions

\* Search

\* Compare

\* Blog

\* Admin tables

\* Seller products



Each should have:



\* Explanation

\* Relevant illustration/icon

\* Primary action



\---



\# 141. Error States



Components should support:



\* Inline error

\* Form validation error

\* API-like error mock

\* Retry

\* Empty fallback



\---



\# 142. Product Card States



Product cards must support:



```text

Default

Hover

Focus

Discount

Out of stock

Low stock

New

Best seller

Sponsored

Selected

Compare selected

Wishlist active

Loading

```



\---



\# 143. Button States



All interactive buttons:



```text

Default

Hover

Focus

Active

Disabled

Loading

Success

Error

```



where applicable.



\---



\# 144. Form States



All forms:



```text

Default

Focus

Filled

Error

Disabled

Loading

Success

```



\---



\# 145. Responsive Requirements



Every route must be checked at:



\* 320px

\* 360px

\* 390px

\* 430px

\* 768px

\* 1024px

\* 1280px

\* 1440px

\* 1920px



Do not simply scale desktop.



Layouts should intentionally adapt.



\---



\# 146. Mobile Product Listing



On mobile:



\* Filter opens drawer/sheet

\* Sorting remains accessible

\* Product grid uses 2 columns where appropriate

\* Product cards reduce secondary information

\* No horizontal overflow



\---



\# 147. Mobile Product Detail



Mobile:



\* Gallery first

\* Product identity

\* Price

\* Variant

\* Purchase CTA

\* Sticky bottom purchase action where appropriate

\* Specifications

\* Reviews

\* Related products



\---



\# 148. Mobile Checkout



Checkout must prioritize:



\* One-column layout

\* Clear step progression

\* Sticky/visible total

\* Large touch targets

\* Easy address selection



\---



\# 149. Mobile Dashboard



Customer dashboard should become:



\* Compact header

\* Cards

\* List sections

\* Bottom/side navigation as appropriate



Do not squeeze desktop tables onto mobile.



\---



\# 150. Desktop Dashboard



Admin dashboard may use:



\* Sidebar

\* Top bar

\* Content area

\* Tables

\* Charts

\* Cards



\---



\# 151. Accessibility



All pages must support:



\* Keyboard navigation

\* Visible focus

\* Semantic HTML

\* Labels

\* Accessible dialogs

\* Accessible menus

\* Accessible forms

\* Sufficient touch targets

\* Screen-reader-friendly structure

\* Correct heading hierarchy



\---



\# 152. SEO UI Requirements



Public pages should have appropriate:



\* Page titles

\* Meta descriptions

\* Canonical URLs

\* Semantic headings

\* Breadcrumbs

\* Product structured-data-ready UI

\* Article structured-data-ready UI



Actual SEO metadata implementation belongs to the application layer but the page structure must support it.



\---



\# 153. Navigation Requirements



Every major page must be reachable through logical navigation.



Avoid orphan pages.



Use:



\* Header

\* Mega menu

\* Breadcrumb

\* Footer

\* Related links

\* Contextual links



\---



\# 154. Footer



Footer sections:



\### Shop



\* All products

\* Categories

\* Brands

\* Offers



\### Customer Service



\* Contact

\* FAQ

\* Shipping

\* Returns

\* Warranty



\### Information



\* About

\* Blog

\* Buying guides

\* Reviews



\### Legal



\* Terms

\* Privacy

\* Conditions



\### Social



\* Social links



\### Trust



\* Trust badges / payment information



\---



\# 155. Breadcrumbs



Use breadcrumbs on:



\* Category

\* Subcategory

\* Product

\* Brand

\* Blog

\* Buying guide

\* Account detail

\* Support pages



RTL order must be correct.



\---



\# 156. Pagination



Use pagination for:



\* Product listing

\* Search

\* Blog

\* Orders

\* Admin tables

\* Reviews



Mobile pagination should remain usable.



\---



\# 157. Filters



Desktop:



Sidebar/filter panel.



Mobile:



Drawer/sheet.



Common filters:



\* Price

\* Brand

\* Rating

\* Availability

\* Discount

\* Category-specific technical attributes



Filters should support:



\* Apply

\* Clear

\* Selected filter chips



\---



\# 158. Sorting



Use consistent sorting control.



Options:



\* Newest

\* Popular

\* Best selling

\* Price low to high

\* Price high to low

\* Highest rated

\* Highest discount



\---



\# 159. Global Search UX



Search must be one of the strongest global interactions.



Support:



\* Suggestions

\* Products

\* Brands

\* Categories

\* Recent searches

\* Popular searches

\* No results

\* Search results



\---



\# 160. Global UI Components



Build reusable components for:



```text

Button

Input

Select

Checkbox

Radio

Switch

Badge

Card

Dialog

Drawer

Dropdown

Tooltip

Tabs

Accordion

Pagination

Breadcrumb

Toast

Alert

Skeleton

Avatar

Rating

Price

ProductCard

ProductGrid

ProductGallery

ProductSpecifications

ProductReviews

ProductQuestions

FilterPanel

SortControl

Search

SearchSuggestions

Header

MegaMenu

Footer

SectionHeader

EmptyState

ErrorState

LoadingState

```



\---



\# 161. Design System Components



Create a central design-system page for development verification.



Route:



`/design-system`



Show:



\* Colors

\* Typography

\* Buttons

\* Inputs

\* Cards

\* Badges

\* Dialogs

\* Dropdowns

\* Tabs

\* Tables

\* Product cards

\* Product gallery

\* Forms

\* States



This route is for development/QA and can be excluded from public navigation.



\---



\# 162. Mock Data Architecture



Centralize mock data.



Separate:



```text

products

categories

brands

reviews

questions

orders

customers

blog posts

coupons

campaigns

notifications

```



Do not hard-code large datasets directly inside pages.



\---



\# 163. Product Data



Products should include realistic:



```text

id

slug

name

brand

category

subcategory

images

price

originalPrice

discount

rating

reviewCount

stock

status

variants

specifications

features

description

seller

warranty

shipping

tags

```



\---



\# 164. Technical Specification Data



Specifications must be category-aware.



Example:



Mobile:



```text

Display

Processor

RAM

Storage

Camera

Battery

Operating System

Connectivity

Dimensions

Weight

```



Laptop:



```text

CPU

GPU

RAM

Storage

Display

Refresh Rate

Battery

Ports

Weight

Operating System

```



Headphones:



```text

Type

Driver

ANC

Battery

Bluetooth

Codec

Microphone

Weight

```



\---



\# 165. UI-Only Commerce Rules



The UI may simulate:



\* Adding to cart

\* Removing from cart

\* Wishlist

\* Compare

\* Quantity

\* Coupon

\* Checkout steps

\* Order status

\* Notifications



But these are frontend/mock interactions only.



Do not implement real commerce infrastructure.



\---



\# 166. Do Not Build



Do NOT implement:



\* Database

\* API

\* Payment gateway

\* Real authentication

\* Real shipping

\* Real email

\* Real SMS

\* Real inventory

\* Real seller backend

\* Real analytics

\* Real order processing



\---



\# 167. Architecture Requirements



The project must be structured so future development is easy.



Prefer a clear structure such as:



```text

src/

├── app/

├── components/

│   ├── ui/

│   ├── layout/

│   ├── product/

│   ├── catalog/

│   ├── cart/

│   ├── checkout/

│   ├── account/

│   ├── blog/

│   ├── admin/

│   └── shared/

├── data/

├── lib/

├── store/

├── types/

└── config/

```



Do not create unnecessary abstraction layers.



\---



\# 168. Feature Separation



Where appropriate, organize components by feature.



Example:



```text

components/product/

components/catalog/

components/cart/

components/checkout/

components/account/

components/blog/

components/admin/

```



Shared primitives belong in:



```text

components/ui/

```



\---



\# 169. Client Components



Use Client Components only where interaction requires them.



Examples:



\* Cart state

\* Wishlist

\* Compare

\* Interactive filters

\* Search suggestions

\* Dialogs

\* Drawers

\* Carousels

\* Form interactions



Do not turn entire pages into Client Components unnecessarily.



\---



\# 170. Server Components



Prefer Server Components for:



\* Static content

\* Product presentation

\* Category content

\* Blog content

\* SEO-oriented pages



\---



\# 171. State Management



Use local React state for local UI.



Use Zustand only for genuinely shared client state such as:



\* Cart

\* Wishlist

\* Compare

\* Recently viewed



Do not put every UI state in Zustand.



\---



\# 172. Validation



Use Zod for UI form schemas where appropriate.



Examples:



\* Login

\* Register

\* Address

\* Contact

\* Checkout

\* Admin forms



\---



\# 173. UI/UX Quality Standard



Before considering the project complete, inspect:



\* Every route

\* Every major component

\* Every responsive breakpoint

\* RTL

\* Typography

\* Light mode

\* Accessibility

\* Empty states

\* Error states

\* Loading states

\* Hover states

\* Focus states

\* Product cards

\* Product details

\* Cart

\* Checkout

\* Account

\* Blog

\* Admin



\---



\# 174. Final Route Map



The main route map should include at minimum:



```text

/

&#x20;/products

&#x20;/category/\[slug]

&#x20;/category/\[category]/\[subcategory]

&#x20;/search

&#x20;/brands

&#x20;/brand/\[slug]

&#x20;/collections

&#x20;/collections/\[slug]

&#x20;/sale

&#x20;/deals



&#x20;/product/\[slug]

&#x20;/compare

&#x20;/wishlist

&#x20;/cart

&#x20;/checkout

&#x20;/checkout/success

&#x20;/checkout/cancelled



&#x20;/login

&#x20;/register

&#x20;/verify

&#x20;/forgot-password

&#x20;/reset-password



&#x20;/account

&#x20;/account/orders

&#x20;/account/orders/\[id]

&#x20;/account/orders/\[id]/tracking

&#x20;/account/returns

&#x20;/account/returns/new

&#x20;/account/addresses

&#x20;/account/profile

&#x20;/account/security

&#x20;/account/notifications

&#x20;/account/wallet

&#x20;/account/coupons

&#x20;/account/reviews

&#x20;/account/questions

&#x20;/account/recently-viewed



&#x20;/support

&#x20;/faq

&#x20;/shipping

&#x20;/returns

&#x20;/warranty

&#x20;/payment

&#x20;/contact

&#x20;/about

&#x20;/stores



&#x20;/blog

&#x20;/blog/category/\[slug]

&#x20;/blog/\[slug]

&#x20;/buying-guide

&#x20;/buying-guide/\[slug]

&#x20;/reviews

&#x20;/reviews/\[slug]

&#x20;/glossary

&#x20;/glossary/\[slug]



&#x20;/landing/\[slug]



&#x20;/terms

&#x20;/privacy

&#x20;/conditions

&#x20;/cookie-policy



&#x20;/notifications



&#x20;/admin

&#x20;/admin/orders

&#x20;/admin/orders/\[id]

&#x20;/admin/products

&#x20;/admin/products/new

&#x20;/admin/products/\[id]/edit

&#x20;/admin/categories

&#x20;/admin/brands

&#x20;/admin/inventory

&#x20;/admin/customers

&#x20;/admin/customers/\[id]

&#x20;/admin/discounts

&#x20;/admin/campaigns

&#x20;/admin/reviews

&#x20;/admin/questions

&#x20;/admin/blog

&#x20;/admin/blog/new

&#x20;/admin/blog/\[id]/edit

&#x20;/admin/media

&#x20;/admin/support

&#x20;/admin/support/\[id]

&#x20;/admin/notifications

&#x20;/admin/settings

&#x20;/admin/profile

&#x20;/admin/roles

&#x20;/admin/analytics

&#x20;/admin/seo

&#x20;/admin/activity



&#x20;/design-system



&#x20;/404

&#x20;/500

&#x20;/401

&#x20;/403

&#x20;/maintenance

```



\---



\# 175. Priority



Not every page has the same implementation priority.



\## Phase 1 — Core Store



```text

/

&#x20;/products

&#x20;/category/\[slug]

&#x20;/search

&#x20;/product/\[slug]

&#x20;/compare

&#x20;/wishlist

&#x20;/cart

&#x20;/checkout

&#x20;/checkout/success

```



\## Phase 2 — Customer



```text

/login

/register

/verify

/account

/account/orders

/account/orders/\[id]

/account/addresses

/account/profile

/account/notifications

/account/wishlist

```



\## Phase 3 — Discovery



```text

/brands

/brand/\[slug]

/collections

/collections/\[slug]

/sale

/deals

/buying-guide

/reviews

```



\## Phase 4 — Content



```text

/blog

/blog/category/\[slug]

/blog/\[slug]

/buying-guide/\[slug]

/reviews/\[slug]

/glossary

/glossary/\[slug]

```



\## Phase 5 — Support / Information



```text

/support

/faq

/shipping

/returns

/warranty

/payment

/contact

/about

/stores

```



\## Phase 6 — Admin



```text

/admin

/admin/orders

/admin/products

/admin/categories

/admin/brands

/admin/inventory

/admin/customers

/admin/discounts

/admin/campaigns

/admin/reviews

/admin/questions

/admin/blog

/admin/media

/admin/support

/admin/notifications

/admin/settings

/admin/roles

/admin/analytics

/admin/seo

/admin/activity

```



\---



\# 176. Final Requirement



This project must feel like a complete digital electronics commerce product, not a collection of disconnected UI screens.



The customer journey must work visually:



```text

Homepage

↓

Category

↓

Product Listing

↓

Product Detail

↓

Compare / Wishlist

↓

Cart

↓

Checkout

↓

Order Success

↓

Account

↓

Order Tracking

```



The discovery journey must also work:



```text

Homepage

↓

Search

↓

Brand / Category

↓

Product

↓

Related Product

↓

Compare

```



The content journey:



```text

Homepage

↓

Blog

↓

Buying Guide

↓

Product

```



The support journey:



```text

Order

↓

Support

↓

FAQ / Shipping / Return

↓

Contact

```



The administration journey:



```text

Admin Dashboard

↓

Products / Orders / Customers / Inventory

↓

Content / Campaigns / Reviews

↓

Analytics / Settings

```



The final result must be a complete, coherent, responsive Persian RTL electronics e-commerce UI.



Do not omit pages simply because they are not immediately required for the homepage.



Do not create unnecessary pages that do not serve a clear user, commerce, content, support, or administration purpose.



Use realistic mock data.



Keep all functionality UI-only.



Follow `BRAND\_GUIDELINES.md` for visual decisions.



Follow this document for product/page scope.



Do not redesign or reinterpret the scope without explicit instruction.

