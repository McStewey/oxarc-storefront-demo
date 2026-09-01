'use client';

import { useMemo, useState } from 'react';

const products = [
  { id: 1, sku: '1810', brand: 'Caiman', name: 'Premium Cow Grain MIG / Stick Welding Gloves', type: 'Welding gloves', category: 'Welding', price: 29.48, badge: 'Best seller', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=85' },
  { id: 2, sku: '280-HP1491RM', brand: 'PIP', name: 'Traverse Type II Vented Safety Helmet', type: 'Safety helmet', category: 'Head protection', price: 94.25, badge: 'New', delivery: 'Ready for pickup', availability: 'In stock', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=700&q=85' },
  { id: 3, sku: '250-01-0900', brand: 'Bouton', name: 'Zenon Z12 Clear Anti-Fog Safety Glasses', type: 'Safety glasses', category: 'Eye protection', price: 5.86, badge: 'In stock', delivery: 'Arrives tomorrow', availability: 'In stock', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=700&q=85' },
  { id: 4, sku: '16-939', brand: 'G-Tek', name: 'PolyKor X7 Cut-Resistant Coated Gloves', type: 'Cut-resistant gloves', category: 'Hand protection', price: 13.72, badge: 'Top rated', delivery: 'Ships today', availability: 'In stock', image: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=700&q=85' },
  { id: 5, sku: '4990', brand: 'Fibre-Metal', name: 'Tigerhood Classic Welding Helmet', type: 'Welding helmet', category: 'Welding', price: 79.95, badge: 'Contract favorite', delivery: '2–3 business days', availability: 'Limited stock', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=85' },
  { id: 6, sku: '267-HPF210C', brand: 'PIP', name: 'Mega Bullet BioSoft Corded Ear Plugs', type: 'Ear plugs', category: 'Hearing protection', price: 31.20, badge: 'Case pack', delivery: 'Arrives tomorrow', availability: 'In stock', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
];
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
      <div className="brand"><span className="brand-mark">OX</span><span>OXARC<small>Part of Meritus Gas Partners</small></span></div>
      <div className="search-wrap"><label className="search"><span>⌕</span><input aria-label="Search products" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search product, type, brand, model or part #"/><kbd>⌘ K</kbd></label>{suggestions.length>0&&<div className="suggestions"><b>PRODUCT SUGGESTIONS</b>{suggestions.map(p=><button key={p.id} onClick={()=>setQuery(p.sku)}><span>{p.name}<small>{p.brand} · Model {p.sku}</small></span><em>{p.delivery}</em></button>)}<button className="all-results">See all results for “{query}” →</button></div>}</div>
      <button className="account">◎ <span>Sign in<small>Account & pricing</small></span></button><button className="cart" onClick={()=>setCart(0)}>Cart <b>{cart}</b></button>
    </header>
    <nav><button>☰ All products</button>{categoryNav.map(x=><a key={x} href="#shop">{x}</a>)}<a href="#shop" className="quick">Quick order →</a></nav>
    <section className="hero"><div className="hero-copy"><div className="eyebrow"><i/> BUILT FOR THE PEOPLE WHO BUILD</div><h1>Your work doesn’t wait.<br/><em>Neither do we.</em></h1><p>Industrial gases, welding equipment and jobsite safety—backed by local experts and inventory you can count on.</p><div className="hero-actions"><button onClick={()=>document.getElementById('shop')?.scrollIntoView()}>Shop all products <span>→</span></button><a href="#expert">Talk to an expert</a></div><div className="proof"><span><b>20+</b> Northwest locations</span><span><b>70+</b> Years of expertise</span><span><b>50K+</b> Products available</span></div></div><div className="hero-visual"><img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=90" alt="Welder at work"/><div className="availability"><i>✓</i><span><b>Local stock. Fast delivery.</b><small>Order by 3 PM for next-day delivery</small></span></div></div></section>
    <section className="popular-categories"><div className="category-heading"><div><span className="kicker">START WITH WHAT YOU NEED</span><h2>Popular Product Categories</h2></div><a href="#shop">View all categories →</a></div><div className="category-grid"><button onClick={()=>setCategory('Welding')}><span>⚡</span><b>Welding & Cutting</b><small>Machines, torches, wire & consumables</small></button><button><span>◉</span><b>Industrial Gases</b><small>Cylinders, bulk, medical & specialty</small></button><button onClick={()=>setCategory('Hand protection')}><span>◆</span><b>Hand Protection</b><small>Work, cut-resistant & welding gloves</small></button><button onClick={()=>setCategory('Head protection')}><span>⛨</span><b>Head Protection</b><small>Hard hats, helmets & face shields</small></button><button onClick={()=>setCategory('Eye protection')}><span>⌾</span><b>Eye Protection</b><small>Safety glasses, goggles & accessories</small></button><button onClick={()=>setCategory('Hearing protection')}><span>◖</span><b>Hearing Protection</b><small>Ear plugs, ear muffs & dispensers</small></button><button><span>✣</span><b>Tools & Abrasives</b><small>Grinding, cutting & finishing tools</small></button><button><span>▣</span><b>Fire & Life Safety</b><small>Equipment, inspection & service</small></button></div></section>
    <section className="shop" id="shop"><div className="section-head"><div><span className="kicker">SEARCHABLE INDUSTRIAL CATALOG</span><h2>Popular products</h2></div><label className={`client-number ${pricing.savings ? 'discounted' : ''}`}><span>Your Client Number:</span><input value={clientNumber} onChange={e=>setClientNumber(e.target.value.replace(/\D/g,'').slice(0,4))} inputMode="numeric" placeholder="Enter number" aria-label="Your Client Number"/>{clientNumber && <strong>{pricing.label || 'Client number not recognized'}<small>{pricing.savings || 'Full price shown'}</small></strong>}</label></div>
      <div className="catalog-tools"><button className="filter-toggle" onClick={()=>setShowFilters(x=>!x)}>☷ Filters</button><span><b>{visible.length}</b> results {query&&<>for “{query}”</>}</span><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort results"><option>Recommended</option><option>Fastest delivery</option><option>Price: Low</option><option>Price: High</option></select></div>
      <div className="catalog"><aside className={showFilters?'open':''}><div><b>Product category</b>{['All',...new Set(products.map(p=>p.category))].map(x=><label key={x}><input type="radio" name="cat" checked={category===x} onChange={()=>setCategory(x)}/>{x}<small>{x==='All'?products.length:products.filter(p=>p.category===x).length}</small></label>)}</div><div><b>Brand</b><select value={brand} onChange={e=>setBrand(e.target.value)}><option>All</option>{[...new Set(products.map(p=>p.brand))].map(x=><option key={x}>{x}</option>)}</select></div><div><b>Availability</b><label><input type="checkbox" checked={stockOnly} onChange={e=>setStockOnly(e.target.checked)}/> In stock now</label></div><button className="clear" onClick={()=>{setCategory('All');setBrand('All');setStockOnly(false);setQuery('')}}>Clear all filters</button></aside>
        <div className="products">{visible.map(p=><article key={p.id}><div className="product-image"><span>{p.badge}</span><img src={p.image} alt=""/><button aria-label="Save product">♡</button></div><div className="product-body"><small>{p.brand.toUpperCase()} · ITEM #{p.sku}</small><h3>{p.name}</h3><div className="rating">★★★★★ <span>4.8 (36)</span></div><div className={`price ${pricing.savings ? 'sale' : ''}`}>{pricing.savings && <><del>${p.price.toFixed(2)}</del><em>{pricing.savings}</em></>}<b>${(p.price*pricing.multiplier).toFixed(2)}</b><small>/ each</small></div><div className="delivery"><i/><span><b>{p.delivery}</b><small>{p.availability} · Nearest OXARC branch</small></span></div><div className="quantity"><label>Qty <input defaultValue="1" aria-label={`Quantity for ${p.name}`}/></label><button className="add" onClick={()=>setCart(c=>c+1)}>Add to cart</button></div></div></article>)}{!visible.length&&<div className="no-results">No exact matches. Try a product type, brand, model, or part number.</div>}</div>
      </div>
    </section>
  </main>;
}
