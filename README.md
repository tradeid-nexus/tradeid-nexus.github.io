# TradeID Nexus

Verdipapir-oppslag for backoffice, compliance og analysts. TradeID Nexus oversetter mellom ISIN, SEDOL, CUSIP, ticker og “plain language”-navn slik at både handel og etterkontroll slipper å slå opp samme papir i fem ulike systemer.

## Problem
- Backoffice får oftest kun en kode (ISIN/SEDOL/CUSIP) når transaksjoner skal registreres.
- Tradere foretrekker navn eller ticker, og statistikk-teamene lagrer data i egne identifikatorer.
- Det finnes ingen enkel “oversetter” for å mappe mellom kode-sett og navn uten dyre terminalsøk eller manuelle Excel-lister.

## Løsning (MVP)
- Søkefelt hvor man kan lime inn hvilken som helst identifikator og få ut komplett profil (navn, ticker, land, aktiv klasse, tilknyttede ID-er).
- Cache-lag for hyppige oppslag; fallback til eksterne API (OpenFIGI, Bloomberg-alternativer) med rate-styring.
- Eksport som CSV/JSON for rask deling inn i andre systemer.
- Versjonering av mappinger slik at endringer i instrumentdata kan spores.

## Brukere
- **Backoffice / Middle office:** Behov for å validere koder før avstemming.
- **Compliance / Risk:** Må koble transaksjoner til riktige instrumenter i sanntid.
- **Analytikere:** Importerer data fra flere kilder og trenger konsistent nøkkelsett.

## Arkitektur
- Next.js (App Router) med TypeScript.
- Edge API routes for søk/oppslag (kan deployes til Vercel/Cloudflare).
- Redis/PostgreSQL som cache og “golden source”-lagring.
- Integrasjonslag for eksterne registre (OpenFIGI, Refinitiv, Euronext).

```
app/
  page.tsx          – midlertidig landing/POC
  api/lookup/route  – REST-endepunkt for kodeoppslag (planlagt)
lib/
  providers/        – adaptere mot eksterne API-er
  parsers/          – normalisering, validering av koder
```

## Status
- Repo er bootstrapet med Next.js; ingen domenelogikk implementert ennå.
- Behovsavklaring tydelig: “kode-oversetter” for verdipapirer.
- Neste steg er å spesifisere datakontrakt (`LookupRequest`, `InstrumentProfile`) og prototyp API-kall mot OpenFIGI.

## Marked og konkurrenter
- **Ayondo – ISIN to CUSIP Wizard:** Enkel webwizard som oversetter ISIN→CUSIP, men dekker ikke øvrige koder eller metadata.
- **ISIN.net – Convert ISIN to CUSIP:** Betalt tjeneste for konvertering én vei; lite fokus på helhetlig lookup og integrasjon.
- **ISINdb.com / isin.com:** Databaser med manuell input (velg land + kode). Mangler API, historikk og flere kodeformater i ett oppslag.
- **ISIN.org (International Securities Identification Numbers Organization):** Tilbyr betalt CUSIP↔ISIN-konvertering, men begrenset fleksibilitet og ingen automatisert integrasjon.
- **Datastream/Refinitiv workflows (libanswers m.fl.):** Løses ofte via kostbare terminalsøk; komplisert for støttefunksjoner uten lisens.
- **Investopedia m.fl.:** Informasjonsartikler – peker på behovet, men ingen praktisk løsning.
- Felles gap: ingen gir helhetlig “multi-code lookup” med API, cache og audit trail; TradeID Nexus sikter på å dekke hele verdikjeden.

## Neste milepæler
1. **Funksjonell skisse:** Skissere UI for søk + resultattabell (Figma eller enkel wireframe).
2. **API-integrasjon:** Lage første utgave av `api/lookup` som henter fra OpenFIGI.
3. **Cache-strategi:** Definere schema for PostgreSQL eller Supabase og legge til rate-limit.
4. **Alpha-test:** Invitere 2–3 backoffice-brukere til å teste lookup og gi feedback.
