import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Check, Compass,
  Menu, MousePointer2, Plus, Send, Sparkles, X, WandSparkles
} from 'lucide-react'

type Project = {
  id: number
  name: string
  kind: string
  category: string
  description: string
  palette: string
  tag: string
}

const projects: Project[] = [
  { id: 1, name: 'Sunday Supply', kind: 'SHOP / LIFESTYLE', category: 'Shop', description: 'A warm, product-first storefront for everyday objects and slow living.', palette: 'butter', tag: 'A softer kind of everyday' },
  { id: 2, name: 'Good Form', kind: 'STUDIO / WELLNESS', category: 'Wellness', description: 'A calm and confident home for movement, classes, and bookings.', palette: 'lilac', tag: 'Find your good form' },
  { id: 3, name: 'Little Ritual', kind: 'CAFÉ / FOOD', category: 'Food', description: 'A bright little corner of the internet for coffee, food, and community.', palette: 'tomato', tag: 'Make room for a ritual' },
  { id: 4, name: 'Field Notes', kind: 'PORTFOLIO / CREATIVE', category: 'Portfolio', description: 'An expressive canvas for people who make things worth seeing.', palette: 'mint', tag: 'A little outside the lines' },
  { id: 5, name: 'Kindred House', kind: 'LOCAL BUSINESS', category: 'Services', description: 'A welcoming digital front door for a service rooted in people.', palette: 'sky', tag: 'Good things grow together' },
  { id: 6, name: 'Forma Objects', kind: 'DESIGN / PRODUCT', category: 'Shop', description: 'A gallery-like product experience with a little bit of attitude.', palette: 'ink', tag: 'Objects with intention' },
]

const categories = ['All', 'Shop', 'Wellness', 'Food', 'Portfolio', 'Services']

function Brand() {
  return <a href="#top" className="brand" aria-label="Inaiyuru home"><span className="brand-stamp">i<span>✳</span></span><span>inaiyuru<sup>®</sup></span></a>
}

function Doodle({ className = '' }: { className?: string }) {
  return <svg className={`doodle ${className}`} viewBox="0 0 140 120" aria-hidden="true" fill="none"><path d="M70 8 C83 27 104 39 122 46 C102 55 84 72 70 110 C56 72 38 55 18 46 C38 39 57 27 70 8Z" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M70 20 C81 37 95 43 109 47 C94 55 81 69 70 96 C59 69 46 55 31 47 C45 43 59 37 70 20Z" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5"/></svg>
}

function ProjectArtwork({ project }: { project: Project }) {
  return <div className={`project-art art-${project.palette}`}>
    <div className="art-coordinates"><span>INAIYURU / {String(project.id).padStart(2, '0')}</span><ArrowUpRight size={15}/></div>
    <div className="art-paper-grain" />
    {project.id === 1 && <><div className="sun-shape"/><div className="supply-vase vase-one"/><div className="supply-vase vase-two"/><div className="supply-vase vase-three"/><h4 className="art-big-title">SUNDAY<br/><i>SUPPLY</i></h4><span className="art-note note-one">GOOD THINGS<br/>FOR SLOW DAYS ↗</span></>}
    {project.id === 2 && <><div className="form-blob"/><div className="form-ring"/><h4 className="art-big-title form-title">GOOD<br/><i>FORM</i></h4><span className="art-note note-two">MOVE WITH<br/>INTENTION</span><span className="mini-seal">GF<br/>STUDIO</span></>}
    {project.id === 3 && <><div className="coffee-sun"/><div className="coffee-cup"><span/></div><h4 className="ritual-title">little<br/><i>ritual.</i></h4><span className="art-note note-three">COFFEE · PEOPLE · PAUSE</span></>}
    {project.id === 4 && <><div className="field-circle"/><Doodle className="field-doodle"/><h4 className="art-big-title field-title">FIELD<br/><i>NOTES</i></h4><span className="field-index">FIG. 04 — ALWAYS IN PROGRESS</span></>}
    {project.id === 5 && <><div className="kindred-arch arch-a"/><div className="kindred-arch arch-b"/><div className="kindred-sun"/><h4 className="kindred-title">make room<br/>for <i>good things.</i></h4><span className="kindred-sticker">KINDRED<br/>HOUSE ✳</span></>}
    {project.id === 6 && <><div className="forma-shapes"><span/><span/><span/><span/></div><h4 className="art-big-title forma-title">FORMA<br/><i>OBJECTS</i></h4><span className="art-note forma-note">FORM FOLLOWS FEELING</span></>}
    <div className="art-bottom"><span>{project.kind}</span><span>CONCEPT Nº {String(project.id).padStart(2,'0')}</span></div>
  </div>
}

function App() {
  const [category, setCategory] = useState('All')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const reduceMotion = useReducedMotion()
  const visibleProjects = category === 'All' ? projects : projects.filter(project => project.category === category)

  useEffect(() => {
    if (!activeProject) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setActiveProject(null) }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activeProject])

  async function handleInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())
    try {
      const response = await fetch('https://formsubmit.co/ajax/duraiucevit@gmail.com', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `New Inaiyuru website inquiry — ${String(payload.name || 'New customer')}`, _template: 'table' }),
      })
      if (!response.ok) throw new Error('Email service did not accept the request.')
      const result = await response.json()
      if (result.success === 'false' || result.success === false) throw new Error('Email service did not accept the request.')
      setSent(true); form.reset()
    } catch {
      const subject = encodeURIComponent(`Inaiyuru website inquiry — ${String(payload.name || 'New customer')}`)
      const body = encodeURIComponent(`Name: ${payload.name || ''}\nEmail: ${payload.email || ''}\nBusiness: ${payload.business || ''}\nWebsite path: ${payload.path || ''}\n\nWhat I need:\n${payload.message || ''}`)
      window.location.href = `mailto:duraiucevit@gmail.com?subject=${subject}&body=${body}`
      setError('Automatic delivery could not be confirmed. Your email app has opened a prepared draft; please send it.')
    } finally { setSending(false) }
  }

  const reveal = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.65, ease: 'easeOut' as const } }

  return <div id="top" className="site-shell">
    <div className="announcement"><span className="announcement-spark">✳</span> MADE FOR PEOPLE WITH SOMETHING TO SHARE <span className="announcement-right">A TINY STUDIO FOR BIG IDEAS ↗</span></div>
    <header className="site-header"><Brand/><nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'}>
      <a href="#work" onClick={() => setMenuOpen(false)}>The little gallery</a><a href="#process" onClick={() => setMenuOpen(false)}>Our process</a><a href="#about" onClick={() => setMenuOpen(false)}>A note from us</a><a className="nav-mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>Start a project <ArrowUpRight size={15}/></a>
    </nav><a className="header-cta" href="#contact">Tell us your idea <ArrowUpRight size={16}/></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X/> : <Menu/>}</button></header>

    <main>
      <section className="hero section-pad">
        <div className="hero-meta"><span><b>01</b> — A GOOD PLACE TO BEGIN</span><span>WE MAKE SMALL BUSINESSES FEEL AT HOME ONLINE</span></div>
        <div className="hero-stage">
          <div className="hero-headline"><p className="eyebrow handwritten">A little note from Inaiyuru <span>↙</span></p><h1>Make a little<br/> <span className="hero-italic">room</span> for <span className="hero-underlined">yourself<span className="underline-scribble"/></span><span className="hero-period">.</span></h1><p className="hero-lede">Your corner of the internet, made with care. Websites for good businesses, curious people, and whatever comes next.</p><div className="hero-actions"><a className="button button-dark" href="#work">Wander through our work <ArrowDownRight size={18}/></a><a className="text-link" href="#process">How we make it <ArrowRight size={16}/></a></div></div>
          <div className="hero-illustration" aria-label="Original illustrated archway and floating paper shapes">
            <div className="hero-grid-note">IDEAS<br/>LIVE HERE</div><div className="drawn-sun"/><div className="hero-arch arch-outer"><div className="arch-inner"/><div className="arch-shadow"/></div><div className="floating-paper paper-one"><span>YOUR<br/>NEXT<br/><i>CHAPTER</i></span><Asterisk size={25}/></div><div className="floating-paper paper-two"><Doodle/><span>MADE<br/>WITH CARE</span></div><div className="hero-flower flower-one">✳</div><div className="hero-flower flower-two">✳</div><div className="hero-pencil"/><div className="hero-hand-note">not another<br/>same-same site ↗</div><span className="hero-illustration-caption">A HOME FOR WHAT YOU DO.</span>
          </div>
        </div>
        <div className="hero-foot"><span>INAIYURU® · DIGITAL CRAFT</span><span className="scroll-hint">SCROLL A LITTLE <span>↓</span></span><span>CHENNAI / EVERYWHERE</span></div>
      </section>

      <section className="ticker" aria-label="Inaiyuru services"><div className="ticker-track">{Array.from({length: 5}).map((_, i) => <span key={i}>SMALL BUSINESS, BIG HEART <Asterisk size={17}/> GOOD IDEAS, ONLINE <Asterisk size={17}/> BUILT AROUND YOU <Asterisk size={17}/></span>)}</div></section>

      <section id="work" className="work-section section-pad">
        <motion.div className="section-heading" {...reveal}><div><div className="eyebrow"><span>02</span> / THE LITTLE GALLERY</div><h2>Different businesses.<br/><span>Different little worlds.</span></h2></div><div className="section-heading-aside"><p>These are starting points, not strict rules. Pick a feeling you like and we'll make it fit your story.</p><Doodle className="heading-doodle"/></div></motion.div>
        <div className="filter-row"><span className="filter-label">FIND YOUR KIND OF THING</span><div className="filter-pills" role="group" aria-label="Filter concepts by category">{categories.map(item => <button key={item} className={category === item ? 'filter-pill active' : 'filter-pill'} onClick={() => setCategory(item)}>{item}<span>{item === 'All' ? '06' : String(projects.filter(p => p.category === item).length).padStart(2,'0')}</span></button>)}</div></div>
        <motion.div layout className="project-grid"><AnimatePresence mode="popLayout">{visibleProjects.map((project, index) => <motion.article layout key={project.id} className={`project-card card-offset-${project.id}`} initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: reduceMotion ? 0 : 0.35, delay: index * 0.035 }}>
          <button className="project-preview" onClick={() => setActiveProject(project)} aria-label={`Open ${project.name} concept`}><ProjectArtwork project={project}/><span className="preview-overlay">TAKE A LITTLE LOOK <ArrowUpRight size={16}/></span></button><div className="project-meta"><div><span className="project-kind">{project.kind}</span><h3>{project.name}</h3></div><button className="round-arrow" onClick={() => setActiveProject(project)} aria-label={`Explore ${project.name}`}><ArrowUpRight size={19}/></button></div><p className="project-description">{project.description}</p>
        </motion.article>)}</AnimatePresence></motion.div>
        <div className="work-bottom"><span>MADE-UP CONCEPTS. REAL-WORLD POSSIBILITIES.</span><a href="#contact">Your business could be next <ArrowUpRight size={16}/></a></div>
      </section>

      <section id="process" className="process-section section-pad"><motion.div {...reveal}><div className="eyebrow"><span>03</span> / NO BIG MYSTERY</div><div className="process-title-row"><h2>Easy does it.<br/><span>One good step at a time.</span></h2><div className="process-aside"><Doodle/><span>There, there.<br/>We've got you.</span></div></div></motion.div>
        <div className="steps-grid"><motion.article className="step-card" {...reveal}><span className="step-number">01 / FIRST</span><div className="step-illustration step-compass"><Compass size={44}/><span>↗</span></div><h3>Tell us the little big idea.</h3><p>What do you do? Who do you help? What should your website make easier? We start with a conversation, not jargon.</p><span className="step-foot">START WITH CLARITY <ArrowUpRight size={14}/></span></motion.article><motion.article className="step-card step-featured" {...reveal}><span className="step-number">02 / THEN</span><div className="step-illustration step-spark"><WandSparkles size={44}/><span>✳</span></div><h3>Make it feel like you.</h3><p>We shape the colours, words, pages, and details around your business and the people you want to reach.</p><span className="step-foot">BUILT AROUND YOU <ArrowUpRight size={14}/></span></motion.article><motion.article className="step-card" {...reveal}><span className="step-number">03 / NEXT</span><div className="step-illustration step-arrow"><ArrowUpRight size={44}/><span>✿</span></div><h3>Give your idea a home.</h3><p>Review the details, make the final tweaks, and get ready to share your little corner of the internet.</p><span className="step-foot">READY TO SHOW UP <ArrowUpRight size={14}/></span></motion.article></div>
      </section>

      <section id="about" className="about-section section-pad"><div className="about-side"><div className="eyebrow"><span>04</span> / A NOTE FROM US</div><div className="about-stamp">i<span>✳</span></div><span className="about-side-note">GOOD WORK.<br/>GOOD PEOPLE.</span></div><div className="about-main"><h2>The internet is a big place.<br/><span>You deserve a little space in it.</span></h2><p>Getting online shouldn't feel like a maze of jargon, expensive surprises, or designs that could belong to anybody. Inaiyuru exists to make that first step feel possible — and the finished website feel unmistakably <em>you.</em></p><div className="about-bottom"><span>START SMALL. SHOW UP. GROW FROM THERE.</span><a href="#contact" className="text-link">Tell us what you're building <ArrowUpRight size={16}/></a></div></div></section>

      <section className="future-section section-pad"><div className="future-copy"><div className="eyebrow"><span>05</span> / WHAT'S GROWING</div><h2>Websites first.<br/><span>More ideas on the way.</span></h2><p>We're beginning with the essentials: helping good businesses get online. Then, little by little, exploring practical AI and digital tools that make work easier.</p><span className="roadmap-badge"><span/> ON THE SKETCHBOOK</span></div><div className="future-art"><div className="future-paper"><span>THE NEXT<br/><i>CHAPTER</i></span><Doodle/><small>IDEAS IN THE MAKING · 001</small></div><span className="future-float future-float-one">AI HELPERS ✳</span><span className="future-float future-float-two">BETTER WORKFLOWS ↗</span><span className="future-float future-float-three">LESS BUSYWORK</span></div></section>

      <section id="contact" className="contact-section section-pad"><div className="contact-left"><div className="eyebrow"><span>06</span> / YOUR TURN</div><h2>Got a good idea?<br/><span>Let's make room for it.</span></h2><p>Tell us a little about what you're building. No pressure, no awkward sales pitch — just a good place to start.</p><div className="contact-email"><span>OR SEND A LITTLE NOTE</span><a href="mailto:duraiucevit@gmail.com">duraiucevit@gmail.com <ArrowUpRight size={16}/></a></div><div className="contact-doodle"><Doodle/><span>GOOD THINGS<br/>START SOMEWHERE.</span></div></div><div className="contact-form-wrap">{sent ? <div className="success-panel"><div className="success-icon"><Check size={28}/></div><span className="eyebrow">NOTE RECEIVED</span><h3>That was a good first step.</h3><p>Your inquiry was accepted by the email service. We'll be in touch after we review it.</p><button className="button button-dark" onClick={() => setSent(false)}>Send another note <Plus size={17}/></button></div> : <form className="inquiry-form" onSubmit={handleInquiry}><div className="form-top"><span>A LITTLE PROJECT NOTE</span><span>ABOUT 2 MINUTES ↘</span></div><label>Your name <span>*</span><input required name="name" placeholder="What should we call you?" autoComplete="name"/></label><label>Email address <span>*</span><input required name="email" type="email" placeholder="you@yourbusiness.com" autoComplete="email"/></label><label>What kind of business? <span>*</span><input required name="business" placeholder="e.g. cafe, consultant, local service"/></label><label>How would you like to start?<select name="path" defaultValue="not-sure"><option value="not-sure">Not sure yet</option><option value="template">Choose a concept</option><option value="custom">Build a custom website</option><option value="store">Online store</option><option value="redesign">Redesign an existing website</option></select></label><label>What are you imagining?<textarea name="message" rows={3} placeholder="A little about your business, ideas, or questions..."/></label><button className="button button-dark submit-button" type="submit" disabled={sending}>{sending ? 'Sending your note…' : 'Send my note'} {sending ? <span className="spinner"/> : <Send size={17}/>}</button>{error && <p className="form-error" role="alert">{error}</p>}<p className="form-privacy">Your details are only used to respond to this inquiry. Please don't include sensitive information.</p></form>}</div></section>

      <section className="closing-banner"><span>YOU BRING THE LITTLE IDEA.</span><span className="closing-center">WE'LL HELP IT GROW.</span><a href="#contact">LET'S MAKE A START <ArrowUpRight size={17}/></a></section>
    </main>
    <footer className="site-footer"><Brand/><span className="footer-line">A little space for your big idea.</span><span className="footer-copy">© {new Date().getFullYear()} INAIYURU. MADE WITH CARE.</span><a href="#top" className="back-top">BACK TO THE TOP ↑</a></footer>
    <AnimatePresence>{activeProject && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={event => {if (event.target === event.currentTarget) setActiveProject(null)}}><motion.div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={reduceMotion ? false : {opacity:0,y:18,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12,scale:.98}}><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close preview"><X size={20}/></button><ProjectArtwork project={activeProject}/><div className="modal-details"><span className="project-kind">{activeProject.kind}</span><h2 id="modal-title">{activeProject.name}</h2><p>{activeProject.description} This is a visual direction we can adapt with your story, content, products, and details.</p><a className="button button-dark" href="#contact" onClick={() => setActiveProject(null)}>Make something like this <ArrowUpRight size={17}/></a></div></motion.div></motion.div>}</AnimatePresence>
  </div>
}

export default App
