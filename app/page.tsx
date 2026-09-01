'use client';

import { useMemo, useState } from 'react';

const products = [
  { id: 1, sku: '1810', brand: 'Caiman', name: 'Premium Cow Grain MIG / Stick Welding Gloves', type: 'Welding gloves', category: 'Welding', price: 29.48, badge: 'Best seller', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=85' },
  { id: 2, sku: '280-HP1491RV', brand: 'PIP', name: 'Traverse Type II Vented Industrial Climbing Helmet', type: 'Safety helmet', category: 'Head protection', price: 94.25, badge: 'New', delivery: 'Ready for pickup', availability: 'In stock', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=85' },
  { id: 3, sku: '250-14-0520', brand: 'Bouton', name: 'Zenon Ultra-Lyte Clear Anti-Fog Safety Glasses', type: 'Safety glasses', category: 'Eye protection', price: 8.86, badge: 'In stock', delivery: 'Arrives tomorrow', availability: 'In stock', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=85' },
  { id: 4, sku: '16-381', brand: 'G-Tek', name: 'Paradox A8 21-Gauge Cut-Resistant Touchscreen Gloves', type: 'Cut-resistant gloves', category: 'Hand protection', price: 18.72, badge: 'Top rated', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=700&q=85' },
  { id: 5, sku: '5906', brand: 'Fibre-Metal', name: 'Tigerhood Classic Thermoplastic Lift-Front Welding Helmet', type: 'Welding helmet', category: 'Welding', price: 79.95, badge: 'Contract favorite', delivery: '2–3 business days', availability: 'Limited stock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=85' },
  { id: 6, sku: '267-HPF210C', brand: 'PIP', name: 'Mega Bullet Corded Foam Ear Plugs, NRR 32', type: 'Ear plugs', category: 'Hearing protection', price: 31.20, badge: 'Case pack', delivery: 'Arrives tomorrow', availability: 'In stock', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { id: 7, sku: '34-840', brand: 'G-Tek', name: 'Premium Foam Nitrile Touchscreen Work Gloves', type: 'Coated work gloves', category: 'Hand protection', price: 8.45, badge: 'Popular', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=700&q=85' },
  { id: 8, sku: '34-874', brand: 'ATG', name: 'MaxiFlex Ultimate MicroFoam Nitrile Touchscreen Gloves', type: 'Coated work gloves', category: 'Hand protection', price: 9.92, badge: 'Top rated', delivery: 'Arrives tomorrow', availability: 'In stock', image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=700&q=85' },
  { id: 9, sku: '44-5745E', brand: 'ATG', name: 'MaxiCut Ultra A5 Cut-Resistant Touchscreen Gloves', type: 'Cut-resistant gloves', category: 'Hand protection', price: 17.60, badge: 'A5 protection', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=700&q=85' },
  { id: 10, sku: 'S8510', brand: 'UVEX', name: 'Bionic Polycarbonate Faceshield System', type: 'Face shield', category: 'Eye protection', price: 43.80, badge: 'Jobsite ready', delivery: '2–3 business days', availability: 'In stock', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=85' },
  { id: 11, sku: 'N10R', brand: 'North', name: 'Zone Type I Cap-Style Hard Hat with Wheel Ratchet', type: 'Hard hat', category: 'Head protection', price: 22.90, badge: 'Everyday value', delivery: 'Ready for pickup', availability: 'In stock', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=85' },
  { id: 12, sku: '1485', brand: 'Caiman', name: 'Elk Grain MIG / Stick Welder Gloves with FR Wool Back', type: 'Welding gloves', category: 'Welding', price: 38.25, badge: 'Premium leather', delivery: 'Arrives tomorrow', availability: 'In stock', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=85' },
  { id: 13, sku: '3029', brand: 'Caiman', name: '30-Inch Black Boarhide Welding Coat', type: 'Welding jacket', category: 'Welding', price: 189.00, badge: 'Heavy duty', delivery: '3–5 business days', availability: 'Limited stock', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=85' },
  { id: 14, sku: '7050', brand: 'Ironcat', name: 'FR-Treated Cotton Sateen Welding Jacket', type: 'Welding jacket', category: 'Welding', price: 54.75, badge: 'Shop essential', delivery: '2–3 business days', availability: 'In stock', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=85' },
  { id: 15, sku: '5400W', brand: 'North', name: '5400 Series Full-Facepiece Welding Respirator Attachment', type: 'Respirator', category: 'Respiratory protection', price: 164.50, badge: 'Specialty PPE', delivery: '3–5 business days', availability: 'Limited stock', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { id: 16, sku: '7580P100', brand: 'North', name: 'P100 Respirator Filters, 2-Pack', type: 'Respirator filters', category: 'Respiratory protection', price: 18.95, badge: '2-pack', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { id: 17, sku: '272-RPRF8820', brand: 'JSP', name: 'Force Typhoon 8 Half-Mask Respirator, Medium', type: 'Respirator', category: 'Respiratory protection', price: 34.60, badge: 'Reusable', delivery: 'Arrives tomorrow', availability: 'In stock', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { id: 18, sku: '630655-400', brand: 'PUMA Safety', name: 'Conquest Brown CTX High Composite-Toe Safety Boots', type: 'Safety boots', category: 'Foot protection', price: 184.95, badge: 'Waterproof', delivery: '3–5 business days', availability: 'In stock', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85' },
  { id: 19, sku: '32-000200-0000', brand: 'Fendall', name: 'Porta Stream II 16-Gallon Portable Eyewash Station', type: 'Eyewash station', category: 'First aid', price: 389.00, badge: 'Facility safety', delivery: '5–7 business days', availability: 'Limited stock', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { id: 20, sku: 'ICEMIX-SF', brand: 'THORZT', name: 'Sugar-Free Electrolyte Freeze Shots, Mixed Flavor Pack', type: 'Hydration', category: 'Heat stress', price: 42.40, badge: 'Seasonal', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1606206873764-fd15e242df52?auto=format&fit=crop&w=700&q=85' },
];
// Verified product photography keyed by catalog SKU. Keeping this separate makes it
// difficult for a generic category photo to be paired with the wrong product again.
const productImages: Record<string, string> = {
  '1810': 'https://cdn11.bigcommerce.com/s-y180xghw1r/images/stencil/1280x1280/products/40726/57043/1810A__67209.1723570718.jpg?c=1',
  '280-HP1491RV': 'https://flare.fullsource.com/images/items/b/raw/PIP-280-HP1491RVM-08-B.jpg',
  '250-14-0520': 'https://empirerigging.com/media/catalog/product/b/o/bouton-250-14-0520.jpg?height=700&image-type=image&store=empire&width=700',
  '16-381': 'https://us.pipglobal.com/archive/pim/1200/36/16-381-Industrial.jpg',
  '5906': 'https://www.airgas.com/medias/CM-000000A852-Product-HON5906GY-1200Wx1200H?context=bWFzdGVyfHByb2R1Y3R8MzU1NTc1fGltYWdlL2pwZWd8cHJvZHVjdC9oNDcvaDcyLzExNTI5OTMyMzc0MDQ2LmpwZ3xkNGMxMTg0MWRmODNmNTU4ODE2ZmRjOTk4NjRiY2MzODA3ZmNlNThjZTNmY2M0ZDk3MmYwMWFkZWRmYWI2ODM3',
  '267-HPF210C': 'https://flare.fullsource.com/images/items/b/raw/PIP-267-HPF210D-B.jpg',
  '34-840': 'https://us.pipglobal.com/archive/pim/1200/36/34-840-Standard-Industrial.jpg',
  '34-874': 'https://gpsgloves.com/cdn/shop/files/GP-34-874_2.png?v=1754508091',
  '44-5745E': 'https://www.safetygloves.co.uk/user/products/large/maxicut-ultra-44-5745e-level-e-cut-resistant-palm-coated-grip-gloves-2026-2-web.jpg',
  'S8510': 'https://www.magidglove.com/media/catalog/product/S/8/S8510_HERO.jpg?bg-color=255%2C255%2C255&fit=bounds&optimize=high',
  'N10R': 'https://cdn11.bigcommerce.com/s-u3hf7jh4/images/stencil/1280x1280/products/738216/1110225/honeywell-north-zone-hard-hat-ratchet-cap-style-n10r010000-white__18635.1683551744.jpg?c=2',
  '1485': 'https://flare.fullsource.com/images/items/b/raw/PIP-1485-B.jpg',
  '3029': 'https://cdn11.bigcommerce.com/s-8dmsu240r2/images/stencil/1280x1280/products/1112/1972/3029__25560.1752951178.jpg?c=1&imbypass=on',
  '7050': 'https://us.pipglobal.com/archive/pim/1200/6/7050-FRONT-2500x2500.jpg',
  '5400W': 'https://distribuidoresidp.cl/cdn/shop/products/04-02-199-F1-1300.jpg?v=1686441220',
  '7580P100': 'https://i0.wp.com/ppeo.com/wp-content/uploads/2023/07/Honeywell-North-7580P100.png?fit=600%2C600&ssl=1',
  '272-RPRF8820': 'https://us.pipglobal.com/archive/pim/1200/11/272-RPRF8820---NC.jpg',
  '630655-400': 'https://www.shoesensation.com/media/catalog/product/puma/puma-630655-conquestbrownctxhi-brown01.jpg?bg-color=255%2C255%2C255&fit=bounds&height=700&optimize=medium&width=700',
  '32-000200-0000': 'https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/62625/136872/Honeywell-Fendall-Porta-Stream-II-16-Gallon-Portable-Eyewash-Station__79591.1690469877.jpg',
  'ICEMIX-SF': 'https://flare.fullsource.com/images/items/a/raw/PIP-ICEMIX-SF-A1.jpg',
};

products.forEach(product => {
  product.image = `./products/${product.sku}.jpg`;
});

const categoryNav = ['Welding & Cutting', 'Industrial Gases', 'Safety & PPE', 'Tools & Abrasives', 'Fire Services'];

export default function Home() {
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState(0);
  const [clientNumber, setClientNumber] = useState('');
  const [category, setCategory] = useState('All');
  const [brand, setBrand] = useState('All');
  const [stockOnly, setStockOnly] = useState(false);
  const [sort, setSort] = useState('Recommended');
  const [showFilters, setShowFilters] = useState(false);
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible = useMemo(() => {
    let list = products.filter(p => {
      const haystack = `${p.name} ${p.type} ${p.category} ${p.brand} ${p.sku} ${p.delivery} ${p.availability}`.toLowerCase();
      return terms.every(t => haystack.includes(t)) && (category === 'All' || p.category === category) && (brand === 'All' || p.brand === brand) && (!stockOnly || p.availability === 'In stock');
    });
    if (sort === 'Price: Low') list = [...list].sort((a,b)=>a.price-b.price);
    if (sort === 'Price: High') list = [...list].sort((a,b)=>b.price-a.price);
    if (sort === 'Fastest delivery') list = [...list].sort((a,b)=>a.delivery.includes('today')?-1:b.delivery.includes('today')?1:0);
    return list;
  }, [query, category, brand, stockOnly, sort]);
  const suggestions = query ? products.filter(p => `${p.name} ${p.type} ${p.brand} ${p.sku}`.toLowerCase().includes(query.toLowerCase())).slice(0,4) : [];
  const pricing = clientNumber === '1111'
    ? { multiplier: .95, label: 'Business Plus', savings: '5% discount' }
    : clientNumber === '2222'
      ? { multiplier: .90, label: 'Corporate Program', savings: '10% discount' }
      : { multiplier: 1, label: clientNumber === '0000' ? 'Standard Pricing' : '', savings: '' };

  return <main>
    <div className="utility"><span>Serving the Inland & Pacific Northwest</span><span>Need help? <b>1-800-765-9055</b> · Find a branch</span></div>
    <header>
      <div className="brand"><img className="oxarc-logo" src="./oxarc-logo.png" alt="OXARC"/><small>Part of Meritus Gas Partners</small></div>
      <div className="search-wrap"><label className="search"><span>⌕</span><input aria-label="Search products" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search product, type, brand, model or part #"/><kbd>⌘ K</kbd></label>{suggestions.length>0&&<div className="suggestions"><b>PRODUCT SUGGESTIONS</b>{suggestions.map(p=><button key={p.id} onClick={()=>setQuery(p.sku)}><span>{p.name}<small>{p.brand} · Model {p.sku}</small></span><em>{p.delivery}</em></button>)}<button className="all-results">See all results for “{query}” →</button></div>}</div>
      <button className="account">◎ <span>Sign in<small>Account & pricing</small></span></button><button className="cart" onClick={()=>setCart(0)}>Cart <b>{cart}</b></button>
    </header>
    <nav><button>☰ All products</button>{categoryNav.map(x=><a key={x} href="#shop">{x}</a>)}<a href="#shop" className="quick">Quick order →</a></nav>
    <section className="hero"><div className="hero-copy"><div className="eyebrow"><i/> BUILT FOR THE PEOPLE WHO BUILD</div><h1>Your work doesn’t wait.<br/><em>Neither do we.</em></h1><p>Industrial gases, welding equipment and jobsite safety—backed by local experts and inventory you can count on.</p><div className="hero-actions"><button onClick={()=>document.getElementById('shop')?.scrollIntoView()}>Shop all products <span>→</span></button><a href="#expert">Talk to an expert</a></div><div className="proof"><span><b>20+</b> Northwest locations</span><span><b>70+</b> Years of expertise</span><span><b>50K+</b> Products available</span></div></div><div className="hero-visual"><img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=90" alt="Welder at work"/><div className="availability"><i>✓</i><span><b>Local stock. Fast delivery.</b><small>Order by 3 PM for next-day delivery</small></span></div></div></section>
    <section className="popular-categories"><div className="category-heading"><div><span className="kicker">START WITH WHAT YOU NEED</span><h2>Popular Product Categories</h2></div><a href="#shop">View all categories →</a></div><div className="category-grid"><button onClick={()=>setCategory('Welding')}><img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=300&q=80" alt="Welder at work"/><b>Welding & Cutting</b><small>Machines, torches, wire & consumables</small></button><button><img src="https://www.dsjsa.com.ar/resources/images/home/desktop/2_gases_industriales.jpg" alt="Industrial gas cylinders"/><b>Industrial Gases</b><small>Cylinders, bulk, medical & specialty</small></button><button onClick={()=>setCategory('Hand protection')}><img src="https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=300&q=80" alt="Industrial work gloves"/><b>Hand Protection</b><small>Work, cut-resistant & welding gloves</small></button><button onClick={()=>setCategory('Head protection')}><img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=300&q=80" alt="Worker wearing head protection"/><b>Head Protection</b><small>Hard hats, helmets & face shields</small></button><button onClick={()=>setCategory('Eye protection')}><img src="https://www.ismont.com.tr/UserFiles/Fotograflar/233198-crystallux-gozluk-seffaf-seffaf-1-cr-0501-0543-81-999-png-crystallux-gozluk-seffaf-seffaf-1-cr-200501-200543-81-999.png" alt="Clear industrial safety glasses"/><b>Eye Protection</b><small>Safety glasses, goggles & accessories</small></button><button onClick={()=>setCategory('Hearing protection')}><img src="https://ironwear.com/cdn/shop/files/WSF_829_20230216_C.jpg?v=1776098615&width=420" alt="Worker wearing hearing protection"/><b>Hearing Protection</b><small>Ear plugs, ear muffs & dispensers</small></button><button><img src="https://www.bamiro.de/media/9e/61/a0/1767014870/79_Category.jpg?ts=1767014870" alt="Worker using an industrial grinder"/><b>Tools & Abrasives</b><small>Grinding, cutting & finishing tools</small></button><button><img src="https://www.tfp1.com/wp-content/uploads/2021/12/fire-extinguisher3.jpg" alt="Fire extinguisher inspection"/><b>Fire & Life Safety</b><small>Equipment, inspection & service</small></button></div></section>
    <section className="shop" id="shop"><div className="section-head"><div><span className="kicker">SEARCHABLE INDUSTRIAL CATALOG</span><h2>20 popular products</h2><p className="demo-note">Representative PIP Global products · Demo pricing for concept review</p></div><label className={`client-number ${pricing.savings ? 'discounted' : ''}`}><span>Your Client Number:</span><input value={clientNumber} onChange={e=>setClientNumber(e.target.value.replace(/\D/g,'').slice(0,4))} inputMode="numeric" placeholder="Enter number" aria-label="Your Client Number"/>{clientNumber && <strong>{pricing.label || 'Client number not recognized'}<small>{pricing.savings || 'Full price shown'}</small></strong>}</label></div>
      <div className="catalog-tools"><button className="filter-toggle" onClick={()=>setShowFilters(x=>!x)}>☷ Filters</button><span><b>{visible.length}</b> results {query&&<>for “{query}”</>}</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort results"><option>Recommended</option><option>Fastest delivery</option><option>Price: Low</option><option>Price: High</option></select></div>
      <div className="catalog"><aside className={showFilters?'open':''}><div><b>Product category</b>{['All',...new Set(products.map(p=>p.category))].map(x=><label key={x}><input type="radio" name="cat" checked={category===x} onChange={()=>setCategory(x)}/>{x}<small>{x==='All'?products.length:products.filter(p=>p.category===x).length}</small></label>)}</div><div><b>Brand</b><select value={brand} onChange={e=>setBrand(e.target.value)}><option>All</option>{[...new Set(products.map(p=>p.brand))].map(x=><option key={x}>{x}</option>)}</select></div><div><b>Availability</b><label><input type="checkbox" checked={stockOnly} onChange={e=>setStockOnly(e.target.checked)}/> In stock now</label></div><button className="clear" onClick={()=>{setCategory('All');setBrand('All');setStockOnly(false);setQuery('')}}>Clear all filters</button></aside>
        <div className="products">{visible.map(p=><article key={p.id}><div className="product-image"><span>{p.badge}</span><img src={p.image} alt=""/><button aria-label="Save product">♡</button></div><div className="product-body"><small>{p.brand.toUpperCase()} · ITEM #{p.sku}</small><h3>{p.name}</h3><div className="rating">★★★★★ <span>4.8 (36)</span></div><div className={`price ${pricing.savings ? 'sale' : ''}`}>{pricing.savings && <><del>${p.price.toFixed(2)}</del><em>{pricing.savings}</em></>}<b>${(p.price*pricing.multiplier).toFixed(2)}</b><small>/ each</small></div><div className="delivery"><i/><span><b>{p.delivery}</b><small>{p.availability} · Nearest OXARC branch</small></span></div><div className="quantity"><label>Qty <input defaultValue="1" aria-label={`Quantity for ${p.name}`}/></label><button className="add" onClick={()=>setCart(c=>c+1)}>Add to cart</button></div></div></article>)}{!visible.length&&<div className="no-results">No exact matches. Try a product type, brand, model, or part number.</div>}</div>
      </div>
    </section>
  </main>;
}
