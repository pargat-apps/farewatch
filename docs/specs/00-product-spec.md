# Product Spec — FareWatch

Status: current · Scope: frontend-only build with simulated data

## What it is

FareWatch is a flight **metasearch and price-alert** app. It does not sell
tickets. It finds a fare, shows what every supported seller charges for it, lets
the user name the price they are willing to pay, watches for that price, and then
hands the user off to whichever seller wins.

The distinction from a booking site matters for every screen: FareWatch's product
surface is *the comparison and the wait*, not the checkout.

## The problem

The same itinerary sells for materially different prices depending on where you
buy it — the airline's own site, Expedia, Trip.com, CheapOair. Those prices also
move day to day. A traveller who wants the best price has to check several sites
repeatedly over weeks, and still has no idea whether today's price is good.

## Core loop

1. **Search** — origin, destination, dates, travellers, cabin.
2. **Compare** — for a chosen itinerary, every seller's price side by side, with
   what each price actually includes (bags, fare flexibility, currency conversion).
3. **Track** — set a maximum budget for the route.
4. **Get alerted** — when a qualifying fare hits the target, notify.
5. **Choose where to book** — hand off to the selected provider.

Steps 3–5 are the differentiator. Steps 1–2 are table stakes that must not be worse
than the alternatives.

## Users

**Primary — the flexible-date leisure traveller.** Booking 2–6 months out for a
trip they've already decided to take. Price-sensitive, not time-sensitive.
Willing to wait weeks for a better fare. Typically shopping long-haul routes
(YYZ→DEL, YYZ→LHR) where the spread between sellers is largest — hundreds of
dollars, not tens.

**Secondary — the returning route-watcher.** Flies the same route repeatedly
(visiting family, a second home). Cares about saved searches and whether today's
price is good *relative to this route's history*, not in absolute terms.

**Explicitly not the target:** business travellers booking inside two weeks, and
anyone who needs to book right now. If the answer is "buy today", FareWatch has
little to offer them.

## Feature set

### Search
- Round trip, one way, multi-city
- Airport picker with recent, nearby, and popular sections; typeahead across
  airports by code, city, and airport name
- Date selection with a calendar; flexible-date awareness
- Travellers (adults, children, infants) and cabin class
- Swap origin/destination

### Results
- Itinerary list with airline, times, duration, stops, and a "from" price
- Badges: Cheapest, Best value, Fastest — at most one per itinerary
- Sort: best, cheapest, fastest, earliest departure, latest departure
- Filter: max price, stops, airlines, booking-option type (airline direct vs
  travel sites), baggage inclusion
- A cheapest-providers preview inline on the card, so comparison starts before
  the user commits to a tap
- Honest empty state when filters exclude everything

### Compare (the centrepiece)
For one itinerary, every seller with:
- Price, and the delta versus the cheapest
- **Airline direct** vs **travel site** labelling — never blurred
- Baggage: carry-on and checked, included or extra
- Fare notes (e.g. a flexible fare available at a higher price)
- Currency conversion disclosure when the seller charges in another currency
- Sponsored placement, **visibly marked**
- Freshness ("checked 2 min ago")
- Unavailable sellers shown as unavailable, not hidden

Also: multi-itinerary comparison, for weighing two or three flights against
each other rather than sellers of one flight.

### Track
- Target price per route, in the user's currency
- Alert scope: any provider, airline-direct only, or a chosen set of providers
- Constraints carried from search: stops, cabin, dates
- Delivery channels: email, browser notification
- Price history for the tracked route, with the target drawn on it

### Alerts dashboard
- Active, paused, and expired alerts
- Current best price, which seller has it, the airline-direct price, distance to
  target, and last-checked time
- Pause, resume, edit, delete
- "Close to your target" promotion on the dashboard

### Notifications
- Target reached, price drop, provider changed, itinerary no longer available
- Grouped Today / Earlier, read and unread, clear all

### Account
- Sign in, create account, forgot password
- Profile: home airport, currency, preferred cabin, preferred airlines, timezone
- Saved searches, tracking or not

## Product principles

**Never hide a price.** Sponsored placement is allowed and must be labelled.
Reordering results to favour a paying seller is not.

**The airline's own price is always visible.** Users must be able to see what the
carrier charges directly, even when a travel site is cheaper — because "cheaper"
often means worse baggage or worse change rules.

**A price without its conditions is a lie.** Every price shows baggage and, where
relevant, the currency it was converted from.

**Stale prices are labelled stale.** Every price carries a freshness stamp. A
price we cannot verify is marked unverified, never presented as current.

**The target price is the user's, not ours.** We do not nudge it upward, and we
do not alert on "close enough". Purple in the UI means the user's number and
nothing else.

**Waiting is the product.** Empty states, paused alerts, and "no change yet" are
first-class screens, not afterthoughts.

## What "done" means for this build

This is a **frontend-only build with simulated data**. Done means:

- Every screen is driven by generated data flowing through the service layer,
  not by hardcoded fixtures
- Prices move over time, and alerts fire when a moving price crosses a target
- Data survives a page refresh
- Sign-in gates the account areas and the session persists
- Loading, error, and empty states are real states, not separate mock screens
- The whole thing works at 390px

**Out of scope for now:** real flight data, real payments, real email or push
delivery, and a server of any kind. Real booking is a hand-off link — FareWatch
never takes payment.

## Success measures (for a real deployment, recorded now)

- Median saving versus the airline-direct price on tracked routes
- Share of alerts that reach their target before the departure date
- Time from target-reached notification to provider hand-off
- Return rate of route-watchers over a 90-day window
