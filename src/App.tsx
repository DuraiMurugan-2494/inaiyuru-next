import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Check, ChevronDown,
  Code2, Compass, Menu, MousePointer2, MoveUpRight, Plus, Send,
  Sparkles, X
} from 'lucide-react'

type Template = {
  id: number
  name: string
  type: string
  category: string
  description: string
  className: string
  label: string
}

const templates: Template[] = [
  { id: 1, name: 'Sunday Supply', type: 'Shop / lifestyle', category: 'Shop', description: 'A product-first storefront with room to tell your story.', className: 'art-sunday', label: 'SUNDAY\\nSUPPLY' },
  { id: 2, name: 'Good Form', type: 'Studio / wellness', category: 'Wellness', description: 'A calm, confident home for services and bookings.', className: 'art-form', label: 'GOOD\\nFORM' },
  { id: 3, name: 'Little Ritual', type: 'Cafe / food', category: 'Food', description: 'Warm visuals and a menu that makes people hungry.', className: 'art-ritual', label: 'LITTLE\\nRITUAL' },
  { id: 4, name: 'Field Notes', type: 'Portfolio / creative', category: 'Portfolio', description: 'A bold canvas for work that deserves to be seen.', className: 'art-field', label: 'FIELD\\nNOTES' },
  { id: 5, name: 'Kindred House', type: 'Local business', category: 'Services', description: 'A clear, welcoming presence that turns visits into leads.', className: 'art-kindred', label: 'KINDRED\\nHOUSE' },
  { id: 6, name: 'Forma Objects', type: 'Design / product', category: 'Shop', description: 'A gallery-like product experience with a modern edge.', className: 'art-forma', label: 'FORMA\\nOBJECTS' },
]

const categories = ['All', 'Shop', 'Wellness', 'Food', 'Portfolio', 'Services']

function Logo() {
  return <a className="logo" href="#top" aria-label="Inaiyuru home"><span className="logo-mark">i<span>.</span></span><span>inaiyuru<sup>®</sup></span></a>
}

function Artwork({ item }: { item: Template }) {
  return (
    <div className={`template-art ${item.className}`} aria-label={`${item.name} website design concept`}>
      <div className="art-topline"><span>INAIYURU / CONCEPT {String(item.id).padStart(2, '0')}</span><ArrowUpRight size={15} /></div>
      {item.id === 1 && <><div className="sun-disc" /><div className="sunday-word">SUNDAY<br/>SUPPLY</div><div className="art-caption">OBJECTS FOR EVERYDAY LIVING</div><div className="product-shape shape-a" /><div className="product-shape shape-b" /><div className="product-shape shape-c" /></>}
      {item.id === 2 && <><div className="form-circle"><span>MOVE<br/>WITH<br/>INTENTION</span></div><div className="form-type">GOOD<br/><i>FORM</i></div><div className="form-stamp">EST. 2024<br/>MOVE WELL</div></>}
      {item.id === 3 && <><div className="ritual-orb" /><div className="ritual-type">little<br/><em>ritual</em></div><div className="ritual-badge">COFFEE · COMMUNITY · SLOW MORNINGS</div><div className="coffee-cup"><span /></div></>}
      {item.id === 4 && <><div className="field-sun" /><div className="field-type">FIELD<br/><span>NOTES</span></div><div className="field-sticker">CREATIVE<br/>PRACTICE<br/>№ 08</div><div className="field-line" /></>}
      {item.id === 5 && <><div className="kindred-block block-one" /><div className="kindred-block block-two" /><div className="kindred-type">Make<br/>room for<br/><i>good things.</i></div><div className="kindred-dot">K</div></>}
      {item.id === 6 && <><div className="forma-grid"><span/><span/><span/><span/></div><div className="forma-type">FORMA<br/><i>OBJECTS</i></div><div className="forma-number">01 — 06</div></>}
      <div className="art-footer"><span>{item.type.toUpperCase()}</span><span>VIEW CONCEPT ↗</span></div>
    </div>
  )
}

function App() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState<Template | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const visibleTemplates = category === 'All' ? templates : templates.filter(t => t.category === category)

  async function handleInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    try {
      const response = await fetch('https://formsubmit.co/ajax/duraiucevit@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          _subject: `New Inaiyuru website inquiry — ${String(payload.name || 'New customer')}`,
          _template: 'table',
        }),
      })
      if (!response.ok) throw new Error('Email service did not accept the request.')
      const result = await response.json()
      if (result.success === 'false' || result.success === false) throw new Error('Email service did not accept the request.')
      setSent(true)
      form.reset()
    } catch (err) {
      const subject = encodeURIComponent(`Inaiyuru website inquiry — ${String(payload.name || 'New customer')}`)
      const body = encodeURIComponent(
        `Name: ${payload.name || ''}\nEmail: ${payload.email || ''}\nBusiness: ${payload.business || ''}\nWebsite path: ${payload.path || ''}\nBudget/timing: ${payload.budget || ''}\n\nWhat I need:\n${payload.message || ''}`
      )
      window.location.href = `mailto:duraiucevit@gmail.com?subject=${subject}&body=${body}`
      setError('Automatic delivery could not be confirmed. Your email app has been opened as a fallback. Please send the prepared message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div id="top" className="site-shell">
      <div className="announcement"><span className="announcement-dot" /> YOUR FIRST WEBSITE CAN BE YOUR BIGGEST FIRST STEP <ArrowUpRight size={13} /></div>
      <header className="site-header">
        <Logo />
        <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'}>
          <a href="#templates" onClick={() => setMenuOpen(false)}>The template edit</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>Our point of view</a>
          <a className="nav-mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={15}/></a>
        </nav>
        <a className="header-cta" href="#contact">Let's make it real <ArrowUpRight size={16}/></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero section-pad">
          <div className="hero-kicker"><span className="kicker-index">01 / THE START</span><span>FOR AMBITIOUS SMALL BUSINESSES</span></div>
          <div className="hero-title-wrap">
            <h1>Make your<br/><span className="hero-second">next move <span className="online-word">online<span className="online-star"><Asterisk size={42}/></span></span></span></h1>
            <div className="hero-side-note"><span className="side-note-icon"><MousePointer2 size={18}/></span><p>Good businesses deserve<br/>better than a social profile.</p><span className="hand-drawn-arrow">↙</span></div>
          </div>
          <div className="hero-bottom">
            <p className="hero-copy">Your first website, without the first-time confusion. Pick a design to make your own, or work with us to build something that feels unmistakably <em>you.</em></p>
            <div className="hero-actions"><a className="button button-blue" href="#templates">Find your starting point <ArrowDownRight size={18}/></a><a className="text-link" href="#process">See how it works <ArrowRight size={16}/></a></div>
            <div className="hero-index"><span>INAIYURU®</span><span>EST. FOR WHAT'S NEXT</span></div>
          </div>
          <div className="hero-collage" aria-label="Abstract colorful shapes representing creative websites">
            <div className="collage-label label-a">IDEAS INTO<br/>INTERFACES</div>
            <div className="collage-slab slab-blue"><span>MAKE<br/>SOME<br/><i>NOISE.</i></span><ArrowUpRight size={22}/></div>
            <div className="collage-slab slab-pink"><div className="pink-sun" /><span>GOOD<br/>THINGS<br/>ONLINE.</span></div>
            <div className="collage-orbit"><div className="orbit-inner">i.</div></div>
            <div className="collage-star"><Asterisk size={88} strokeWidth={1.1}/></div>
            <div className="collage-label label-b">NOT ANOTHER<br/>COOKIE-CUTTER SITE.</div>
            <div className="collage-sticker">MADE<br/>TO MOVE<br/><ArrowDownRight size={21}/></div>
          </div>
          <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/></div>
        </section>

        <section className="ticker" aria-label="Inaiyuru services">
          <div className="ticker-track">{Array.from({length: 4}).map((_, i) => <span key={i}>GOOD IDEAS, ONLINE <Asterisk size={21}/> CUSTOM BUILDS, NO GUESSWORK <Asterisk size={21}/> SMALL BUSINESS, BIG ENERGY <Asterisk size={21}/></span>)}</div>
        </section>

        <section id="templates" className="templates-section section-pad">
          <div className="section-heading">
            <div><div className="eyebrow"><span>02</span> / THE STARTING POINT</div><h2>Pick a vibe.<br/><span>Make it yours.</span></h2></div>
            <div className="section-heading-aside"><p>Think of these as a first draft, not a box to fit into. Choose a direction, then we'll make it yours.</p><span className="big-asterisk"><Asterisk size={50}/></span></div>
          </div>
          <div className="filter-row" role="group" aria-label="Filter templates by category">
            <span className="filter-label">BROWSE THE EDIT</span>
            <div className="filter-pills">{categories.map(c => <button key={c} className={category === c ? 'filter-pill active' : 'filter-pill'} onClick={() => setCategory(c)}>{c}<span>{c === 'All' ? '06' : String(templates.filter(t => t.category === c).length).padStart(2, '0')}</span></button>)}</div>
          </div>
          <motion.div layout className="template-grid">
            <AnimatePresence mode="popLayout">
              {visibleTemplates.map((item, index) => <motion.article layout key={item.id} className="template-card" initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:12}} transition={{duration:.28, delay:index*.035}}>
                <button className="template-preview-button" onClick={() => { setSelected(item); setSent(false) }} aria-label={`Preview ${item.name} template`}><Artwork item={item}/><span className="preview-overlay">TAKE A CLOSER LOOK <MoveUpRight size={16}/></span></button>
                <div className="template-meta"><div><span className="template-type">{item.type}</span><h3>{item.name}</h3></div><button className="round-arrow" onClick={() => {setSelected(item); setSent(false)}} aria-label={`Explore ${item.name}`}><ArrowUpRight size={19}/></button></div>
                <p className="template-description">{item.description}</p>
              </motion.article>)}
            </AnimatePresence>
          </motion.div>
          <div className="templates-bottom"><span>06 STARTING POINTS. INFINITE WAYS TO MAKE THEM YOURS.</span><a href="#contact">Need something different? Let's talk <ArrowUpRight size={16}/></a></div>
        </section>

        <section id="process" className="process-section section-pad">
          <div className="process-topline"><div className="eyebrow"><span>03</span> / NO MYSTERY, NO MAYHEM</div><span className="process-topnote">A GOOD WEBSITE STARTS WITH A GOOD CONVERSATION.</span></div>
          <div className="process-title-row"><h2>From “I need a site”<br/>to <span>“that's my site.”</span></h2><div className="process-scribble"><Compass size={35}/><span>Easy does it ↗</span></div></div>
          <div className="steps-grid">
            <article className="step-card"><span className="step-number">01</span><div className="step-icon"><Compass size={25}/></div><h3>Find your direction.</h3><p>Choose a starting template or tell us what you're imagining. No tech vocabulary test required.</p><span className="step-foot">START WITH CLARITY <ArrowUpRight size={14}/></span></article>
            <article className="step-card step-highlight"><span className="step-number">02</span><div className="step-icon"><Code2 size={25}/></div><h3>Make it yours.</h3><p>We shape the design around your business, your customers, and what you want the website to do.</p><span className="step-foot">BUILT AROUND YOU <ArrowUpRight size={14}/></span></article>
            <article className="step-card"><span className="step-number">03</span><div className="step-icon"><Sparkles size={25}/></div><h3>Show up online.</h3><p>Review, refine, and get ready to share your business with the world. One confident step at a time.</p><span className="step-foot">READY FOR LAUNCH <ArrowUpRight size={14}/></span></article>
          </div>
        </section>

        <section id="about" className="manifesto-section section-pad">
          <div className="manifesto-side"><span className="eyebrow"><span>04</span> / WHY INAIYURU</span><div className="manifesto-symbol"><span>i.</span><Asterisk size={58}/></div><span className="manifesto-note">A SMALL STUDIO<br/>FOR BIG FIRSTS.</span></div>
          <div className="manifesto-main"><h2>The internet is a big place.<br/><span>Your business belongs in it.</span></h2><p>We believe getting online shouldn't feel like a maze of jargon, expensive surprises, or one-size-fits-all designs. Inaiyuru exists to make the first step feel possible — and the finished website feel like <em>you.</em></p><div className="manifesto-bottom"><span>START SMALL. SHOW UP. GROW FROM THERE.</span><a href="#contact" className="text-link">Tell us what you're building <ArrowUpRight size={16}/></a></div></div>
        </section>

        <section className="future-section section-pad">
          <div className="future-copy"><div className="eyebrow"><span>05</span> / WHAT'S NEXT</div><h2>Websites first.<br/><span>More possibilities later.</span></h2><p>We're starting with the essentials: helping good businesses get online. Over time, we're exploring practical AI solutions that make running a business a little easier.</p><span className="roadmap-badge"><span/> ON THE ROADMAP</span></div>
          <div className="future-art"><div className="future-orbit orbit-one"/><div className="future-orbit orbit-two"/><div className="future-center"><Sparkles size={44}/><span>IDEAS<br/>IN MOTION</span></div><div className="future-node node-one">AI ASSISTANTS</div><div className="future-node node-two">SMARTER WORKFLOWS</div><div className="future-node node-three">BUSINESS AUTOMATION</div><div className="future-footnote">EXPLORING WHAT'S POSSIBLE<br/>NOT AVAILABLE AS A SERVICE YET</div></div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="contact-left"><div className="eyebrow"><span>06</span> / YOUR MOVE</div><h2>Got a business?<br/><span>Let's give it a home.</span></h2><p>Tell us a little about what you're building. We'll take it from there — no pressure, no awkward sales pitch.</p><div className="contact-email"><span>OR EMAIL US DIRECTLY</span><a href="mailto:duraiucevit@gmail.com">duraiucevit@gmail.com <ArrowUpRight size={16}/></a></div><div className="contact-doodle"><Asterisk size={72}/><span>GOOD THINGS<br/>START SOMEWHERE.</span></div></div>
          <div className="contact-form-wrap">
            {sent ? <div className="success-panel"><div className="success-icon"><Check size={30}/></div><span className="eyebrow">MESSAGE SENT</span><h3>That's a great first step.</h3><p>Your inquiry was accepted by our email service. We'll be in touch after we review it.</p><button className="button button-blue" onClick={() => setSent(false)}>Send another inquiry <Plus size={17}/></button></div> :
            <form className="inquiry-form" onSubmit={handleInquiry}>
              <div className="form-top"><span>PROJECT INQUIRY</span><span>TAKES ABOUT 2 MINUTES ↘</span></div>
              <label>Your name <span>*</span><input required name="name" placeholder="What should we call you?" autoComplete="name"/></label>
              <label>Email address <span>*</span><input required name="email" type="email" placeholder="you@yourbusiness.com" autoComplete="email"/></label>
              <label>What kind of business? <span>*</span><input required name="business" placeholder="e.g. cafe, consultant, local service"/></label>
              <label>How would you like to start?<select name="path" defaultValue="not-sure"><option value="not-sure">Not sure yet</option><option value="template">Choose a template</option><option value="custom">Build a custom website</option><option value="store">Online store</option><option value="redesign">Redesign an existing website</option></select><ChevronDown className="select-chevron" size={15}/></label>
              <label>What are you imagining? <textarea name="message" rows={3} placeholder="A little about your business, goals, ideas, or questions..." /></label>
              <button className="button button-blue submit-button" type="submit" disabled={sending}>{sending ? 'Sending inquiry…' : 'Send my inquiry'} {sending ? <span className="spinner"/> : <Send size={17}/>}</button>
              {error && <p className="form-error" role="alert">{error}</p>}
              <p className="form-privacy">Your details are used to respond to this inquiry. Please don't include sensitive information.</p>
            </form>}
          </div>
        </section>

        <section className="closing-banner"><span>YOU BRING THE IDEA.</span><span className="closing-center">WE'LL HELP IT SHOW UP.</span><a href="#contact">START A PROJECT <ArrowUpRight size={17}/></a></section>
      </main>

      <footer className="site-footer"><Logo/><span className="footer-line">Shape ideas. Build businesses.</span><span className="footer-copy">© {new Date().getFullYear()} INAIYURU. MADE FOR WHAT'S NEXT.</span><a href="#top" className="back-top">BACK TO TOP ↑</a></footer>

      <AnimatePresence>
        {selected && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e) => {if (e.target === e.currentTarget) setSelected(null)}}>
          <motion.div className="template-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{opacity:0,y:20,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12,scale:.98}}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close preview"><X size={20}/></button>
            <Artwork item={selected}/>
            <div className="modal-details"><span className="template-type">{selected.type}</span><h2 id="modal-title">{selected.name}</h2><p>{selected.description} We'll adapt the layout, colors, content, and details to fit your business.</p><a className="button button-blue" href="#contact" onClick={() => setSelected(null)}>I like this direction <ArrowUpRight size={17}/></a></div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  )
}

export default App
