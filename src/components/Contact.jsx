import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

import {
  Mail, Phone, Linkedin, Github, Trophy, Send, CheckCircle2, AlertCircle
} from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { contactMethods } from '../data/contact'

const iconMap = { Mail, Phone, Linkedin, Github, Trophy }

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const formRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
      return
    }

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('success')
        formRef.current.reset()
        setTimeout(() => setStatus('idle'), 5000)
      })
      .catch(() => {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      })
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;contact&gt;</span>
          <h2 className="section-title">Let's <span className="text-gradient">Connect</span></h2>
          <p className="section-subtitle">Ready to discuss opportunities? Reach out below.</p>
        </AnimateOnScroll>
        <div className="contact-grid">
          <AnimateOnScroll className="contact-info" direction="left">
            <h3>Get in Touch</h3>
            <p>I'm actively looking for software engineering opportunities. Whether it's an internship, full-time role, or freelance project, I'd love to hear from you.</p>
            <div className="contact-methods">
              {contactMethods.map(m => {
                const Icon = iconMap[m.icon]
                return (
                  <a key={m.label} href={m.href} className="contact-method" {...(m.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <div className="contact-method-icon">{Icon && <Icon size={18} />}</div>
                    <div><span className="contact-method-label">{m.label}</span><span className="contact-method-value">{m.value}</span></div>
                  </a>
                )
              })}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll className="contact-form-wrapper" direction="right">
            <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="from_name" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="reply_to" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="What's this about?" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Your message..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-full" disabled={status === 'sending'}>
                <Send size={18} />{status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            {status === 'success' && (
              <div className="form-success show" role="alert">
                <div className="success-icon"><CheckCircle2 size={48} /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="form-success show form-error" role="alert">
                <div className="success-icon"><AlertCircle size={48} /></div>
                <h3>Failed to Send</h3>
                <p>Something went wrong. Please email me directly at kakshat349@gmail.com</p>
              </div>
            )}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}