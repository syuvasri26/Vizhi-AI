# Coimbatore Night-Safety & Civic Transit Navigator (Vizhi)

A progressive, real-time safety navigation web application specifically engineered for the city of Coimbatore, Tamil Nadu. The app integrates Google Maps Platform (with Live Traffic and Advanced Markers), OpenStreetMap civic amenities, predictive risk routing, streetlight fault tracking, and offline base map caching.

---

## 🌟 Key Features

1. **Real Google Maps Platform Integration**:
   - Official `@vis.gl/react-google-maps` integration with vector Roadmap, Satellite, and Terrain views.
   - Live traffic layer (`TrafficLayer`) for Coimbatore arterial highways (Avinashi Rd, Trichy Rd, Sathy Rd, Mettupalayam Rd).
   - High-performance `AdvancedMarkerElement` pins for hospitals, police stations, active routes, and streetlight poles.

2. **Smart Night-Safety Routing Algorithm**:
   - Dynamic pathfinding factoring in streetlight operational rates, emergency facility proximity, and live civic reports.
   - Safety risk scoring (Low, Moderate, Caution) with glowing visual halos and step-by-step navigation cues.

3. **Civic & Infrastructure Tracking**:
   - 100+ mapped streetlight poles across Coimbatore Corporation wards with fault reporting and audit trails.
   - 24/7 verified emergency medical and law enforcement facilities with quick-dial phone links.

4. **Offline Base Map Tile Caching**:
   - Persistent Cache API storage (`vizhi-offline-tiles-v1`) for zero-connectivity zones.
   - Pre-packaged tile downloads for Gandhipuram, Peelamedu, RS Puram, Town Hall, Saravanampatti, Singanallur, and Saibaba Colony.

5. **Citizen Reporting & Admin Portal**:
   - Geo-tagged incident and dark spot submissions with photo evidence attachment support.
   - Ward-level analytics, CSV data export, and simulated navigation tracking.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** / **yarn** / **pnpm**

### Installation

```bash
# 1. Clone or extract the project files
cd coimbatore-safety-map

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional - default demo key is included)
cp .env.example .env

# 4. Start local development server
npm run dev
```

Visit `http://localhost:3000` in your web browser.

---

## 🛠️ Build & Production

```bash
# Typecheck and build optimized static assets
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
├── public/                 # Static assets, icons, and downloadable project bundle
│   ├── favicon.svg
│   └── coimbatore-safety-map-project.zip
├── src/
│   ├── components/         # React UI & Map components
│   │   ├── GoogleMapView.tsx       # Real Google Maps Platform component
│   │   ├── MapView.tsx             # Hybrid switcher & Leaflet map component
│   │   ├── SafetyMapExplorer.tsx   # Comprehensive civic & facility explorer
│   │   ├── OfflineMapsModal.tsx    # Offline tile manager & storage monitor
│   │   ├── RouteCard.tsx           # Route option card & safety breakdown
│   │   ├── CitizenReportModal.tsx  # Incident reporting form
│   │   ├── AdminDashboardModal.tsx # Civic administration & telemetry
│   │   └── Navbar.tsx              # Top navigation bar & tools
│   ├── context/
│   │   └── AppContext.tsx          # Central application state & persistence
│   ├── data/
│   │   └── coimbatoreData.ts       # Coimbatore coordinates, routes, wards & facilities
│   ├── services/
│   │   └── offlineTileService.ts   # Cache API tile download & fetch interceptor
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces and data models
│   ├── App.tsx             # Root application orchestrator
│   ├── main.tsx            # Vite React entrypoint
│   └── index.css           # Tailwind CSS directives & custom styles
├── server.ts               # Optional Express backend proxy
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies & scripts
```

---

## 🔑 Environment Variables

The project uses the following environment variables (stored in `.env`):

| Variable | Description |
| :--- | :--- |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps Platform API key (supports Roadmap, Satellite, Traffic, and Advanced Markers). |
| `PORT` | Local dev server port (defaults to 3000). |
